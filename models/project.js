const mongoose = require("mongoose");
const { User } = require("./user");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // require: true,
    },
    description: {
      type: String,
      maxlength: 2000,
      // require: true,
    },
    techStack: {
      type: Array,
    },
    user: {
      type: String,
    },
    userName: {
      type: String,
    },
    colaborators: [
      {
        type: String,
      },
    ],
    colaboratorsDetails: [
      {
        name: String,
        username: String,
        userId: String,
      },
    ],
    comments: [
      {
        comment: String,
        userId: String,
        userName: String,
        commentTime: Date,
      },
    ],
    tags: {
      type: [String],
      // required: true,
    },
    colaboratorsLimit: {
      type: Number,
      default: 1,
    },
    requests: [
      {
        type: String,
      },
    ],
    filePath: {
      type: String,
    },
    fileMimetype: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports.Project = Project;
