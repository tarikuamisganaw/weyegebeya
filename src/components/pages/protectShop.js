import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";

const ProtectedShop = ({ children }) => {
  const { user } = UserAuth();
  if (user.email==="admin@gmail.com") {
    return <Navigate to='/account' />;
  }

  return children;
};

export default ProtectedShop;
