const JWT = require("jsonwebtoken");

const jwtTokens = ({ user_id, username }) => {
  const user = { user_id, username };
  const authToken = JWT.sign(user, process.env.AUTH_TOKEN, {
    expiresIn: "15m",
  });
  return { authToken };
};

module.exports = { jwtTokens };
