const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const { transaction_id } = req.params;
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please Provide a valid transaction id";
  const transactionsModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
    user_ID: req.user._id,
  });

  if (!getTransaction) throw "Transaction not found in your account";

  let transaction_type_flag = 1;
  if (getTransaction.transaction_type === "income") transaction_type_flag = -1;

  await usersModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      $inc: {
        balance: getTransaction.amount * transaction_type_flag,
        totalIncome:
          transaction_type_flag === -1 ? getTransaction.amount * -1 : 0,
        totalExpense:
          transaction_type_flag === -1 ? 0 : getTransaction.amount * -1,
      },
    },
    { runValidators: true }
  );
  await transactionsModel.deleteOne({
    _id: transaction_id,
    user_ID: req.user._id,
  });
  res.status(200).json({
    status: "Success",
    message: "Transaction deleted successfully",
  });
};
module.exports = deleteTransaction;
