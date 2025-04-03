const mongoose = require("mongoose");
const emailSender = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const usersModel = mongoose.model("users");

  if (!email) throw "Email is required";
  const getUser = await usersModel.findOne({ email }).select("-_id name email");
  // console.log(getUser)
  if (!getUser) throw "This email is not registered";


  const reset_code = Math.floor(Math.random() * 900000) + 100000; //100,000 to 999,999
  await usersModel.updateOne({email},{reset_code},{runValidators : true})
  emailSender(email,"Password Reseting Code",`Your Password Reseting Key is ${reset_code}`)
  res.status(200).json({
    status: "success",
    message: "Password reset code has been sent to your email",
    data:getUser
  });
};

module.exports = forgotPassword;
