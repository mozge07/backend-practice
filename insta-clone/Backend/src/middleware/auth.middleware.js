const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token, Unauthorized access",
    });
  }

  const isTokenBlacklisted = await redis.get(token);

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  req.user = decoded;

  next();
}

/** send data of valid user into (req.user) */

module.exports = identifyUser;
