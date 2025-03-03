import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <GenderCollectionSection />
      <NewArrivals></NewArrivals>

      {/* {Best Seller Section} */}

      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>

      <ProductDetails></ProductDetails>

    </div>
  )
}

export default Home