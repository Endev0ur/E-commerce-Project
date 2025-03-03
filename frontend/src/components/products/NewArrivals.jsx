import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft , FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'


const NewArrivals = () => {

  const scrollRef = useRef(null);
  const [isDragging , setIsDragging] = useState(false);
  const [startX , setStartX] = useState(0);
  const [scrollLeft , setScrollLeft] = useState(false);
  const [canScrollLeft , setCanScrollLeft] = useState(false);
  const [canScrollRight , setCanScrollRight] = useState(true);



  const newArrivals = [
    {
      _id:"1",
      name:"Stylish Jacket",
      price:120,
      images:[
        {
          url:"https://picsum.photos/500/500?random=1",
          altText:"Stylish Jacket",
        }
      ]
    },

    {
      _id:"2",
      name:"Stylish Jackets",
      price:120,
      images:[
        {
          url:"https://picsum.photos/500/500?random=2",
          altText:"Stylish Jacket",
        }
      ]
    },

    {
      _id:"3",
      name:"Stylish Jacket",
      price:120,
      images:[
        {
          url:"https://picsum.photos/500/500?random=3",
          altText:"Stylish Jacket",
        }
      ]
    },

    {
      _id:"4",
      name:"Stylish Jacket",
      price:120,
      images:[
        {
          url:"https://picsum.photos/500/500?random=5",
          altText:"Stylish Jacket",
        }
      ]
    },

    {
      _id:"5",
      name:"Stylish Jacket",
      price:120,
      images:[
        {
          url:"https://picsum.photos/500/500?random=4",
          altText:"Stylish Jacket",
        }
      ]
    },

    {
      _id:"6",
      name:"Stylish Jacket",
      price:120,
      images:[
        {
          url:"https://picsum.photos/500/500?random=6",
          altText:"Stylish Jacket",
        }
      ]
    },

    {
      _id:"7",
      name:"Stylish Jacket",
      price:120,
      images:[
        {
          url:"https://picsum.photos/500/500?random=7",
          altText:"Stylish Jacket",
        }
      ]
    },
  ]

  const scroll = (direction) => {
    const scrollAmount = direction==="left"?-300:300;
    scrollRef.current.scrollBy({left:scrollAmount , behaviour:"smooth"});
  }

  const updateScrollButtons = () => {



    const container = scrollRef.current;

    if(container){
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll>0)
      setCanScrollRight(rightScrollable);
    }

    console.log({
      scrollLeft:container.scrollLeft,
      clientWidth:container.clientWidth,
      containerScrollWidth : container.scrollWidth,
      
    })
  }

  useEffect(() => {
    const container = scrollRef.current;
    if(container){
      container.addEventListener("scroll" , updateScrollButtons);
      updateScrollButtons();
      return ()=> container.removeEventListener("scroll" , updateScrollButtons);
    }
  })

  const handleOnMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX-scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }

  const handleOnMouseMove = () => {
    if(!isDragging) return ;
    const x = e.pageX-scrollRef.current.offsetLeft;
    const walk = x-startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }

  const handleOnMouseUpOrLeave = () => {
    setIsDragging = false;

  }
  

  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='text-3xl font-bold mb-4'>
          Explore New Arrivals
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          Discover the latest syles straights off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* {scroll button} */}
        <dir className="absolute right-0 bottom-[-30px] flex space-x-2">
        <button className={`p-2 rounded border ${canScrollLeft?"bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`} onClick={()=>{
            scroll("left")
          }}
          disabled={!canScrollLeft}
          >
            <FiChevronLeft className='text-2xl' />
          </button>
          <button className={`p-2 rounded border ${canScrollRight?"bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`} onClick={()=>{
            scroll("right")
          }}
          disabled={!canScrollRight}>
            <FiChevronRight className='text-2xl' />
          </button>
        </dir>
      </div>

      {/* scrollable content */}
      <div 
        ref={scrollRef}
        className={`container mx-auto overflow-scroll flex space-x-6 relative ${isDragging?"cursor-grabbing":"cursor-grab"}`}
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseUp={handleOnMouseUpOrLeave}
        onMouseLeave={handleOnMouseUpOrLeave}>

        {newArrivals.map((product)=>(
          <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
            <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.main}
            className='w-full h-500px object-cover rounded'
            draggable="false"
            />
            <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
              <Link to={`/product/${product._id}`}className="block">
              <h4 className='font-medium'> {product.name}</h4>
              <p className='mt-1'>${product.price}</p>
              </Link>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default NewArrivals