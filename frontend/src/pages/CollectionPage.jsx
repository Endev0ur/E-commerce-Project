import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FilterSideBar from '../components/products/FilterSideBar';
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';
import { useParams } from 'react-router-dom';

const CollectionPage = () => {

  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products , loading , error }= useSelector((state)=>state.products);

  const queryParams = Object.fromEntries([...searchParams]);

   const sideBarRef = useRef(null);

  const [isSideBarOpen , setIsSideBarOpen]
 = useState(false);


  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection , ...queryParams}));
  } , [dispatch , collection , searchParams]);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  const handleClickOutside = (e) => {
    //close sidebar if clicked outside

    if(sideBarRef.current && !sideBarRef.current.contains(e.target)){
      setIsSideBarOpen(false);
    }

  }

  useEffect(() => {
    //add event listner for clicks : for sidebar close as click outisde
    document.addEventListener("mousedown" , handleClickOutside);

    return () => {
      document.removeEventListener("mousedown" , handleClickOutside)
    };
    

  } , [])
  

  
  return (
    <div className='flex flex-col lg:flex-row '>

      {/* mobile filter button */}
      <button onClick={toggleSideBar} className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className='mt-2' />
      </button>

      {/* filter sidebar */}

      <div ref={sideBarRef} className={`${isSideBarOpen ? "translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
        <FilterSideBar></FilterSideBar>
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* sort options */}
        <SortOptions />

        {/* product grid */}
        <ProductGrid products={products} loading={loading} error={error}/>

      </div>

    </div>
  )
}

export default CollectionPage