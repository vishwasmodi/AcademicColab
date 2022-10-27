const mongoose = require("mongoose");
const { User } = require("./user");
const { Project } = require("./project");
require("dotenv").config();

const requestschema = new mongoose.Schema({
  SenderId: {
    type: String,
  },
  ReceiverId: { type: String },
  ProjectId: { type: mongoose.Schema.objectId, ref: Project },
  Status: Boolean,
  Comments: {
    type: [String],
    maxlength: 100,
  },
});
const Request = mongoose.model("Request", requestschema);
module.exports.Request = Request;
