import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetails from "./pages/OrderDetails";
import MyOrders from "./pages/MyOrders";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right"></Toaster>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* user layout */}
          {/* serves  as the parent route */}
          <Route index element={<Home></Home>}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>

          <Route path="profile" element={<Profile />}></Route>
          <Route
            path="collection/:collection"
            element={<CollectionPage />}
          ></Route>
          <Route path="product/:id" element={<ProductDetails />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route
            path="order-confirmation"
            element={<OrderConfirmationPage />}
          ></Route>
          <Route path="/my-orders" element={<MyOrders />}></Route>
          <Route path="order/:id" element={<OrderDetails />}></Route>
        </Route>
        <Route>{/* admin layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
