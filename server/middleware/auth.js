const admin = require("../config/firebase-config");
var mongoose = require("mongoose");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).send("Access denied. Login first");
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      _id: decoded.uid,
      name: decoded.name,
      email: decoded.email,
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token");
  }
};
