const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const users = require("./routes/users");
const projects = require("./routes/projects");
const profile = require("./routes/profile");
const colaboratorsReq = require("./routes/colaboratorsReq");
const messages = require("./routes/messages");
const googleScholar = require("./routes/googleScholar");

require("dotenv").config();
const { APP_USER, APP_USER_PASSWORD } = process.env;

mongoose
  .connect(
    `mongodb+srv://${APP_USER}:${APP_USER_PASSWORD}@academiccolab.dnojk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

// mongoose
//   .connect(`mongodb://localhost/playground`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/profile", profile);
app.use("/api/colaboratorsReq", colaboratorsReq);
app.use("/api/messages", messages);
app.use("/api/googleScholar", googleScholar);

const port = 5500;
app.listen(port, () => console.log("listening to port 5500"));
