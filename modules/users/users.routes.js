const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middlewares/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const wrongMethod = require("../../handlers/wrongMethodshandler");


const userRoutes = express.Router();

//routes...
userRoutes.route("/register")
  .post(register) 
  .all(wrongMethod);

userRoutes.route("/login")
  .post(login)
  .all(wrongMethod);

userRoutes.route("/forgotpassword")
  .post(forgotPassword)
  .all(wrongMethod);

userRoutes.route("/resetpassword")
  .post(resetPassword)
  .all(wrongMethod);


userRoutes.use(auth)

//Protected routes

userRoutes.route("/dashboard").get(userDashboard).all(wrongMethod)


module.exports = userRoutes;
