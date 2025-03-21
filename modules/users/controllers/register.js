const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const getAccessToken = require("../../../managers/jwtTokenManager");
const emailSender = require("../../../managers/emailManager");
const register = async (req, res) => {
  const { name, email, password, confirm_password, balance } = req.body;

  const usersModel = mongoose.model("users");
  const getDuplicateEmail = await usersModel.findOne({ email: email });
  if (!name) throw "Name must be provided";
  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be provided";
  if (password.length < 5) throw "Password must be longer than 5 characters";
  if (password !== confirm_password) throw "Confirm Password doesn't match";
  if (getDuplicateEmail) throw "This email already exist";

  const hashed_password = await bcrypt.hash(password, 12);
  const user = { name, email, password: hashed_password, balance };
  const createdUser = await usersModel.create(user);

  const accessToken = getAccessToken(createdUser);

  emailSender(
    createdUser.email,
    `Welcome ${createdUser.name}`,
    "Welcome to expense tracker PRO, we hope you can manange your expenses easily and effectively from our platform."
  );

  res.status(200).json({
    status: "success",
    message:"User Registered Successfully",
    data: { name, email, balance },
    accessToken,
  });
};

module.exports = register;
