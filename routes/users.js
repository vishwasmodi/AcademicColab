const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// For login
router.post("/login", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  const name = user.name;
  res.status(200).send({
    token: token,
    name: name,
    userId: user._id,
    username: user.username,
  });
});

// For signup
router.post("/signup", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user = User.find({ email: req.body.email });
  if (user.email) return res.status(400).send("User already registered..");

  user = User.find({ username: req.body.username });
  if (user.username) return res.status(400).send("Username already taken");

  user = new User(
    _.pick(req.body, [
      "name",
      "username",
      "email",
      "password",
      "googleScholarId",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.send({
    token: token,
    name: user.name,
    userId: user._id,
    username: user.username,
    googleScholarId: user.googleScholarId,
  });
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// For Google login
const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  console.log(`User ${payload.name} with email ${payload.email} has logged in`);

  const { name, email, picture, sub } = payload;
  const userId = sub;
  return;
};

router.get("/completeDetails", auth, async (req, res) => {
  if (!req.user) return res.status(400).send("User not found");
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  console.log(user);
  console.log("here in backend");

  if (user.completeDetailsStatus) {
    const ret = {
      completeDetailsStatus: true,
    };
    res.send(ret);
  } else {
    const ret = {
      completeDetailsStatus: false,
    };
    res.send(ret);
  }
});

router.post("/completeDetails", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.completeDetailsStatus = true;
  user.username = req.body.username;
  user.googleScholarId = req.body.googleScholarId;
  user.institute = req.body.institute;
  user.bio = req.body.bio;
  console.log(user);
  await user.save();
  res.send(user);
});

module.exports = router;
