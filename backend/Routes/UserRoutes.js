const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@route POST /api/users/register
//@description : register a new user
//access public

router.post("/register" , async (req , res)=>{
  const {name , email , password} = req.body;
  try{
    //registration link
    
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({
        message:"User already exist"
      })
    }

    user = new User({name , email , password});
    await user.save();

    // create json web token jwt payload
    const payload = {user: {
      id:user._id, role:user.role
    }};

    //sign and return the token along with user data
    jwt.sign(payload,process.env.SECRET_KEY , {expiresIn:"300h"}, (err , token)=>{
      if(err){
        throw err;
      }
      //send the user and token in reponse
      res.status(201).json({
        user:{
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
        },
        token,
      })
    });

  }catch(error){
    console.log(error);
    res.status(500).send("Server Error");
  }
})



//@route POST /api/user/login
//description:Authenticate user
//access public

router.post("/login" , async (req , res)=>{
  const {email , password} = req.body;

  try{

    //find the user by email
    let user = await User.findOne({email});
    if(!user) return res.status(400).json({
      message:"Invalid credential",
    })

    //password matching
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
      return res.status(400).json({
        message : "Invalid credentail"
      })
    }

     // create json web token jwt payload
     const payload = {user: {
      id:user._id, role:user.role
    }};

    //sign and return the token along with user data
    jwt.sign(payload,process.env.SECRET_KEY , {expiresIn:"300h"}, (err , token)=>{
      if(err){
        throw err;
      }
      //send the user and token in reponse
      res.json({
        user:{
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
        },
        token,
      })
    });

  }catch(err){
    console.log(error);
    res.status(500).send("Server Error");
  }
})

//@route GET /api/users/profile
//description : get logged-in user's profile(protected route)
//access private

router.get("/profile" , protect , async (req , res)=>{
  res.json(req.user);
})






module.exports = router;