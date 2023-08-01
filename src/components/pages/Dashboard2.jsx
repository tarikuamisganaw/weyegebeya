import React from "react";
import { useEffect,useState } from "react";
import { FiUser, FiBarChart2, FiSettings,FiLogOut,  } from "react-icons/fi";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdPersonAdd } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { Link } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";
import '../css/Modal.css'
// import Profile from "./FirebaseP";
import {  Input, DatePicker, } from 'antd';
import ProfileAdmin from "./ProfileAdmin";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { Form,Alert, Button  } from 'react-bootstrap'
import uuid from 'react-uuid'
import {supabase} from '../../config/supabaseClient'
const Dashboard = () => {
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDesription]=useState('')
  const [image,setImage]=useState('')
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alex Johnson", email: "alex@example.com" },
  ];
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "staus",
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

  const statistics = [
    { label: "Total Sales", value: "$10,000" },
    { label: "New Users", value: "15" },
    { label: "Active Users", value: "30" },
  ];
  const {user,logout}=UserAuth()
    const handleSignOut=async()=>{
try{
await logout()
}catch(error){
    console.log(error)
}
    }
    const [modal, setModal] = useState(false);
    const [avatarUrl,setavatarUrl]=useState('')
    const [successMessage, setSuccessMessage] = useState('');
const [select,setSelect]=useState('')
    const toggleModal = () => {
      setModal(!modal);
    };
  
    const [profile,setProfile]=useState('../images/icon.png')
    const navigate=useNavigate()
   
const handleProfile=()=>{
  navigate('/profile')
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
  setSuccessMessage('Successfully registerd')
  setImage("")
  setName("")
  setPrice("")
  setDesription("")
  setSelect("")
  document.getElementById('imageInput').value = "";

}

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {/* <div style={styles.logo}>Admin Dashboard
        
      </div> */}
      {/* <p>Welcome,{user?.displayName || user?.email || user?.phoneNumber }</p> */}
     <ProfileInfo/>
     
        <div style={styles.menu}>
          <div style={styles.menuItem}>
            <FiUser style={styles.menuIcon} /> Users
          </div>
          <div style={styles.menuItem}>
            <FiBarChart2 style={styles.menuIcon} /> Statistics
          </div>
          <div style={styles.menuItem}>
            <FiSettings style={styles.menuIcon} /> Settings
          </div>
         
  <button onClick={handleProfile} style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'40px',
  width:'220px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '0px',
  borderColor:'transparent',
  cursor: "pointer"}}><MdPersonAdd style={{marginRight: '10px'}} />
  Update/Insert Profile </button>
  <button onClick={toggleModal} style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'40px',
  width:'160px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '5px',
  borderColor:'transparent',
  cursor: "pointer"}}><AiOutlinePlusCircle style={{marginRight: '10px'}} />
  Insert Product </button>
        </div>
        
        <button onClick={handleSignOut} style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'40px',
  width:'110px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '5px',
  borderColor:'transparent',
  cursor: "pointer"}}>
    <FiLogOut style={{marginRight: '10px'}} />
  Logout</button>
      </div>
      
      <div style={styles.content}>
      <div style={styles.logo}>Admin Dashboard
        
        </div>
        <h2>Statistics</h2>
        <div style={styles.statistics}>
          {statistics.map((stat) => (
            <div style={styles.statItem} key={stat.label}>
              <div>{stat.label}</div>
              <div>{stat.value}</div>
              
            </div>
          ))}


        </div>
        <h2>Users</h2>
        <Table columns={columns} dataSource={data1} />
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content" style={{width:'500px'}}>
            <h2>Sell product</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
            <div>
              <div>
              <label  htmlFor="email" style={{marginRight:"10px",}}>product image:</label>
            <input type="file" id="imageInput" placeholder="choose image" accept={"image/jpeg image/png"} onChange={(e) => setImage(e.target.files[0])}
style={{ backgroundColor:'transparent',
  color:'black',
  fontSize:'15px',
  padding: '10px 2px',
  borderRadius: '5px',
  margin: '10px 0px',
  width:'20 0px',
 }}/>
 </div>
                   <Input
                       className=''
                       type="text"
                      placeholder="product name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       style={{width:'300px',height:'33px',fontSize:'17px',margin:'10px'}}
                   />
                    <Input
                       className=''
                       type="text"
                       placeholder="product price"
                       value={price}
                       onChange={(e) => setPrice(e.target.value)}
                       style={{width:'300px',height:'33px',fontSize:'17px',margin:'10px'}}
                   />
                   <Input
                       className=''
                       type="text"
                       placeholder="product description"
                       value={description}
                       onChange={(e) => setDesription(e.target.value)}
                       style={{width:'300px',height:'33px',fontSize:'17px',margin:'10px'}}
                   />
                    <select  value={select} 
                    onChange={(e) => setSelect(e.target.value)}
                    style={{width:'300px',height:'33px',fontSize:'17px',margin:'10px'}} name="bidding information">
                      <option></option>
        <option value="bid">bid</option>
        <option value="no bid">no bid</option>
        
      </select>
                   </div>
                   <Button className='w-100 mb-4'style={{ backgroundColor:' #783584',
color:'white',
fontSize:'15px',
padding: '10px 2px',
borderRadius: '8px',
borderColor:'transparent',
margin:'10px',
width:'150px',
height:'40px'

}} type="submit">submit</Button>
            <Button style={{ backgroundColor:' #783584',
color:'white',
fontSize:'15px',
padding: '10px 2px',
borderRadius: '8px',
borderColor:'transparent',
margin:'10px',
width:'150px',
height:'40px'

}}  onClick={toggleModal}>
              Close
            </Button>
            </Form>
          </div>
        </div>
      )}
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
  menu: {
    display: "flex",
    flexDirection: "column",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    transition: "background 0.3s",
    borderRadius: "5px",
    marginBottom: "10px",
    marginLeft:'15px'
  },
  menuIcon: {
    marginRight: "10px",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  statistics: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },
  statItem: {
    background: "#e3e3e3",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    color: "#333",
  },
};

export default Dashboard;