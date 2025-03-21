import React, { useEffect } from 'react'
import {useDispatch , useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {fetchAllOrders , updateOrderStatus} from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const {user} = useSelector((state)=>state.auth);
  const {orders , loading , error} = useSelector((state)=>state.adminOrders);

  useEffect(()=>{
    if(!user || user.role!=="admin"){
      navigateTo("/");
    }else{
      dispatch(fetchAllOrders());
    }
  } , [dispatch , user , navigateTo]);

  const handleStatusChange = (orderId , status) => {
    dispatch(updateOrderStatus({id:orderId , status}));
  }

  if(loading){
    return <p>Loading ...</p>
  }

  if(error){
    return <p>Error : {error}</p>
  }
  

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className="text-2xl font-bold mb-6">
        Order Management
      </h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className="py-2 px-4">OrderId</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">TotalPrice</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length>0 ? (orders.map((order)=>(
              <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                <td className='py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>
                  #{order._id}
                </td>
                <td className='py-4'>{order.user.name}</td>
                <td className='py-4'>
                  {order.totalPrice.toFixed(2)}
                </td>
                <td className='py-4'>
                  <select name="" value={order.status} onChange={(e)=>handleStatusChange(order._id , e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focut:ring-blue-500 focus:broder-blue-500 block p-2.5'  
                  >
                    <option value="Procesing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className='py-4'>
                  <button className="bg-green-500 text-white p-1 lg:px-4 lg:py-2 rounded hover:bg-green-600 " onClick={()=>handleStatusChange(order._id , "Delivered")}>
                    Delivered
                  </button>
                </td>
              </tr>
            ))) : (<tr>
              <td colSpan={5} className='p-4 text-center text-gray-500'>No orders found.</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManagement