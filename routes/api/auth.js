const jwt = require("express-jwt");
const User = require("../../models/User");

// User role "1" equals to admin user
const checkUserIsAdmin = () => (req, res, next) => {
  User.findOne({ _id: req.payload.id }).then(user =>
    user.role !== "1" ? res.status(401).json() : next()
  );
};

const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[2];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  }),
  checkUserIsAdmin
};

module.exports = auth;
