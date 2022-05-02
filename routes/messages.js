const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Message } = require("../models/message");

// New message
router.post("/", auth, async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get previous messages
router.get("/:projectId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      projectId: req.params.projectId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
