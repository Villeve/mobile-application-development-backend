const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const universities = require("./routes/api/universities");
const faculties = require("./routes/api/faculties");
const courses = require("./routes/api/courses");
//const comments = require("./routes/api/comments");
const app = express();
//const cors = require('cors')
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

/*
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
*/

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//app.use(cors())
// Passport middleware
app.use(passport.initialize());
//app.use(middleware.tokenExtractor);
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/universities", universities);
app.use("/api/faculties", faculties);
app.use("/api/courses", courses);
//app.use("/api/comments", comments);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));