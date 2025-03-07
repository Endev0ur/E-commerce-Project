import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FaBoxOpen,FaClipboardList, FaStore, FaUser , FaSignOutAlt } from 'react-icons/fa'

const AdminSideBar = () => {
  const navigateTo = useNavigate();
  const handleLogOut = () => {
    navigateTo("/")
  }

  return (
    <div  className='p-6 '>
      <div className="mb-6 ">
        <Link to="/admin" className="text-2xl font-medium">Matrix</Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

      <nav className='flex flex-col space-y-2'>
        <NavLink to="/admin/users" className={({isActive})=>isActive?"bg-gray-700 text-white py-2 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaUser></FaUser>
          <span>Users</span>
        </NavLink>


        <NavLink to="/admin/products" className={({isActive})=>isActive?"bg-gray-700 text-white py-2 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaBoxOpen></FaBoxOpen>
          <span>Products</span>
        </NavLink>

        
        <NavLink to="/admin/orders" className={({isActive})=>isActive?"bg-gray-700 text-white py-2 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaClipboardList></FaClipboardList>
          <span>Orders</span>
        </NavLink>

        
        <NavLink to="/" className={({isActive})=>isActive?"bg-gray-700 text-white py-2 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
          <FaStore></FaStore>
          <span>Shop</span>
        </NavLink>
      </nav>

      <div className="mt-6 ">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2" onClick={handleLogOut}>
          <FaSignOutAlt></FaSignOutAlt>
          <span>Logout</span>
        </button>
      </div>

    </div>
  )
}

export default AdminSideBar