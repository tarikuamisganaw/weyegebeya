import React from 'react'
import '../css/header.css'
import { useState,useEffect } from "react";
import {supabase} from '../../config/supabaseClient'
import { UserAuth } from "../../context/AuthContext";
import Sell from './Sell';
import SideBar from './SideBar';
import { MdMenu } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
// import { MenuIcon } from 'react-icons/md';
const Header = () => {
  const {user,logout}=UserAuth()
  const [modale, setModale] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate=useNavigate()
   const toggleModale = () => {
          setModale(!modale);
        };
    const handleSignOut=async()=>{
      try{
      await logout()
      }catch(error){
         console.log(error)
      }
         }
         const handlelog=()=>{
          navigate('/login')
        }
         
        // const sell = () => {
        //   toggleModale(true);
        // };
        const toggleModal = () => {
          setModal(!modal);
        };
  return (
    <div>
         {modal &&<SideBar toggleModal={toggleModal}/>}
        <div className="header">
      <div className="header__left">
        {
          user && (
            <div className="header__right">
                <MdMenu onClick={toggleModal} style={{ cursor: 'pointer' }} />
              
              <span>Hello,{user?.displayName || user?.email || user?.phoneNumber }</span>
            </div>
          )
        }
      </div>
      <div className="header__actions">
        <span className="header__action-title" ><span>Chat</span></span>
        <span className="header__action-title" onClick={handlelog} ><span>Signin</span></span>
        <span className="header__action-title" ><span>Cart</span></span>
        <span className="header__action-title" onClick={ handleSignOut}><span>Logout</span></span>
      </div>
    </div>
    {modale && <Sell toggleModale={toggleModale} />}

    
    </div>
  )
}

export default Header
