const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    code: { type: String, require: true },
    schoolCode: { type: String },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', require: true },
    data: [
      {
        year: { type: Number },
        requirements: [
          {
            group: { type: String },
            grade: { type: Number }
          }
        ],
        amount: { type: Number }
      }
    ],
    desc: { type: String }
  },
  {
    collection: "courses",
  }
);
module.exports = mongoose.model("Course", courseSchema);