const express = require("express");
const addIncome = require("./controllers/addIncome");
const auth = require("../../middlewares/auth");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/gettransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");
const wrongMethod = require("../../handlers/wrongMethodshandler");

const transactionsRoutes = express.Router();

//Routes...
transactionsRoutes.use(auth);

//Protected Routes...

transactionsRoutes.route("/addincome").post(addIncome).all(wrongMethod);
transactionsRoutes.route("/addexpense").post(addExpense).all(wrongMethod);
transactionsRoutes
  .route("/")
  .get(getTransactions)
  .patch(editTransaction)
  .all(wrongMethod);
transactionsRoutes
  .route("/:transaction_id")
  .delete(deleteTransaction)
  .all(wrongMethod);

module.exports = transactionsRoutes;
