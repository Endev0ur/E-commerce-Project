import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton';
import {useDispatch, useSelector} from 'react-redux'
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios'
import { fetchCart } from '../../redux/slices/cartSlice';


const Checkout = () => {

  const navigateTo = useNavigate();

  const  dispatch = useDispatch();
  const {cart , loading ,error} = useSelector((state)=>state.cart);

  const {user} = useSelector((state)=>state.auth);

  const [shippingAddress , setShippingAddress] = useState({
    firstName : "",
    lastName:"",
    address:"",
    city:"",
    postalCode:"",
    country:"",
    phone:"",
  })
  

  // console.log("This is the cart : that is loading :" , cart);

  // ensure that cart is not loading before proceeding
  useEffect(()=>{
    if(!cart || !cart.products || cart.products.length === 0 ){
      navigateTo("/");
    }
  } , [cart , navigateTo])

  // useEffect(()=>{
  //   alert("Click here to proceed");
  // } , []);

  const [checkoutId , setCheckoutId] = useState(null);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    // console.log("dispatching checkout with cart : " , cart);
    // console.log("handle create checkout =============================================================================");
    console.log(cart);
    if(cart && cart.products.length>0){
      const res = await  dispatch(createCheckout({
          checkoutItems : cart.products,
          shippingAddress,
          paymentMethod:"PayPal",
          totalPrice:cart.totalPrice,
        })
      );

    // console.log("success or failue =================================================================================================================" , res.payload._id);
    // console.log("After dispactching checkout" , res);
      if(res.payload && res.payload._id){
        setCheckoutId(res.payload._id);
        console.log(checkoutId ," , ",res.payload._id);
      }
    
    }

    // console.log("checkoutId is : " , checkoutId);
  }

  console.log("checkout" , checkoutId);

  useEffect(() => {
    if (checkoutId) {
      console.log("Checkout ID updated:", checkoutId);
    }
  }, [checkoutId]);

  const handlePaymentSuccess = async (details) => {
    
    try{
      console.log("details : " , details);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, 

        { paymentStatus : "paid" , paymentDetails : details} , 
        {
          headers:{
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      );

      console.log("why");

      
      await handleFinalizeCheckout(checkoutId)//finalize checkout if payment is successfull
      
    }catch(error){
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize` , {} , {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
      });
      navigateTo("/order-confirmation");
    }catch(error){
      console.error(error);
    }
  }

  if(loading)return <p>Loading cart .....</p>
  if(cart?.products?.length===0){
    if(error) return <p>Error : {error}</p>
  }

  if(!cart || !cart.products || !cart.products.length===0){
    return <p>Your cart is empty !</p>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7x mx-auto py-10 px-6 tracking-tighter'>

      {/* left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className='text-lg mb-4'>
            Contact Details
          </h3>
          <div className="mb-4">
            <label className='block text-gray-700'>
              Email:
            </label>
            <input 
              type="email"
              value={user? user.email : ""}
              className="w=full p-2 border rounded" 
              disabled
            />
          </div>

          <h3 className='text-lg mb-4'>
            Delivery
          </h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input type="text"
              className='w-full p-2 border rounded'
              value={shippingAddress.firstName}
              onChange={(e)=>setShippingAddress({...shippingAddress , firstName:e.target.value})} />
            </div>
            <div>
              <label  className="block text-gray-700">Last Name</label>
              <input type="text"
              className='w-full p-2 border rounded'
              value={shippingAddress.lastName}
              onChange={(e)=>setShippingAddress({...shippingAddress , lastName:e.target.value})} />
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor="" className='block text-gray-700'>
              Address
            </label>
            <input type="text" value={shippingAddress.address}
            onChange={(e)=>setShippingAddress({...shippingAddress , address:e.target.value})}
            className='w-full p-2 border rounded'
            required />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-700">City</label>
                <input type="text"
                className='w-full p-2 border rounded'
                value={shippingAddress.city}
                onChange={(e)=>setShippingAddress({...shippingAddress , city:e.target.value})} />
              </div>
              <div>
                <label htmlFor="" className="block text-gray-700">Postal Code</label>
                <input type="text"
                className='w-full p-2 border rounded'
                value={shippingAddress.postalCode}
                onChange={(e)=>setShippingAddress({...shippingAddress , postalCode:e.target.value})} />
              </div>
          </div>

          <div className='mb-4'>
            <label htmlFor="" className='block text-gray-700'>
              Country
            </label>
            <input type="text" value={shippingAddress.country}
            onChange={(e)=>setShippingAddress({...shippingAddress , country:e.target.value})}
            className='w-full p-2 border rounded'
            required />
          </div>
          <div className='mb-4'>
            <label htmlFor="" className='block text-gray-700'>
              Phone No.
            </label>
            <input type="tel" value={shippingAddress.phone}
            onChange={(e)=>setShippingAddress({...shippingAddress , phone:e.target.value})}
            className='w-full p-2 border rounded'
            required />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>
            ):(
              <div>
                <h3 className='text-lg mb-4'>Pay With Paypal</h3>
                {/* paypal button component */}
                <PayPalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess}
                onError={(err)=>{
                  alert("Payment failed . Try Again" , err)
                }}></PayPalButton>
              </div>
            )}
          </div>

        </form>
      </div>

      {/* right section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">
          Order Summary
        </h3> 
        <div className="border-t py-4 mb-4">
          {cart.products.map((product , index)=>(
            <div className="flex items-start justify-between py-2 border-bottom" key={index}>
              <div className="flex items-start">
                <img src={product.image} alt={product.name} className='w-full h-24 object-cover mr-4' />

                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className='text-gray-500'>Size:{product.size}</p>
                  <p className='text-gray-500'>COlor:{product.color}</p>
                  <p className="text-xl">${product.price?.toLocaleString()}</p>
                </div>

                

              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p className="">Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className='flex justify-between items-center text-lg'>
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>

    </div>
  )
}

export default Checkout