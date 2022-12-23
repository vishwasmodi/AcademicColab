const express = require("express");
const multer = require("multer");
const { Project } = require("../models/project");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

router.get("/", async (req, res) => {
  const projects = await Project.find().sort("createdAt");
  projects.reverse();
  res.send(projects);
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  console.log(project);
  if (!project) return res.status(404).send("Project not found.");
  res.send(project);
});

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  const colaborators = [req.user._id];
  const colaboratorsDetails = [];
  colaboratorsDetails.push({
    name: user.name,
    username: user.username,
    userId: user._id,
  });
  const interests = req.body.interests.map((interest) => interest.name);
  console.log(interests);
  console.log(req.body);
  let project = new Project({
    name: req.body.name,
    description: req.body.description,
    user: req.user._id,
    userName: user.name,
    colaborators: colaborators,
    colaboratorsDetails: colaboratorsDetails,
    pdf: req.body.pdf,
    interests: interests,
  });
  project = await project.save();
  res.send(project);
});

router.post("/comments/:projectId", auth, async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  const userName = await User.findById(req.user._id);

  project.comments.push({
    userId: req.user._id,
    userName: userName.name,
    comment: req.body.comment,
    commentTime: new Date(),
  });
  await project.save();
  res.send(project);
});

router.delete("/:id", auth, async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if (!project)
    return res.status(404).send("The project with the give id doesnt exist");
  res.send(project);
});

router.get("/search/:text", async (req, res) => {
  const projects = await Project.find();
  if (req.params.text === "all") {
    res.send(projects);
    return;
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(req.params.text.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(req.params.text.toLowerCase()) ||
      project.userName.toLowerCase().includes(req.params.text.toLowerCase())
  );
  res.send(filteredProjects);
});

router.get("/filter/:interests", auth, async (req, res) => {
  const interests = req.params.interests.split("&");
  const projects = await Project.find();
  if (req.params.interests === "all") {
    res.send(projects);
    return;
  } else if (interests[0] === "my-interests") {
    const user = await User.findById(req.user._id).exec();
    console.log(user.interests);
    console.log(projects);
    const filteredProjects = projects.filter((project) =>
      user.interests.some((val) => {
        console.log(val);
        return project.interests.includes(val);
      })
    );
    console.log("filtered", filteredProjects);
    res.send(filteredProjects);
    return;
  }
  const filteredProjects = projects.filter((project) =>
    interests.every((val) => {
      return project.interests.includes(val);
    })
  );
  res.send(filteredProjects);
});

module.exports = router;
