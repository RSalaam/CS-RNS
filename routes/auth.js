const express = require("express");
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { jwtTokens } = require("../utils/jwt");

const authRoute = express.Router();

authRoute.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Check for correct username
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (!users.rows.length) {
      return res.status(401).json("Incorrect username.");
    }

    //Now, check for correct password
    const correctPW = await bcrypt.compare(password, users.rows[0].password);

    if (!correctPW) {
      return res.status(401).json("Incorrect password.");
    }

    //Generate auth token, since we have gotten this far.
    let token = jwtTokens(users.rows[0]);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = authRoute;
