const express = require("express");
const router = express.Router();
const axios = require("axios");
const { User, validate } = require("../models/user");
const { Project } = require("../models/project");

router.get("/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username }).select(
    "-password"
  );
  let ownProjects = await Project.find({
    adminId: user._id,
  });

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
  console.log("hello");
  const ret = {
    user: user,
    colabProjects: colabProjects,
    ownProjects: ownProjects,
  };
  res.send(ret);
});

module.exports = router;
