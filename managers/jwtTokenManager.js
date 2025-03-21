const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
  const accessToken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return accessToken;
};

module.exports = jwtManager;
