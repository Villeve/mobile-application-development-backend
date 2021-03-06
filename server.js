const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const universities = require("./routes/api/universities");
const faculties = require("./routes/api/faculties");
const courses = require("./routes/api/courses");
const comments = require("./routes/api/comments");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/universities", universities);
app.use("/api/faculties", faculties);
app.use("/api/courses", courses);
app.use("/api/comments", comments);

const port = process.env.PORT || 5000; // heroku port or 5000 (localhost)

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
