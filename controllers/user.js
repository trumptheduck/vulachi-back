const User = require("../models/user");
var emailController = require('./email.js')

function generateToken(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
 return result;
}

exports.signup = async (req, res) => {
  try {
    var isExisted = await User.findOne({credential: req.body.credential});
    console.log(isExisted)
    if (isExisted !== null) {
      return res.status(409).json({ msg: "Credential already existed!" });
    }
    const user = new User({
      credential: req.body.credential,
      role: req.body.role,
      verificationToken: await generateToken(32),
    });
    user.generatePassword(req.body.password);
    await user.save().then(
      (user) => {
        // emailController.sendVerificationEmail(user,(info)=>{
          return res.status(200).json(user);
        // }, (err)=>{
        //   console.log(err);
        //   return res.status(500).json({ msg: err });
        // });
      },
      (err) => {
        console.log(err);
        return res.status(500).json({ msg: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: "Đã xảy ra lỗi: " + err });
  }
};

exports.createAccount = async (req, res) => {
  var permsLevel = 0;
  var requiredLevel = 3;
  switch (res.locals.user.role) {
    case 'student': 
    permsLevel = 0;
    break;
    case 'teacher': 
    permsLevel = 1;
    break;
    case 'moderator': 
    permsLevel = 2;
    break;
    case 'admin': 
    permsLevel = 3;
    break;
    default: permsLevel = 0;
    return;
  }
  switch (req.body.role) {
    case 'student': 
    requiredLevel = 0;
    break;
    case 'teacher': 
    requiredLevel = 1;
    break;
    case 'moderator': 
    requiredLevel = 2;
    break;
    case 'admin': 
    requiredLevel = 3;
    break;
    default: requiredLevel = 3;
    return;
  }
  if (requiredLevel < permsLevel) {
    return exports.signup(req,res);
  } else {
    return res.send("Access Denied!");
  }
}

exports.sendVerification = async (req, res) => {
  try { 
    var user = await User.findOne({_id : req.body._id})
      emailController.sendVerificationEmail(user,(info)=>{
        return res.status(200).json({ msg: "OK" });
      }, (err)=>{
        console.log(err);
        return res.status(500).json({ msg: err });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
}

exports.login = async (req, res) => {

  if (!req.body.credential) return res.status(422).json({ msg: "Hãy nhập credential" });
  if (!req.body.password)
    return res.status(422).errjson({ msg: "Hãy điền mật khẩu" });
  console.log(req.body)
  const user = await User.findOne({ credential: req.body.credential }).catch((err) => {
    return res.status(500);
  });
  console.log(user)
  if (!user?.checkValidPassword(req.body.password)) {
    return res.status(401).json({ msg: "Mật khẩu/credential không đúng" });
  }
  const jwtToken = user.generateJWT();

  return res.status(200).json({
    user: user,
    token: jwtToken,
  });
};

exports.autoLogin = async (req, res) => {
  try {
    if (res.locals.user === null) {
      return res.status(401).json({ msg: "Không tìm thấy tài khoản" });
    } else {
      return res.status(200).json(res.locals.user);
    }
  } catch (err) {
    return res.status(500).json({msg: "Internal server error!"})
  }
};


exports.verifyAccount = async (req, res) => {
  const token = req.query.token;
  const userid = req.query.user;
  console.log(token,userid)
  await User.findOneAndUpdate({ _id: userid },{isVerified: true}).exec((err, user) => {
    if (err) {
      return res.status(401).json({ msg: "Không tìm thấy tài khoản" });
    }
    if (user) {
      if (user.verificationToken === token) {
        return res.status(200).json(user);
      } else {
        return res.status(401).json({ msg: "Không tìm thấy tài khoản" });
      }
    }
    return res.status(401).json({ msg: "Không tìm thấy tài khoản" }); 
  });
};
