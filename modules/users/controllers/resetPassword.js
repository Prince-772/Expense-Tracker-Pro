const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailSender = require("../../../managers/emailManager");
const { clearJWTtoken } = require("../../../handlers/cookiesHandlers");

const resetPassword = async (req, res) => {
  const email = req.body.email;
  if (!email) throw "Email is required";
  const usersModel = mongoose.model("users");
  const getUser = await usersModel.findOne({ email });
  if (!getUser) throw "Email not Found";
  const enteredCode = Number(req.body.reset_code);
  if (!enteredCode) throw "Please Enter the code sent to your email";
  const newPassword = req.body.new_password;
  const confirmPassword = req.body.confirm_password;
  const resetCode = getUser.reset_code;
  if (resetCode !== enteredCode) throw "Reset code do not matched";
  if (!newPassword) throw "New Password is required";
  if (!confirmPassword) throw "Confirm Password is required";
  if (newPassword !== confirmPassword)
    throw "Password do not matched";
  const newHashed_password = await bcrypt.hash(newPassword, 12);
  await usersModel.updateOne(
    { email },
    { password: newHashed_password, reset_code: null },
    { runValidators: true }
  );
  clearJWTtoken(res);
  emailSender(
    email,
    "Password Updated Successfully",
    "Your password has been updated successfully"
  );
  res.status(200).json({
    status: "success",
    message: "Password Updated Successfully",
  });
};

module.exports = resetPassword;
