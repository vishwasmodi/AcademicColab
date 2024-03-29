const { ColaboratorReq } = require("../models/colaboratorReq");
const { Project } = require("../models/project");
const { User } = require("../models/user");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  console.log("colab req", req.user._id);

  const requests = await ColaboratorReq.find({
    receiverId: req.user._id,
  });

  console.log("hello", requests);
  res.send(requests);
});

// Send request for colaboration
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400).send("Wrong user");
    return;
  }

  const project = await Project.findById(req.body.projectId);

  if (project.colaborators.find((c) => c.toString() === user._id)) {
    res.status(400).send("User is already colaborator");
    return;
  }

  const requested = await ColaboratorReq.find({
    senderId: req.user._id,
    projectId: req.body.projectId,
  });
  if (requested.length > 0) {
    res.status(400).send("Already requested");
    return;
  }
  // if (project.colaboratorsLimit >= project.colaborators.length())
  //   res.send("Max number of colaborators for this project reached");

  await Project.findByIdAndUpdate(req.body.projectId, {
    $push: {
      requests: req.user._id,
    },
    function(err) {
      if (err) return next(err);
    },
  }).exec();
  let request = new ColaboratorReq({
    senderId: req.user._id,
    receiverId: project.user,
    projectId: req.body.projectId,
    senderName: user.name,
    projectName: project.name,
    status: false,
  });

  await request.save();
  res.send(request);
  return;
});

// Respond to request
// Here id is request id
router.post("/:id", auth, async (req, res) => {
  const request = await ColaboratorReq.findById(req.params.id).exec();
  const sender = await User.findById(request.senderId);
  if (!request || req.user._id !== request.receiverId.toString())
    res.status(400).send("Wrong request id");

  console.log("request", request, sender, req.body.status);
  if (req.body.status === "Confirm") {
    const colaboratorsDetails = {
      name: sender.name,
      userId: sender._id.toString(),
    };
    console.log("colaboratorsDetails", colaboratorsDetails);
    await Project.findByIdAndUpdate(request.projectId.toString(), {
      $push: {
        colaborators: sender._id.toString(),
        colaboratorsDetails: colaboratorsDetails,
      },
      function(err) {
        console.log(err);
        if (err) return next(err);
      },
    }).exec();
  }
  await ColaboratorReq.findByIdAndRemove(req.params.id);
  const requests = await ColaboratorReq.find({
    receiverId: req.user._id,
  });

  res.send(requests);
});

module.exports = router;
