import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FilterSideBar from '../components/products/FilterSideBar';
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';

const CollectionPage = () => {
  const [products , setProducts] = useState([]);

  const sideBarRef = useRef(false);

  const [isSideBarOpen , setIsSideBarOpen]
 = useState(false);

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
  

  useEffect(() => {
    setTimeout(()=>{
      const fetchedProduct = [
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
      ];
      setProducts(fetchedProduct);
    } , 1000)
  }, [])
  
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
        <ProductGrid products={products}/>

      </div>

    </div>
  )
}

export default CollectionPage