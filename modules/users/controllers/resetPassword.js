const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailSender = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const email = req.body.email;
  if (!email) throw "Email is required";
  const enteredCode = req.body.reset_code;
  const newPassword = req.body.new_password;
  const confirmPassword = req.body.confirm_password;
  const usersModel = mongoose.model("users");
  const getUser = await usersModel.findOne({ email });
  if (!getUser) throw "Email not Found";
  const resetCode = getUser.reset_code;
  if (!enteredCode) throw "Please Enter the code sent to your email";
  if (resetCode !== enteredCode) throw "Reset code doesn't match";
  if (!newPassword) throw "New Password is required";
  if (!confirmPassword) throw "Confirm Password is required";
  if (newPassword !== confirmPassword)
    throw "Please Confirm The Password Correctly";
  const newHashed_password = await bcrypt.hash(newPassword, 12);
  await usersModel.updateOne(
    { email },
    { password: newHashed_password,reset_code:null},
    { runValidators: true }
  );
  emailSender(email,"Password Updated Successfully","Your password has been updated successfully")
  res.status(200).json({
    status:"success",
    message:"Password Updated Successfully" })
};

module.exports = resetPassword;
