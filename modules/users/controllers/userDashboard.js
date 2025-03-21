const mongoose = require("mongoose")

const usetDashboard = async (req,res) => {
  // console.log(req.user);
  const userModel = mongoose.model("users")
  const transactionsModel = mongoose.model("transactions")
  const getUser = await userModel.findById(req.user._id).select("-_id name email balance")
  const getTransactions = await transactionsModel.find({user_ID:req.user._id}).sort("-createdAt").limit(5).select("amount transaction_type remarks createdAt")
  res.status (200).json({
    status:"success",
    userInfo : getUser,
    transactions:getTransactions
  })
}

module.exports = usetDashboard