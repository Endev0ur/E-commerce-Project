import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeatureSection from '../components/products/FeatureSection'

const placeholderProducts = [
  {
    _id:1,
    name:"Product 1",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=2",  
    }]
  },
  {
    _id:2,
    name:"Product 2",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=1",  
    }]
  },
  {
    _id:3,
    name:"Product 3",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=3",  
    }]
  },
  {
    _id:1,
    name:"Product 1",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=2",  
    }]
  },
  {
    _id:2,
    name:"Product 2",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=1",  
    }]
  },
  {
    _id:3,
    name:"Product 3",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=3",  
    }]
  },
  {
    _id:1,
    name:"Product 1",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=2",  
    }]
  },
  {
    _id:2,
    name:"Product 2",
    price:100,
    images:[{
      url:"https://picsum.photos/500/500?random=1",  
    }]
  },
]

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <GenderCollectionSection />
      <NewArrivals></NewArrivals>

      {/* {Best Seller Section} */}

      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>

      <ProductDetails></ProductDetails>

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4 '>
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts}></ProductGrid>
      </div>

      <FeaturedCollection></FeaturedCollection>
      <FeatureSection></FeatureSection>
    </div>
  )
}

export default Home