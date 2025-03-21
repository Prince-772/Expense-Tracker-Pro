const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    const jwt_payload = jwt.verify(accessToken, process.env.jwt_salt);
    // console.log(jwt_payload);
    req.user = jwt_payload
  } catch (e) {
    res.status(401).json({
      status:"Failed",
      message:"Unable to authorize you"
    })
    return
  }
  next();
};

module.exports = auth;
