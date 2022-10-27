const mongoose = require("mongoose");

const colaboratorReqSchema = new mongoose.Schema({
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  senderName: {
    type: String,
  },
  projectName: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

const ColaboratorReq = mongoose.model("ColaboratorReq", colaboratorReqSchema);
exports.ColaboratorReq = ColaboratorReq;
