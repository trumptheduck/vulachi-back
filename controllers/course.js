const Course = require("../models/course.js")
const School = require("../models/school.js")
var mongoose = require('mongoose');

exports.getAll = async (req,res) => {
    try {
        var allCourses = await Course.find()
        if (allCourses.length !== 0) {
          allCourses = await Course.find()
        }
        return res.status(200).json(allCourses);
        } catch (err) {
        console.log(err);
        return res.status(500).json(err);
        }
}
exports.getByID = async (req,res) => {
    try {
        var selCourse = await Course.findById(req.params.id);
        return res.status(200).json(selCourse);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
    const course = new Course({
        name: req.body.name,
        code: req.body.code,
        desc: req.body.desc,
    })
    const createdItem = await course.save();
    
    return res.status(200).json(createdItem);
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
  };

exports.createWithinSchool = async (req, res) => {
    try {
        var stringID = req.body.school;
        req.body.school = mongoose.Types.ObjectId(stringID);
        const course = new Course(req.body)
        const createdItem = await course.save();
        School.findByIdAndUpdate(req.body.school,{ $push: {"courses" : createdItem._id } } ).exec((err,school) => {
            if (err) {
                return res.status(500).json({msg: "Internal server error!"});
            } else {
                return res.status(200).json({msg: `Đã add course to ${school.code}`});
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
  
exports.delete = async (req, res) => {
    try {
        let ID = req.body._id
        await Course.findByIdAndRemove(ID,(err,docs)=>{
            if (err) {
                console.log(err);
            } else {
                console.log(docs)
                if (docs.school === null||docs.school === undefined) {
                   return res.status(200).json({msg: `Đã xóa`});
                }
                School.findByIdAndUpdate(docs.school,{ $pull: {"courses" : docs._id } } ).exec((err,school) => {
                    if (err) {
                        return res.status(500).json({msg: "Internal server error!"});
                    } else {
                        return res.status(200).json({msg: `Đã xóa`});
                    }
                })
            }
        })
        return res.status(500).json({ msg: "Unexpected error!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    try {
        await Course.findByIdAndUpdate(req.body._id,req.body).exec(()=>{
            return res.status(200).json({ msg: "Success!" });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};