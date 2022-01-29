const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const users = require("./routes/users");
require("dotenv").config();
const { APP_USER, APP_USER_PASSWORD } = process.env;

mongoose
  .connect(
    `mongodb+srv://${APP_USER}:${APP_USER_PASSWORD}@academiccolab.dnojk.mongodb.net/academiccolab?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message, APP_USER, APP_USER_PASSWORD));

app.use(express.json());
app.use(cors());
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening to port 5000"));
