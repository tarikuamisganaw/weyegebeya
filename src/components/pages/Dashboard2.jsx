import React from "react";
import { useEffect,useState } from "react";
import { FiUser, FiBarChart2, FiSettings } from "react-icons/fi";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { Link } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";
import Profile from "./FirebaseP";
import ProfileAdmin from "./ProfileAdmin";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
const Dashboard = () => {
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
    function handleClick(){

    }
    function handleChange(){
      
    }
    const [profile,setProfile]=useState('../images/icon.png')
    const navigate=useNavigate()
   
const handleProfile=()=>{
  navigate('/profile')
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
         
  <button onClick={handleProfile} style={{backgroundColor:' #24a0e',
  color:'black',
  fontSize:'17px',
  height:'40px',
  width:'150px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>update profile </button>
        </div>
        <button onClick={handleSignOut} style={{backgroundColor:' #24a0e',
  color:'black',
  fontSize:'17px',
  height:'40px',
  width:'150px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>logout</button>
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