const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();


// @route POST /api/checkout
// desc create a new checkout session
//access private

router.post("/" , protect , async(req , res)=>{
  const { checkoutItems , shippingAddress , paymentMethod , totalPrice } = req.body;

  if(!checkoutItems || checkoutItems.length===0){
    return res.status(400).json({
      message : "No items in checkout",
    })
  }

  try{

    //create a new checkout session
    const newCheckout = await Checkout.create({
      user:req.user._id,
      checkoutItems : checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus:"Pending",
      isPaid:false,

      
      
    })

    console.log(`Checkout create for user : ${req.user._id}`);

    res.status(201).json(newCheckout);

  }
  catch(err){
    console.error(err);
    res.status(500).json({
      message : "Server Error",
      err
    })
  }
})

//@route PUT /api/checkout/:id/pay
//desc Update checkout to mark as paid after successfull payment
//access private

router.put("/:id/pay"  , protect , async (req , res)=>{
  const {paymentStatus , paymentDetails} = req.body;

  try{
    const checkout = await Checkout.findById(req.params.id);
    if(!checkout){
      return res.status(404).json({
        message : "Checkout Not Found",
      })
    }

    if(paymentStatus === "paid"){
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails,
      checkout.paidAt = Date.now();

      await checkout.save();

      res.status(200).json(checkout);
    }else{
      res.status(400).json({
        message : "Invalid Payment Status",
      });
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({message : "server error in checkout" , err})
  }
})


// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// access private

router.post("/:id/finalize" , protect , async (req , res)=> {
  try{
    const checkout = await Checkout.findById(req.params.id);

    if(!checkout){
      return res.status(404).json({
        message : "Chekcout not found",
      })
    }

    if(checkout.isPaid && ! checkout.isFinalized){
      // create the finalorder based on the checkout details
      const finalOrder = await Order.create({
        user:checkout.user,
        orderItems:checkout.checkoutItems,
        shippingAddress:checkout.shippingAddress,
        paymentMethod:checkout.paymentMethod,
        totalPrice:checkout.totalPrice,
        isPaid:true,
        paidAt:checkout.paidAt,
        isDelivered:false,
        paymentStatus:"paid",
        paymentDetails:checkout.paymentDetails,
      });
      //mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      //when the order is finalized let's delete the user cart to cleanup
      await Cart.findOneAndDelete({user:checkout.user})
      res.status(201).json(finalOrder);

    }
    else if(checkout.isFinalized){
      return res.status(400).json({
        message : "CHekcout already finalized"
      })
    }else{
      res.status(400).json({
        message : "Checkout is not paid",
      })
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      message : "Server Error in checkout routes in finalise wala",
    })
  }
})

module.exports = router;




