const JWT = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    //This should be the Bearer TOKEN
    const authHeader = req.headers["authorization"];

    //Make sure authHeader not null and get the token at index 1, rather than the Bearer at index 0
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json("Not authorized.");
    }

    JWT.verify(token, process.env.AUTH_TOKEN, (error, payload) => {
      if (error) {
        return res.status(403).json(error.message);
      }
      req.user = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateUser };
