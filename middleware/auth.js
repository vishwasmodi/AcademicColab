const admin = require("../config/firebase-config");

module.exports = async function (req, res, next) {
  console.log(req.header);
  const token = req.header("x-auth-token");

  if (!token) res.status(401).send("Access denied. Login first");
  try {
    console.log(token);
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token");
  }
};
