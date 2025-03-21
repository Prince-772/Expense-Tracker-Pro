const express = require("express");
const addIncome  = require("./controllers/addIncome");
const auth = require("../../middlewares/auth");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/gettransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionsRoutes = express.Router()

//Routes...
transactionsRoutes.use(auth)

//Protected Routes...

transactionsRoutes.post("/addincome",addIncome)
transactionsRoutes.post("/addexpense",addExpense)
transactionsRoutes.get("/",getTransactions)
transactionsRoutes.delete("/:transaction_id",deleteTransaction)
transactionsRoutes.patch("/",editTransaction)


module.exports = transactionsRoutes