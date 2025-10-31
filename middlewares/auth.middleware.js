const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("decoded user:", req.user);

  if (!authHeader)
    return res.status(401).json({ message: "No Token Provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};
