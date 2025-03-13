const express = require('express');
const User = require("../models/User");
const {protect , admin} = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/
// desc get all users (Admin only request)
//access private/admin

router.get("/" , protect, admin , async (req , res)=> {
  try{

    const users = await User.find({});
    res.json(users);

  }catch(err){
    console.error(err);
    res.status(500).json({
      message : "Server error occur in admin routes get all user route",
    })
  }
})


// @route POST /api/admin/users
// desc  Add a new user (admin only)
// access private/admin

router.post("/" , protect , admin , async (req , res)=>{
  const {name , email , password , role} = req.body;

  try{

    let user = await User.findOne({email});
    if(user){
      res.status(400).json({
        message : "User already exist",
      });
    }

    user = new User({
      name , email , password , role: role||"customer"
    })

    await user.save();
    res.status(201).json({
      message:"User created successfully" , user
    })

  }catch(err){
    console.error(err);
    res.status(500).json({
      message : "Server error in admin routes for add a new user",
    })
  }

})


// route PUT /admin/admin/users/:id
// desc update user info(admin only )=> name , email , role
// acess private/admin

router.put("/:id" , protect , admin , async(req , res)=> {
  try{

    const user = await User.findById(req.params.id);
    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updatedUser = await user.save();
    res.json({message : "User updated successfully" , 
      user:updatedUser,
    })

  }
  catch(err){
    console.error(err);
    res.status(500).json({
      message : "Server error occur in adminroutes , for update user information"
    })
  }
})

/*

  route DELETE /api/admin/users/:id
  desc : delete a user
  access private/admin
*/

router.delete("/:id" , protect , admin , async (req , res)=> {
  try{

    const user = User.findById(req.params.id);
    if(user){
      await user.deleteOne();
      res.json({
        message : "User deleted Successfully",
      })
    }else{
      res.status(404).json({
        message : "User not found",
      })
    }

  }catch(err){
    console.error(err);
    res.status(500).json({
      message :"Server error in delete a user",
    })
  }
})

module.exports = router;