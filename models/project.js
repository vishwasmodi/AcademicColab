const mongoose = require("mongoose");
const { User } = require("./user");
require("dotenv").config();

const projectschema = new mongoose.Schema({
    ProjectName: {
        type: String,
        require: true,
    },
    Description: {
        type: [String],
        maxlength: 50,
        require: true,
    },
    AdminId: {type: mongoose.Schema.Types.ObjectID ,ref: User},
    pdf:{
        type: Buffer
    },
    Contributors: {
        type: [mongoose.Schema.Types.ObjectID] ,
        ref: User,
        required: true,
        maxlength: 10,
    },
    tags:{
        type: [String],
        required: true
    }
})
const Project = mongoose.model("Project", projectschema)
module.exports.Project = Project;