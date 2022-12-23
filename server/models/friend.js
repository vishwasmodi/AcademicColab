const mongoose = require("mongoose");
const { User } = require("./user");
require("dotenv").config();

const friendschema = new mongoose.Schema({
    friendId:{
        type: mongoose.Schema.Types.ObjectID,
        ref: User
    }
})
const Friend = mongoose.model("Friend", friendschema)
module.exports.Friend = Friend;