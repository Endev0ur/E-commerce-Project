const express = require('express');
const Order = require('../models/Order');

const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

/* 
  route GET /api/order/my-orders
  desc get logged in user's order
  access private
*/

router.get("/my-orders" , protect , async (req , res)=> {
  try{
    // find orders for the authenticated users
    const orders = await Order.find({
      user:req.user._id
    }).sort({
      createdAt:-1,
    });
    res.json(orders);
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      message : "Server error in order routes my-order"
    })
  }
})


/*
  route GEt /api/orders/:id
  desc get order details by ID
  access private
*/

router.get("/:id" , protect , async (req , res)=> {
  try{
    const order = await Order.findById(req.params.id).populate("user" , "name email");

    if(!order){
      return res.status(401).json({
        message : "Order not found",
      })
    }

    res.json(order);
  }
  catch(err){
    console.log("helo")
    console.log(err);
    res.status(500).json({
      message : "server error occur in order routes : /api/order/:id"
    })
  }
})





module.exports = router;