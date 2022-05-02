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
      type: mongoose.Schema.Types.ObjectID,
      ref: User,
    },
    userName: {
      type: String,
    },
    colaborators: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
      },
    ],
    colaboratorsUsername: [
      {
        type: String,
      },
    ],
    comments: [
      {
        comment: String,
        userId: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "User",
        },
        userName: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
