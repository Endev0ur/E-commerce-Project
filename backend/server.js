const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const { connect } = require("mongoose");
const userRoutes = require('./Routes/UserRoutes')
const productRoute  = require('./Routes/ProductRoutes');
const cartRoutes = require("./Routes/cartRoutes");
const checkoutRoutes = require("./Routes/checkoutRoutes")
const orderRoutes = require('./Routes/orderRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');
const subscriberRoutes = require('./Routes/subscriberRoutes');
const AdminRoutes = require('./Routes/AdminRoutes');
const productAdminRoute = require("./Routes/productAdminRoute")
const adminOrderRoutes = require("./Routes/adminOrderRoutes")




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
app.use("/api/cart" , cartRoutes);
app.use("/api/checkout" , checkoutRoutes);
app.use("/api/orders" , orderRoutes);
app.use("/api/upload" , uploadRoutes);
app.use("/api" , subscriberRoutes);


//admin routes
app.use("/api/admin/users" , AdminRoutes);
app.use("/api/admin/products" , productAdminRoute);
app.use("/api/admin/orders" , adminOrderRoutes);


app.listen(PORT , ()=>{
  console.log("Server is running on port" , PORT);
});