import React from 'react'
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children , role}) => {
  const {user} = useSelector((state)=>state.auth);

  if(!user || (role && user.role!== role)){
    return <Navigation to="/login" replace></Navigation>
  }

  return children;
}

export default ProtectedRoute