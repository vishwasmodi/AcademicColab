const express = require("express");
const router = express.Router();
const axios = require("axios");
const { User, validate } = require("../models/user");
const { Project } = require("../models/project");
var scholarly = require("scholarly");

router.get("/:username", async (req, res) => {
  let user = await User.findOne({
    username: req.params.username,
  }).select("-password");
  if (!user) return res.status(404).send("User not found");
  let ownProjects = await Project.find({
    adminId: user._id,
  }).exec();

  let allProjects = await Project.find();
  let colabProjects = [];
  allProjects.map((project) => {
    let flag = 0;
    project.colaborators.map((uid) => {
      if (uid.toString() === user._id.toString()) {
        flag = 1;
      }
    });
    if (flag) colabProjects.push(project);
  });

  let googleScholarProjects = await scholarly.user(user.googleScholarId);

  const ret = {
    user: user,
    colabProjects: colabProjects,
    ownProjects: ownProjects,
    googleScholarProjects: googleScholarProjects,
  };
  console.log("In profile", ret);

  res.send(ret);
});

module.exports = router;
