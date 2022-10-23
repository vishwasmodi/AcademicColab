const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { JWT_PK } = process.env;
module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  // const googleToken = req.header("x-auth-google");

  if (!token) res.status(401).send("Access denied. Login first");
  try {
    // console.log(token);
    // let decoded = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });
    // console.log(decoded);
    // const payload = decoded.getPayload();

    // console.log(
    //   `User ${payload.name} with email ${payload.email} has logged in`
    // );

    // const deecoded = {
    //   name: payload.name,
    //   username: payload.username,
    //   email: payload.email,
    // };
    // const userId = dec;
    // req.user = {};
    let decoded = jwt.verify(token, JWT_PK);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token");
  }
};
