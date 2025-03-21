require("express-async-errors");
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const errorHandler = require("./handlers/erroeHandler");
const userRoutes = require("./modules/users/users.routes");
const transactionsRoutes = require("./modules/transactions/transactions.routes");
require('dotenv').config();


const app = express();
app.use(cors())
const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("Connected To DB"))
    .catch(err => console.log("DB Connection Error:", err));


app.use(express.json());

//models init
require("./models/users.model")
require("./models/transactions.model")

 //Routes...

app.use("/api/users",userRoutes)
app.use("/api/transactions",transactionsRoutes)



//End of all routes
app.all("*",(req,res,next)=>{
  res.status(404).json({
    status:"Failed",
    message:"Not Found"
  })
})
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port: ${port}`);
});
