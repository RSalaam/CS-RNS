const express = require("express");
const pool = require("../database/db");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

userRoute.post("/", async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const hashedPW = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPW]
    );
    res.json(`User '${newUser.rows[0].username}' added!`);
  } catch (error) {
    next(error);
  }
});

module.exports = userRoute;
