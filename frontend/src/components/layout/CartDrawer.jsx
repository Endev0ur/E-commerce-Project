
import { IoMdClose } from "react-icons/io";
import CartContents from "../cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({drawerOpen , toggleCartDrawer}) => {

  const navigateTo = useNavigate();
  const {user , guestId} = useSelector((state)=>state.auth);
  const {cart} = useSelector((state)=>state.cart);
  const userId = user ? user._id : null;
  console.log("This is  user id  : " , userId);
  console.log(cart , " " , user , " , " , guestId);
  const handleCheckOut = () => {
    toggleCartDrawer();
    if(!user){
      navigateTo("login?redirect=checkout");
    }else{
      navigateTo("/checkout");
    }
    
  }
  

  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0":"translate-x-full"}`}>

      {/* {close button} */}

      <div className='flex justify-end p-4'>
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600"></IoMdClose>
        </button>
      </div>

      {/* cart content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your cart</h2>
        {/* component for cart content  */}
        {cart && cart?.products?.length > 0 ? (<CartContents cart={cart} userId={userId} guestId={guestId}></CartContents>):(
          <p>Your Cart is Empty</p>
        )}
        

      </div>

      {/* checkout button  */}

      <div className="p-4 bg-white sticky b-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button onClick={handleCheckOut} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">checkout</button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">shipping , tazes and discount codes calculated at checkouts</p>
          </>
        )}
        
      </div>

    </div>
  )
}

export default CartDrawer