const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const getAccessToken = require("../../../managers/jwtTokenManager");
const { setJWTtoken } = require("../../../handlers/cookiesHandlers");
const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password } = req.body;
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  const getUser = await usersModel.findOne({ email });
  if (!getUser) throw "No Users Found, Please Register First";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Wrong Password, Try again";

  const accessToken = getAccessToken(getUser);

  setJWTtoken(res, accessToken);
  //success
  res.status(200).json({
    status: "success",
    message: `Login successful`
  });
};

module.exports = login;
