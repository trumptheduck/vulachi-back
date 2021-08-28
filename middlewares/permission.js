const User = require("../models/user");
const jwt = require("jsonwebtoken");
const accessTokenKey = "this_is_key_for_development";

exports.getIdentity = async (req, res, next) => {
    try {
        res.locals.user = null;
        const jwtToken = await exports.getToken(req,res);
        if (!jwt) next();
        const decodedToken = jwt.verify(jwtToken, accessTokenKey);
        if (decodedToken === null) next();
        User.findOne({ _id: decodedToken.userId }).exec((err, user) => {
            if (err) next();
            if (user) {
                res.locals.user = user;
                next()
            }
        });
    } catch (err) {
        return res.status(500).json({ msg: "Đã xảy ra lỗi: " + err });
    }
};
exports.hasAccount = async (req, res, next) => {
    if (res.locals.user === null) {
        res.send("Access Denied!");
    }
    next()
}
exports.hasRole = (roles) => {
    return async function (req, res, next) {
        var eligible = false;
        roles.forEach(role => {
            if (res.locals.user.role === role) {
                eligible = true;
            } 
        })
        if (eligible) {
            return next();
        } else {
            return res.send('Access Denied!')
        }
    }
}

exports.getToken = async (req,res) => {
    return req.header('Authorization').replace("Bearer ","");
}