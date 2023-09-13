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
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alex Johnson", email: "alex@example.com" },
  ];
  const columns = [
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
      title: "date_of_birth",
      dataIndex: "dateofbirth",
    },
    {
      title: "location",
      dataIndex: "location",
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      staus: `London, Park Lane no. ${i}`,
    });
  }
  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

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
  }, []);
  

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
        {/* <div style={styles.logo}>Admin Dashboard
        
      </div> */}
      {/* <p>Welcome,{user?.displayName || user?.email || user?.phoneNumber }</p> */}
     <ProfileInfo/>
     
        <div className="">
        <div><button className="button" style={{marginleft: '0px'}}>
            <FiUser className="menuIcon" /> Users
            </button>
          </div>
          <div><button  className="button">
            <FiBarChart2 style={{marginRight: '10px'}} /> Statistics</button>
          </div>
          
          </div>
  <div><button onClick={handleProfile} className="button"><MdPersonAdd style={{marginRight: '10px'}} />
  Update/Insert Profile </button></div>
  <div><button onClick={toggleModale} className="button"><AiOutlinePlusCircle style={{marginRight: '10px'}} />
  Insert Product </button></div>
  <div><button onClick={hadleproduct} className="button"><AiOutlineEye style={{marginRight: '10px'}} />
  view Product </button></div>
       
        
        <button onClick={handleSignOut} className="button">
    <FiLogOut style={{marginRight: '10px'}} />
  Logout</button>
      </div>
     
      
      <div style={styles.content}>
      <div className="logo">Admin Dashboard
        
        </div>
        <h2>Statistics</h2>
        <div className="statistics">
          
          {statistics.map((stat) => (
            <div className="statItem" key={stat.label}>
              <div>{stat.label}</div>
              <div>{stat.value}</div>
              
            </div>
          ))}
 

        </div>
        <h2>Users</h2>
        <Table columns={columns} dataSource={datat} />
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
    width: "250px",
    background: "#333",
    color: "#fff",
    padding: "20px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    paddingBottom: "20px",
  },
  
  content: {
    flex: 1,
    padding: "20px",
  },
  
};

export default Dashboard;