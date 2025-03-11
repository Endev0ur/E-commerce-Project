const express = require('express');
const Product = require('../models/Product');
const { protect , admin } = require('../middleware/authMiddleware');

const router = express.Router();

//route POST /api/products
//desc:create a new product in the database,
//access Private/admin

router.post("/" , protect , admin , async (req , res) => {
  try{
    const {
      name , 
      description , 
      price , 
      discountPrice , 
      countInStock , 
      category , 
      brand , 
      sizes , 
      colors , 
      collections , 
      material , 
      gender , 
      images , 
      isFeatured , 
      isPublished , 
      tags , 
      dimensions , 
      weight , 
      sku
    } = req.body;

    const product = new Product({
      name , 
      description , 
      price , 
      discountPrice , 
      countInStock , 
      category , 
      brand , 
      sizes , 
      colors , 
      collections , 
      material , 
      gender , 
      images , 
      isFeatured , 
      isPublished , 
      tags , 
      dimensions , 
      weight , 
      sku,
      user:req.user._id,//reference to the admin user
    });

    const createdProduct = await product.save();

    res.status(201).json(
      {
        createdProduct,
      }
    )



  }catch(err){
    console.log(err);
    res.status(500).json({
      message:"server error",
      err
    });
  }
});

//@route PUT /api/products/:id
//@desc update an existing product ID
//access private

router.put("/:id" , protect , admin , async (req , res)=>{
  try{
    const {
      name , 
      description , 
      price , 
      discountPrice , 
      countInStock , 
      category , 
      brand , 
      sizes , 
      colors , 
      collections , 
      material , 
      gender , 
      images , 
      isFeatured , 
      isPublished , 
      tags , 
      dimensions , 
      weight , 
      sku
    } = req.body;


    //find the product in the database using the id provided in the database
    const product = await Product.findById(req.params.id);

    if(product){
      //update the prodct fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice|| product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured = isFeatured!==undefined ? isFeatured:product.isFeatured; 
      product.isPublished = isPublished!==undefined ? isPublished:product.isPublished; 
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      //save the updated product to the dataabse

      const updatedProduct = await product.save();

      res.json(updatedProduct);

    }
    else{
      res.status(404).json({
        message:"Product not found",
      })
    }

  }
  catch(err){
    console.error(err);
    res.status(500).send("server error");
  }
});



//@route DELETE /api/products/:id
//desc Delete a product by id
//access private/admin

router.delete("/:id" , protect , admin , async (req , res)=> {
  try{
    //find the prodct by id;

    const product = await Product.findById(req.params.id);
    if(product){
      //remove it from database
      await product.deleteOne();
      res.json({
        message:"Product Removed",
      })
    }
    else{
      res.status(404).json({
        message:"Product not found",
      })
    }

  }
  catch(err){
    console.log(error);
    res.status(500).send("Server error");
  }
})


module.exports = router;