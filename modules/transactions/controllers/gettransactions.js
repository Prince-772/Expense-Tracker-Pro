const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const user_ID = req.user._id;
  
  const transactions = await transactionsModel.find({ user_ID,...req.query }).select("amount remarks createdAt transaction_type -_id");

  res.status(200).json({
    status:"success",
    data:transactions
  })
};

module.exports = getTransactions;
