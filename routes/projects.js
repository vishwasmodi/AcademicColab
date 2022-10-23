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

router.post("/", auth, async (req, res) => {
  const userName = await User.findById(req.user._id).exec();
  console.log(userName);
  const colaborators = [req.user._id];
  const colaboratorsUsernames = [userName.name];

  let project = new Project({
    name: req.body.name,
    description: req.body.description,
    user: req.user._id,
    userName: userName.name,
    colaborators: colaborators,
    colaboratorsUsernames: colaboratorsUsernames,
    pdf: req.body.pdf,
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

module.exports = router;
