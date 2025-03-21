const { clearJWTtoken } = require("../../../handlers/cookiesHandlers")

const logout = (req, res) => {
  clearJWTtoken(res);
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = logout