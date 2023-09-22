import React, { useState,useEffect } from 'react';
import '../../css/detail.css'
import { UserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom"
const HeaderExtra = () => {
    const navigate=useNavigate()
    const {user,logout}=UserAuth()
    const handlelog=()=>{
        navigate('/login')
      }
      const handleSignOut=async()=>{
        try{
        await logout()
        }catch(error){
            console.log(error)
        }
            }
      const handlehome=()=>{
        navigate('/')
      }
  return (
    <div className="header">
    <div className="header__actions">
  

  <span className="header__action-title"onClick={handlehome} ><span>Home</span></span>
  {!user && (
  <span className="header__action-title" onClick={handlelog} ><span>Signin</span></span>
  )}
 
  {user && (
    <div className="header__actions">
      <span className="header__action-title" onClick={handleSignOut}><span>Logout</span></span>
      
    </div>
    )}
</div>
</div>
  )
}

export default HeaderExtra
