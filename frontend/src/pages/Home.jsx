import React, { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeatureSection from '../components/products/FeatureSection'
import {useDispatch, useSelector} from 'react-redux';
import { fetchProductsByFilters  } from '../redux/slices/productSlice';
import axios from 'axios';



const Home = () => {

  const dispatch = useDispatch();
  const { products , loading , error } = useSelector((state)=>state.products);

  const [bestSellerProducts , setBestSellerProducts] = useState(null);

  useEffect(() => {
    //fetch products from a specific collection
    dispatch(fetchProductsByFilters({
      gender:"Women",
      category:"Bottom Wear",
      limit:8,
    })
  )

    //fetch the best seller products
    const fetchBestSeller = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        setBestSellerProducts(response.data);

      }catch(err){
        console.error(err);
      }
    };
    fetchBestSeller();

  } , [dispatch])

  

  return (
    <div>
      <Hero></Hero>
      <GenderCollectionSection />
      <NewArrivals></NewArrivals>

      {/* {Best Seller Section} */}

      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>

      {bestSellerProducts ? (<ProductDetails productId = {bestSellerProducts._id}></ProductDetails>) : (<p className='text-center'>Loading Best Seller Products ...</p>) }

      

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4 '>
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error}></ProductGrid>
      </div>

      <FeaturedCollection></FeaturedCollection>
      <FeatureSection></FeatureSection>
    </div>
  )
}

export default Home