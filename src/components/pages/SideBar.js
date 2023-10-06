import React from 'react'
import '../css/dasher.css'
import ProfileInfo from './ProfileInfo'
import { useEffect,useState } from "react";
import { FiUser, FiBarChart2, FiSettings,FiLogOut,  } from "react-icons/fi";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdPersonAdd } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { Link } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";
import Sell from './Sell';


// import Profile from "./FirebaseP";
import {  Input, DatePicker, } from 'antd';
import ProfileAdmin from "./ProfileAdmin";
import { useNavigate } from "react-router-dom";

import { Form,Alert, Button  } from 'react-bootstrap'
import uuid from 'react-uuid'
import {supabase} from '../../config/supabaseClient'
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';

const SideBar = ({ toggleModal }) => {
    const navigate=useNavigate()
    const handleProfile=()=>{
        navigate('/profile')
      }
      const viewOnSale=()=>{
        navigate('/onSale')

      }
      const {user,logout}=UserAuth()
  const [modale, setModale] = useState(false);
  const [modal, setModal] = useState(false);
    const handleSignOut=async()=>{
      try{
      await logout()
      }catch(error){
         console.log(error)
      }
         }
         const toggleModale = () => {
          setModale(!modale);
        };
       
  return (
  
      <div className="sidebar">
        {/* <div style={styles.logo}>Admin Dashboard
        
      </div> */}
      {/* <p>Welcome,{user?.displayName || user?.email || user?.phoneNumber }</p> */}
     <ProfileInfo/>
     
        
  <div><button onClick={handleProfile} className="button" style={{marginLeft: '15px'}}><MdPersonAdd style={{marginRight: '10px'}} />
  Update/Insert Profile </button></div>
  <div><button onClick={toggleModale} className="button" style={{marginLeft: '1px'}}><AiOutlinePlusCircle style={{marginRight: '5px',marginLeft:'10px'}} />
  Sell Product </button></div>
  <div><button onClick={viewOnSale} className="button" style={{marginLeft: '15px'}}><AiOutlinePlusCircle style={{marginRight: '5px'}} />
  onSell Product </button></div>
 
       
        
        
  <Button className='close-modal' onClick={() => toggleModal(false)}>
      <AiOutlineClose />
      </Button>
  {modale && <Sell toggleModale={toggleModale} />}
      </div>
     
       
     
  )
}

export default SideBar
