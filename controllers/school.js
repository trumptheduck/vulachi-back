const School = require("../models/school.js")


exports.getAll = async (req,res) => {
    try {
        var allSchools = await School.find()
        if (allSchools.length !== 0) {
          allSchools = await School.find()
        }
        return res.status(200).json(allSchools);
        } catch (err) {
        console.log(err);
        return res.status(500).json(err);
        }
}

exports.getOne = async (req,res) => {
  try {
      var school = await School.findById(req.query.id).populate("courses");
      return res.status(200).json(school);
      } catch (err) {
      console.log(err);
      return res.status(500).json(err);
      }
}

exports.create = async (req, res) => {
    try {
    const school = new School({
        name: req.body.name,
        code: req.body.code,
        region: req.body.region,
        address: req.body.address,
        phones: req.body.phones,
        hotlines: req.body.hotlines,
        faxes: req.body.faxes,
        emails: req.body.emails,
        website: req.body.website,
        desc: req.body.desc,
    })
    const createdItem = await school.save();
  
    return res.status(200).json(createdItem);
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
  };
  
  exports.delete = async (req, res) => {
    try {
    let ID = req.body._id
    await School.findByIdAndRemove(ID,(err,docs)=>{
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json({ msg: "Xoa truong thanh cong" });
      }
    })
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
  };
  exports.update = async (req, res) => {
    try {
    await School.findByIdAndUpdate(req.body._id,req.body,(err,docs)=>{
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json({ msg: "Update truong thanh cong" });
      }
    })
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
  };