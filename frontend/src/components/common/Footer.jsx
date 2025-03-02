import React from 'react'
import { Link } from 'react-router-dom'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import {FiPhoneCall} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className='border-t py-12'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>News-Letter</h3>
          <p className='text-gray-500 mb-4'>
            Be the first to head about new products , exclusive events & online offers.
          </p>
          <p className='font-medium text-sm text-gray-600 mb-6'>
            Sign up and get 10% off on you first order
          </p>

          {/* {newsletter form } */}

          <form className='flex'>
            <input type="email" placeholder='enter you email'
            className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:right-gray-500 transistion-all'
            />
            <button type='submit' className='bg-black text-white px-5 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
          </form>

        </div>

        {/* {shop links} */}
        
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Men's Top Wear</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Women's Top Wear</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Men's Bottm Wear</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Women's Bottom Wear</Link>
            </li>
          </ul>
        </div>

        {/* {support links} */}

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">FAQ's</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Features</Link>
            </li>
          </ul>
        </div>

        {/* follow us section */}

        <div>
          <h3 className='text-lg text-gray-800 mb-4'> Follow Us</h3>
          <div className='flex items-center space-x-4 mb-6'>
            <a href="https://www.facebook.com" target='_blank' rel='noopenner noreferrer'
            className='hover:text-gray-500'>
              <TbBrandMeta className='h-5 w-5'></TbBrandMeta>
            </a>

            <a href="https://www.facebook.com" target='_blank' rel='noopenner noreferrer'
            className='hover:text-gray-500'>
              <IoLogoInstagram className='h-5 w-5'></IoLogoInstagram>
            </a>

            <a href="https://www.facebook.com" target='_blank' rel='noopenner noreferrer'
            className='hover:text-gray-500'>
              <RiTwitterXLine className='h-5 w-5'></RiTwitterXLine>
            </a>
          </div>

          <p className='text-gray-500'>Call Us</p>
          <p>
            <FiPhoneCall className='inline-block mr-2'></FiPhoneCall>
            +91-7982083324
          </p>
        </div>
      </div>
      {/* footer bottom for copyright text */}
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'>
          @ 2025 , CompileTab. ALl Rights Reserced.
        </p>
      </div>
    </footer>
  )
}

export default Footer