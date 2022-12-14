const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // require: true,
    maxlength: 50,
  },
  username: {
    type: String,
    // require: true,
    maxlength: 20,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
    maxlength: 100,
  },
  googleScholarId: {
    type: String,
  },
  completeDetailsStatus: {
    type: Boolean,
    default: false,
  },
  institute: {
    type: String,
  },
  bio: {
    type: String,
  },
  interests: [
    {
      name: String,
      checked: Boolean,
    },
  ],
});

const { JWT_PK } = process.env;
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_PK);
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().max(50),
    email: Joi.string().max(255),
    username: Joi.string().max(255),
    password: Joi.string().max(255),
    googleScholarId: Joi.string(),
    completeDetailsStatus: Joi.boolean(),
    institute: Joi.string(),
    bio: Joi.string(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
