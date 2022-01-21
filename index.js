const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const welcomeRoute = require("./routes/welcome");
require("dotenv").config();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoute);
app.use("/authenticate", authRoute);
app.use("/welcome", welcomeRoute);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

app.get("/", async (req, res, next) => {
  try {
    res.send("Hello, world!!");
  } catch (error) {
    next(error);
  }
});

module.exports = app;