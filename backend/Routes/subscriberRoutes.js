const express = require('express');
const router = express.Router();

const Subscriber = require("../models/Subcriber");

// @route POST /api/subscribe
// desc handle newsletter subscription
// access public

router.post("/subscribe" , async (req , res) =>{
  const {email} = req.body;

  if(!email){
    return res.status(400).json({
      message : "Please Provide email"
    });
  }

  try{

    // check if email is already subscribed
    let subscriber = await Subscriber.findOne({email});

    if(subscriber){
      return res.status(400).json({
        message : "email is already subscribed",
      })
    }

    // create a new subsriber if email is not subscribed


    subscriber = new Subscriber({email});
    await subscriber.save();

    res.status(201).json({
      message : "User Subscribed successfully to the newsletter",
    })

  }
  catch(err){
    console.error(err);
    res.json(500).json({
      message : "server error in subscriber section"
    })
  }

})

module.exports = router;