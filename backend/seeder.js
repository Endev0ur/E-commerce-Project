const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Product = require('./models/Product');
const User = require('./models/User');
const products = require('./data/product');

dotenv.config();

//connect to the mongodb database;

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try{
    //clear existing data;
    await Product.deleteMany();
    await User.deleteMany();

    //create an default admin user
    const createdUser = await User.create({
      name:"adminUser",
      email:"admin@example.com",
      password:"12345678",
      role:"admin",
    });

    //assign the default user ID to each product

    const userId = createdUser._id;

    const sampleProducts = products.map((product)=>{
      return {...product , user:userId};
    })

    //insert the product in  the data base
    await Product.insertMany(sampleProducts);

    console.log("products data seeded successfully");

    process.exit();

  }
  catch(err){
    console.log("error seeding the data" , err);
    process.exit(1);
  }
}

seedData();