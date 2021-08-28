const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const accessTokenKey = "this_is_key_for_development";

const userSchema = new mongoose.Schema(
  {
    credential: { type: String, lowercase: true, require: true, unique: true },
    password: { type: String, require: true },
    role: {type: String, enum: ['student','teacher','moderator','admin'], require: true, default: 'student'},
    refreshToken: { type: String },
    isVerified: {type: Boolean, required: true, default: false},
    verificationToken: {type: String},
    profile: {
      fullname: {type: String},
      gender: {type: Boolean},
      dateOfBirth: {type: Date},
      placeOfBirth: {type: String},
      race: {type: String},
      isForeign: {type: Boolean},
      phone: {type: String},
      email: {type: String}
    }
  },
  {
    collection: "users",
  }
);

userSchema.plugin(uniqueValidator);

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      credential: this.credential,
      userId: this._id
    },
    accessTokenKey,
    { expiresIn: "24h" }
  );
};

userSchema.methods.generatePassword = function (password) {
  this.password = bcrypt.hashSync(password, 10);
};

userSchema.methods.checkValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);