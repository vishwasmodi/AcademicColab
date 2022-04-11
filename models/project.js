const mongoose = require("mongoose");
const { User } = require("./user");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      // require: true,
    },
    description: {
      type: String,
      maxlength: 2000,
      // require: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectID,
      ref: User,
    },
    adminName: {
      type: String,
    },
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
      },
    ],
    contributorsUsernames: [
      {
        type: String,
      },
    ],
    tags: {
      type: [String],
      // required: true,
    },
    contributorsLimit: {
      type: Number,
      default: 1,
    },
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
