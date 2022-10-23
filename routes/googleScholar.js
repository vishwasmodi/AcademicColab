const express = require("express");
const router = express.Router();

var scholarly = require("scholarly");

// To search for a specific topic
// scholarly.search("machine learning").then((data) => {
//   console.log(data);
// });

router.get("/", async (req, res) => {
  scholarly.user("9A8uYtQAAAAJ").then((data) => {
    res.send(data);
  });
});

module.exports = router;
