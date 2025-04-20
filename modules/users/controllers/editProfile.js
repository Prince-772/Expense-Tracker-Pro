const mongoose = require("mongoose");

const EditProfile = async (req, res) => {
  const { newName, newProfession} = req.body;
  if (!newName && !newProfession) throw "No Data Provided";
  const userId = req.user._id.toString();

  const userModel = mongoose.model("users");
  const getUser = await userModel.findById(userId);
  if (!getUser) {
    return res.status(404).json({
      status: "failed",
      "message":"User not found"
    })
  }
  const updatedUser = await userModel.findByIdAndUpdate(userId, {
    ...(newName && {name: newName}),
    ...(newProfession && {profession:newProfession})
  },
    { runValidators: true, new:true }).select("-_id name email profession balance totalIncome totalExpense createdAt")
  res.status(200).json({
    status: "success",
    "message": "Profile updated successfully",
    "userInfo" : updatedUser
  })
};

module.exports = EditProfile;
