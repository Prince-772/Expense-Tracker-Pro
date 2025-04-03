const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const { transaction_id, transaction_type, amount } = req.body;
  const newAmount = amount;

  // Validate transaction_id
  if (!transaction_id) throw "Transaction ID is required";
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid transaction ID";
  if (
    transaction_type &&
    transaction_type !== "income" &&
    transaction_type !== "expense"
  )
    throw "Transaction type should be income or expense";
  const transactionsModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  // Fetch the transaction
  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
    user_ID: req.user._id,
  });

  if (!getTransaction) throw "Transaction not found in your account";

  // Extract old amount and type
  const oldAmount = getTransaction.amount;
  const oldType = getTransaction.transaction_type;

  // Ensure `newAmount` is a valid number
  const updatedAmount = Number(newAmount);
  if (newAmount !== undefined && isNaN(updatedAmount)) {
    throw "Invalid amount provided";
  }
  if (newAmount <= 0) throw "Amount must be greater than 0";

  let balanceChange = 0;
  let totalIncomeChange = 0;
  let totalExpenseChange = 0;

  // Case 1: Updating only the amount, same type
  if (
    newAmount !== undefined &&
    (!transaction_type || transaction_type === oldType)
  ) {
    if (oldType === "income") {
      balanceChange = updatedAmount - oldAmount;
      totalIncomeChange = updatedAmount - oldAmount;
    } else {
      balanceChange = oldAmount - updatedAmount;
      totalExpenseChange = updatedAmount - oldAmount;
    }
  }
  // Case 2: Updating only the transaction type, keeping the same amount
  else if (transaction_type && newAmount === undefined) {
    if (oldType === "income" && transaction_type === "expense") {
      balanceChange = -oldAmount * 2;
      totalIncomeChange = -oldAmount;
      totalExpenseChange = oldAmount;
    } else if (oldType === "expense" && transaction_type === "income") {
      balanceChange = oldAmount * 2;
      totalIncomeChange = oldAmount;
      totalExpenseChange = -oldAmount;
    }
  }
  // Case 3: Updating both amount and type
  else if (transaction_type && newAmount !== undefined) {
    if (oldType === "income" && transaction_type === "expense") {
      balanceChange = -oldAmount - updatedAmount;
      totalIncomeChange = -oldAmount;
      totalExpenseChange = updatedAmount;
    } else if (oldType === "expense" && transaction_type === "income") {
      balanceChange = oldAmount + updatedAmount;
      totalIncomeChange = updatedAmount;
      totalExpenseChange = -oldAmount;
    }
  }

  // Update the user's balance
  if (balanceChange !== 0) {
    await usersModel.findByIdAndUpdate(
      req.user._id,
      {
        $inc: {
          balance: balanceChange,
          totalExpense: totalExpenseChange,
          totalIncome: totalIncomeChange,
        },
      },
      { runValidators: true }
    );
  }

  // Update the transaction and return the new value
  const newTransaction = await transactionsModel
    .findByIdAndUpdate(transaction_id, req.body, {
      runValidators: true,
      new: true,
    })
    .select("transaction_type remarks amount");

  res.status(200).json({
    status: "success",
    message: "Transaction updated successfully",
    data: newTransaction,
  });
};

module.exports = editTransaction;
