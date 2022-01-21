const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  host: "localhost",
  user: process.env.USER,
  database: "authtakehome",
});

module.exports = pool;
