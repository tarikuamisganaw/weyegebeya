import React from "react";
import '../css/dash.css'
import { useEffect,useState } from "react";
import { FiUser, FiBarChart2, FiSettings,FiLogOut,  } from "react-icons/fi";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdPersonAdd } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { Link } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";

import SearchId from "./SearchId";
// import Profile from "./FirebaseP";
import {  Input, DatePicker, } from 'antd';
import ProfileAdmin from "./ProfileAdmin";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { Form,Alert, Button  } from 'react-bootstrap'
import uuid from 'react-uuid'
import {supabase} from '../../config/supabaseClient'
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import Sell from "./Sell";

import dayjs from 'dayjs';
const Dashboard = () => {
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDesription]=useState('')
  const [image,setImage]=useState('')
  const [amount,setAmount]=useState('')
  const [select, setSelect] = useState('');
  const [datat,setDatat]=useState([])
  const [datati,setDatati]=useState([])
  const [searchQuery, setSearchQuery] = useState('');
  
  const columns = [
    {
      title: "user_id",
      dataIndex: "id",
    },
    {
      title: "username",
      dataIndex: "username",
    },
    {
      title: "full_name",
      dataIndex: "full_name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "phonenumber",
      dataIndex: "phonenumber",
    }, 
    {
      title: "location",
      dataIndex: "location",
    },
  ];
 
  const fetchProfiles = async () => {
    try {
      let query = supabase.from('profiles').select('*');
  
      if (searchQuery) {
        query = query.or(`id.eq.${searchQuery}, username.eq.${searchQuery}`);
      }
  
      const { data, error } = await query;
  
      if (error) {
        throw new Error(error.message);
      }
  
      setDatat(data);
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
    }
  };
  useEffect(() => {
    fetchProfiles();
  }, [searchQuery]);
  

  const statistics = [
    { label: "Total no of users", value: datat.length }];
  const {user,logout}=UserAuth()
    const handleSignOut=async()=>{
try{
await logout()
}catch(error){
    console.log(error)
}
    }
    const [modale, setModale] = useState(false);
    const [avatarUrl,setavatarUrl]=useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [startDate, setStartDate] = useState(null);
    const toggleModale = () => {
      setModale(!modale);
    };
  
    const [profile,setProfile]=useState('../images/icon.png')
    const navigate=useNavigate()
   
const handleProfile=()=>{
  navigate('/profile')
}
const hadleproduct=()=>{
  navigate('/')

}
const handleorder=()=>{
  navigate('/order')

}

const handleSubmit = async (e) => {
  e.preventDefault();
  let newUserId = uuid(); 
 
 let newavatarUrl = avatarUrl 
  if (image) {
    const { data, error } = await supabase.storage
      .from('proImage')
      .upload(`${Date.now()} ${image.name}`, image);

    if (error) {
      console.log('Storage error');
      console.log(error);
    }

    if (data) {
      newavatarUrl = data.path;
      setavatarUrl(newavatarUrl);
     
      console.log('Successfully uploaded image');
    }
  }

  const { data: profileData, error: profileError } = await supabase.from('products_table').upsert({
    id: newUserId,
     product_name:name,
    product_image: newavatarUrl,
    product_price:price,
product_desc:description,
product_amount:amount,
end_date_of_bidding: startDate ? startDate.toISOString() : null,
    bid_info:select,
  });

  if (profileError) {
    console.log('Profile error');
    console.log(profileError);
  }

  if (profileData) {
    console.log('Successfully submitted');
    setSuccessMessage('Successfully updated');
  }
  setSuccessMessage('Successfully updated');
  setImage("")
  setName("")
  setPrice("")
  setDesription("")
  setSelect("")
  setAmount("")
  setStartDate("")
  document.getElementById('imageInput').value = "";

}

  return (
    <div className="" style={styles.container}>
      <div className="" style={styles.sidebar}>
        
     <ProfileInfo/>
     
        <div className="">
        <div><button className="button" style={{marginLeft: '0px',marginRight: '10px'}}>
            <FiUser className="menuIcon" /> Users
            </button>
          </div>
          
          <div><button  className="button">
            <FiBarChart2 style={{marginRight: '10px'}} /> Statistics</button>
          </div>
          </div>
  <div><button onClick={handleProfile} className="button" style={{marginLeft: '18px'}}><MdPersonAdd style={{marginleft: '5px',marginRight: '3px'}} />
  Update/Insert Profile </button></div>
  
  <div><button onClick={handleorder} className="button"><AiOutlineEye style={{marginleft: '0px',marginRight: '10px'}} />
  order info </button></div>
       
        
        <button onClick={handleSignOut} className="button"  style={{marginLeft: '0px'}}>
    <FiLogOut style={{marginRight: '10px'}} />
  Logout</button>
      </div>
     
      <div  style={{marginTop:'0px'}}>
      <div style={styles.content}>
      <div className="logo">Admin Dashboard
      <SearchId onsetSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        </div>
        {!searchQuery && (<div className="statstics" style={{marginTop:'0px'}}>
        <div  className="logo">statstics</div>
        
       
       {statistics.map(function(stat) {
        return (
          <div className="statItem" key={stat.label}>
            <div>{stat.label}</div>
            <div>{stat.value}</div>
          </div>
        );
      })}
  </div>)}

       
        <h2>Users</h2>
        <Table columns={columns} dataSource={datat} style={{marginleft: '300px'}}/>
      </div>
      </div>
      {modale && <Sell toggleModale={toggleModale} />}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    position:"fixed",
    width: "250px",
    background: "#333",
    color: "#fff",
    padding: "20px",
    height: "100vh",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    paddingBottom: "20px",
  },
  
  content: {
    flex: 1,
    padding: "20px",
    marginLeft: '19%'
  },
  
};

export default Dashboard;