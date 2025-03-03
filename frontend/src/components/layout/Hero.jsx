import React from 'react'
import heroimg from "../../assets/Hero.webp";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative'>
      {/* {hero image here which should be in asset folder} */}
      <img src={heroimg} alt="message"  className='h-[400px] md:h-[600px] lg:h-[750px] object-cover w-full'/>
      <div className='absolute inset-0 bg-opacity-5 flex items-center justify-center'>
        <div className='text-center text-white p-6'>
          <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4 '>
            Vacation <br /> Ready
          </h1>
          <p className='text-sm tracking-tighter md:text-lg mb-6'>
            Explore out vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link to="#" className="bg-white text-gray-950 px-8 py-2 rounded-sm text-lg">Shop Now</Link>
        </div>
      </div>
    </section>

  )
}

export default Hero