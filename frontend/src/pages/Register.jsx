import React, { useEffect, useState } from "react";
import RegisterImage from "../assets/register.webp";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { mergeCart } from "../redux/slices/cartSlice";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  

  const dispatch = useDispatch();

  const navigateTo = useNavigate();
  const location = useLocation();

  const {user , guestId , loading} = useSelector((state)=>state.auth);

  const {cart} = useSelector((state)=>state.cart);

  //get redirect parameter and check if it is checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect")||"/";

  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(()=> {
    if(user){
      if(cart?.products.length>0 && guestId){
        dispatch(mergeCart({guestId , user})).then(()=>{
          navigateTo(isCheckoutRedirect ? "/checkout" : "/");
        });
      }else{
        navigateTo(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  } , [user , guestId , cart , navigateTo , isCheckoutRedirect , dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex ">
      <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">E-Commerce</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey There! </h2>
          <p className="text-center mb-6">
            Enter you username and password to Register
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter Your Name "
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter Your email address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Password :
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "loading ...." : "Sign Up"}
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account ?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`}
            className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={RegisterImage}
            alt="alt message"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
