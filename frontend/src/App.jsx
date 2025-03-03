import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import {Toaster} from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right"></Toaster>
      <Routes>
        <Route path="/" element={<UserLayout />}>{/* user layout */}
          {/* serves  as the parent route */}
          <Route index element={<Home></Home>}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register/>}></Route>

          <Route path='profile' element={<Profile/>}></Route>
        </Route>
        <Route>{/* admin layout */}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
