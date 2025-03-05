import React, { useState } from 'react'
import {HiOutlineUser , HiOutlineShoppingBag , HiBars3BottomRight} from "react-icons/hi2";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartDrawer from '../layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {

  const [drawerOpen ,setDrawerOpen] = useState(false);
  const [navDrawerOpen , setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  }

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }


  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* left - Logo */}
        <div>
          <Link to='/' className="text-2xl font-medium">
          Logo</Link>
        </div>

        {/* center-navigation link */}
        <div className='hidden md:flex space-x-6'>
          <Link to="/collection/all" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Men
          </Link>
          <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Women
          </Link>
          <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Top-Wear
          </Link>
          <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Bottom-wear
          </Link>
        </div>
        {/* right : icons */}
        <div className='flex items-cneter space-x-4'>
          <Link to="/profile" className="hover : text-black">
          <HiOutlineUser className='h-6 w-6 text-gray-700'/>
          </Link>

          <button className='relative hover : text-black' onClick={toggleCartDrawer}>
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700 '/>
            <span className='absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 '>4</span>
          </button>

          {/* search icon : a different component */}
          <div className='overflow-hidden'>
            <SearchBar> </SearchBar>
          </div>
          

          {/* hamburger icon for mobile navigation */}
          <button className='md:hidden' onClick={toggleNavDrawer}>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>


        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}></CartDrawer>

      {/* mobile navigation */}

     <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg  transform transition-transform duration-300 z=50 ${navDrawerOpen?"translate-x-0":"-translate-x-full"}`}>

      <div className='flex justify-end p-4'>
        <button onClick={toggleNavDrawer}>
          <IoMdClose className='h-6 w-6 text-gray-600'></IoMdClose>  
        </button>  
      </div>

      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-4'>Menu</h2>
        <nav className='space-y-4'>
          <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Men
          </Link>
          <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Women
          </Link>
          <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Top Wear
          </Link>
          <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Bottom-wear
          </Link>
        </nav>
      </div>
     </div>
    </>
  )
}

export default Navbar