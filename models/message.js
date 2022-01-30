const mongoose = require("mongoose");
const { User } = require("./user");
const { Project } = require("./project");
require("dotenv").config();

const messageschema = new mongoose.Schema({
    ProjectId: {type: mongoose.Schema.objectId ,ref: Project},
    chats: {
        SenderId: {type: mongoose.Schema.Types.ObjectID ,ref: User},
        chat: [String]
    }
})
const Message = mongoose.model("Message", messageschema)
module.exports.Message = Message;