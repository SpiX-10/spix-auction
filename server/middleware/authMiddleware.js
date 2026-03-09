const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const bearerHeader = req.header("Authorization");

  if (!bearerHeader) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  // Split "Bearer TOKEN"
  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "spixsecret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;