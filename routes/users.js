const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// For login
router.post("/", async (req, res) => {
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
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.find({ email: req.body.email });
  if (user.email) return res.status(400).send("User already registered..");

  user = User.find({ username: req.body.username });
  if (user.username) return res.status(400).send("Username already taken");

  user = new User(_.pick(req.body, ["name", "username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.send({
    token: token,
    name: user.name,
    userId: user._id,
    username: user.username,
  });
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

module.exports = router;
