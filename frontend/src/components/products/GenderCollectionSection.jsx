import React from 'react'
import mensCollectionSection from '../../assets/mens-collection.webp';
import womenCollectionSection from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';

const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto flex flex-col md:flex-row gap-8'>
        {/* women collection */}
        <div className='relative flex-1'>
          <img src={womenCollectionSection} alt="message" 
          className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>Women's Collection</h2>
            <Link to="/collection/all?gender=Women" className="text-gray-900 underline">Shop now</Link>

          </div>
        </div>
        {/* mens collection */}

        <div className='relative flex-1'>
          <img src={mensCollectionSection} alt="message" 
          className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>Men's Collection</h2>
            <Link to="/collection/all?gender=Men" className="text-gray-900 underline">Shop now</Link>

          </div>
        </div>
        
      </div>

    </section>
  )
}

export default GenderCollectionSection