const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Session has expired, please log in again",
      });
    }

    const jwt_payload = jwt.verify(accessToken, process.env.JWT_SECRET); 
    req.user = jwt_payload;
    next(); 
  } catch (e) {
    return res.status(401).json({
      status: "Failed",
      message: "Invalid or expired token",
    });
  }
};

module.exports = auth;
