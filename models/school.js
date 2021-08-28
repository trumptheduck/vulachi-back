const mongoose = require("mongoose");
const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    code: { type: String, require: true },
    region: { type: String, enum: ['NORTH','MIDDLE','SOUTH'], require: true },
    address: { type: String },
    phones: [{type: String }],
    hotlines: [{type: String }],
    faxes: [{type: String }],
    emails: [{ type: String }],
    website: { type: String },
    desc: { type: String },
    thumbnail: { type: String},
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  },
  {
    collection: "schools",
  }
);
module.exports = mongoose.model("School", schoolSchema);