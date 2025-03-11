const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const { connect } = require("mongoose");
const userRoutes = require('./Routes/UserRoutes')
const productRoute  = require('./Routes/ProductRoutes')

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT||3000;

//connect the mongodb database
connectDB();

app.get("/" , (req , res)=>{
  res.send("welcome");
})


// api routes 
app.use("/api/users" , userRoutes);
app.use("/api/products" , productRoute);


app.listen(PORT , ()=>{
  console.log("Server is running on port" , PORT);
});