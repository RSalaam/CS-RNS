const express = require("express");
const { authenticateUser } = require("../middleware/authorization");

const welcomeRoute = express.Router();

welcomeRoute.get("/", authenticateUser, async (req, res, next) => {
  try {
    res.json("Welcome to this case study!");
  } catch (error) {
    next(error);
  }
});

module.exports = welcomeRoute;
