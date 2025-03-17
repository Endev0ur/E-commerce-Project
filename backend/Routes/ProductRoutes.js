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
});



// @route GET /api/aproducts
// @desc get all the product with option query filters
//access public

router.get("/" , async (req , res)=>{
  try{  
    const {collections , sizes , colors , gender , minPrice , maxPrice , sortBy , search , category , material , brand , limit} = req.query;

    let query = {}
    //first need to apply filter in login based on the query parameters

    if(collections && collections.toLocaleLowerCase() !== "all"){
      query.collections = collections;
    }

    if(category && category.toLocaleLowerCase() !== "all"){
      query.category = category;
    }

    if(material){
      query.material= {$in : material.split(",")}
    }

    if(brand){
      query.brand= {$in : brand.split(",")}
    }
    if(sizes){
      query.sizes= {$in : sizes.split(",")}
    }
    if(colors){
      query.colors = {$in : [colors]};
    }


    if(gender){
      query.gender = gender;
    }

    if(minPrice || maxPrice) {
      query.price = {};
      if(minPrice){
        query.price.$gte = Number(minPrice);
      }
      if(maxPrice){
        query.price.$lte = Number(maxPrice);
      }
    }

    if(search){
      query.$or = [
        {
          name : {$regex : search , $options : "i"}
        },
        {
          description: {$regex : search , $options : "i"}
        }
      ]
    }

    // sort logic based on query parameter
    let sort= {};
    if(sortBy){
      switch(sortBy){
        case "priceAsc" : 
          sort={price:1};
          break;
        case "priceDesc":
          sort = {price:-1};
          break;
        case "popularity":
          sort = {rating:-1};
          break;
        default:
          break;
      }
    }


    //fetch products and apply sorting and limit

    let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
    res.json(products);



  }catch(err){
    console.error(err);
    res.status(500).json("server Error");
  }

});



/* 
  @route GET /api/products/best-seller
  desc retieve the product with hightes rating
  access public
*/

router.get("/best-seller" , async (req  , res)=>{
  try{
    const bestSeller = await Product.findOne().sort({rating:-1});
    if(bestSeller){
      res.json(bestSeller)
    }else{
      res.status(404).json({
        message:"No best seller found !"
      })
    }
  }
  catch(err){
    console.error(err);
    res.status(500).json({
      message : "Server errror",
    })
  }
})

/*
 lets work on new arrivals

 @route GET /api/products/new-arrivals
 desc Retreive latest 8 products - creation date
 access public
*/

router.get("/new-arrival" , async (req , res)=>{
  try{
    //fetch latest 8 products
    const newArrivals = await Product.find().sort({createdAt:-1}).limit(8);
    res.json(newArrivals);
  }catch(err){
    console.error(err);
    res.status(500).json({
      message : "Server error",
    })
  }
})





/* let's work on getting the single product detail */
/* 

  @route GET /api/products/:id
  desc get a sigle product by id
  access public

*/

router.get("/:id" , async (req , res)=>{
  try{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(product){
      res.json(product);
    }else{
      res.status(404).json({
        message:"Product Not Found"
      })
    }
  }
  catch(err){
    console.error(err);
    res.status(500).json("Server error");
  }
})







/* 
  display the similar products

  @route GET /api/product/similar/:id
  desc : Retrieve similar products based on the currect product's gender and category
  access public

*/

router.get("/similar/:id" , async (req , res)=> {
  const {id} = req.params;
  console.log(id);

  try {
    const product = await Product.findById(id);

    if(!product){
      return res.status(404).json({
        message : "Product not found",
      })

    }
    const similarProducts = await Product.find({
      _id : {$ne : id},//exclude the current product ID,
      gender : product.gender,
      category : product.category,
    }).limit(4);

    res.json(similarProducts);
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      message : "Server Error",
    })
  }
})





module.exports = router;