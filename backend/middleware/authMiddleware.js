const jwt = require("jsonwebtoken");
const User = require("../models/user")


const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
     //console.log("HEADER:", req.headers.authorization);

      token = req.headers.authorization.split(" ")[1];
     // console.log("TOKEN:", token);

      //console.log("SECRET USED:", process.env.JWT_SECRET);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("DECODED:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      return next();

    } catch (error) {
      //console.log("VERIFY ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

module.exports = protect;