const mongoose = require("mongoose");
const { User } = require("./user");
require("dotenv").config();

const friendrequestschema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectID,
        ref: User
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: User
    },
    note: {
        type: [String],
        maxlength: 50
    }

})
const FriendRequest = mongoose.model("FriendRequest", friendrequestschema)
module.exports.FriendRequest = FriendRequest;