import React from 'react'
import { useState,useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import {  Input, DatePicker, } from 'antd';
// import ImageUploader from "react-images-upload";
import { Form,Alert, Button  } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import back from '../../images/anime.gif'
import icon from '../../images/icon.png'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import dayjs from 'dayjs';
// import "bootstrap/dist/css/bootstrap.min.css";
import {supabase} from '../../config/supabaseClient'
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiBarChart2, FiSettings } from "react-icons/fi";
const ProfileAdmin = () => {

const navigate=useNavigate()
    const [startDate, setStartDate] = useState(null);
     const [pictures, setPictures] = useState('');
     const [successMessage, setSuccessMessage] = useState('');
     const [email,setEmail]=useState('')
     const [userName, setuserName] = useState('');
    const [fullName, setfullName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [image,setImage]=useState('')
    const [avatarUrl,setavatarUrl]=useState('')
   // const [newavatarUrl,setnewavatarUrl]=useState('')
    const [location, setLocation] = useState('');
    const [flag, setFlag] = useState(false);
    
  
    const {user,logout}=UserAuth()
    const handleSignOut=async()=>{
      try{
      await logout()
      }catch(error){
          console.log(error)
      }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
     let newavatarUrl = avatarUrl 
      if (image) {
        const { data, error } = await supabase.storage
          .from('avatars')
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
    
      const { data: profileData, error: profileError } = await supabase.from('profiles').upsert({
        id: user.uid,
        username: userName,
        full_name: fullName,
        avatar_url: newavatarUrl,
        email: email,
        dateofbirth: startDate ? dayjs(startDate, 'DD/MM/YYYY') : null,
        phonenumber: phoneNumber,
        location: location,
      });
    
      if (profileError) {
        console.log('Profile error');
        console.log(profileError);
      }
    
      if (profileData) {
        console.log('Successfully submitted');
        setSuccessMessage('Successfully updated');
      }
      setSuccessMessage('Successfully updated')
    }
    
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, email, dateofbirth,avatar_url, phonenumber, location")
        .eq("id",user.uid)
        .single();

      if (error) {
        console.log("Error retrieving profile");
        console.log(error);
      }

      if (data) {
        if (data.dateofbirth) {
          let formattedDate = dayjs(data.dateofbirth).format('DD/MM/YYYY');
          setStartDate(formattedDate);
        } else {
          setStartDate(null); // set a default value if dateofbirth is not available
          
        }
      
        setuserName(data.username || "");
        setfullName(data.full_name || "");
        setEmail(data.email || "");
       
        setphoneNumber(data.phonenumber || "");
        setavatarUrl(data.avatar_url||"");
        setLocation(data.location || "");
      }
    } catch (error) {
      console.log("Error retrieving profile");
      console.log(error);
    }
  };
  fetchProfile();
}, []);

  return (
    <>
    <div style={{backgroundColor:'white',width:'100vw',display:"flex",
    alignItems: "center",}}>
     {/* <div id="container"  style={{backgroundImage:`url(${back})`,height:'100%',
width: '20%',
backgroundSize:'contain',
backgroundRepeat:'no-repeat',
backgroundPosition:'center',
marginRight:"0px",
backgroundColor:'white'

}}> */}

      <div style={styles.sidebar}>
        {/* <div style={styles.logo}>Admin Dashboard
        
      </div> */}
      {/* <p>Welcome,{user?.displayName || user?.email || user?.phoneNumber }</p> */}
      <p>Hello,{user?.displayName || user?.email || user?.phoneNumber }</p>
     
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
          </div>
       <div className="p-4 box" style={{width:'50%',height:'80%',backgroundColor:'white',mariginBottom:'10px',marginTop:'70px',marginLeft:'100px', border: '1px solid',
padding: '10px',

/* box-shadow: h-offset v-offset blur */

boxShadow: '5px 10px 10px',borderRadius:'7px',marginLeft:'200px'}}>
          
          
           {successMessage && <Alert variant="success">{successMessage}</Alert>}
  
          {avatarUrl?<img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`} alt="profilepic" className="avatar" style={{verticalAlign:'middle',
width:'80px',
height:'80px',
borderRadius:'50%',
borderWidth:'5px',
borderColor:'gray',
borderStyle:'outset'}}/>:"no image choosen" } 
<div>
           <Form onSubmit={handleSubmit}>
               <div>
<div>
               <input type="file"  accept={"image/jpeg image/png"} onChange={(e) => setImage(e.target.files[0])}
style={{ backgroundColor:'transparent',
  color:'black',
  fontSize:'15px',
  padding: '10px 2px',
  borderRadius: '5px',
  margin: '10px 0px',
  width:'200px'
 }}/>
 <div>
     
  </div>
  </div>
  <div style={{ display:"flex",
    alignItems: "center",
    marginTop:"10px"}}>
      <div>

                   <label className="text-center mb-3" htmlFor="email" style={{marginRight:"10px",}}>username:</label>
                   
                   <div>
                   <Input
                       className=''
                       type="text"
                       
                       value={userName}
                       onChange={(e) => setuserName(e.target.value)}
                       style={{width:'295px',height:'33px',fontSize:'17px',}}
                   />
                   </div>
                   </div>
                  <div style={{ width: "100px",
    marginRight: "25px",marginLeft:"10px"}}>
                    <label className="text-center mb-3" htmlFor="email" style={{marginRight:"10px",marginLeft:'20px'}}>fullname:</label>
                    <div>
                   <Input
                       className=''
                       type="text"
                      
                       value={fullName}
                       onChange={(e) => setfullName(e.target.value)}
                       style={{width:'300px',height:'33px',fontSize:'17px',marginLeft:'20px'}}
                   />
                   </div>
                   </div>
                   </div>
                   <div style={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
    <div>
  <label htmlFor="email">phonenumber:</label>
                  <div style={{width:'80%', height:'30px'}}>   
                                                                                                                                         <div>
                   <PhoneInput
              defaultCountry="ET"
              value={phoneNumber}
              onChange={setphoneNumber}
              placeholder="Enter Phone Number"
              //style={styles.phoneinput}
            />
            </div> 
            </div>

            </div>
            {/* <Input
                       className=''
                       type="text"
                       value={phoneNumber}
                       onChange={(e) => setphoneNumber(e.target.value)}
                       style={{width:'300px',height:'33px',fontSize:'17px',marginTop:'10px',borderColor:'black'}}
                   /> */}
                  
                   
                   <div  style={{ width: "100px",
    marginRight: "25px",}}>
                   <label className="text-center mb-3" htmlFor="email"style={{ marginLeft:'20px'}}>adress:</label>
                   <div>
                   <Input
                       className=''
                       type="text"
                       value={location}
                       onChange={(e) => setLocation(e.target.value)}
                       style={{width:'290px',height:'33px',fontSize:'17px',marginLeft:'20px'}}
                   />
                   </div>
                   </div>
                   </div>
                   <div style={{ display:"flex",
    alignItems: "center",
    marginTop:"30px"}}>
      <div>
                   <label className="text-center mb-3" htmlFor="email"style={{marginRight:"10px",}}>email:</label>
                   <div>
                   <Input
                       className=''
                       type="text"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       style={{width:'307px',height:'33px',fontSize:'17px',}}
                   />
                   </div>
                   </div>
                   
               
          
               
               <div style={{ width: "800px",
    marginRight: "25px",}}>
      <div>
  <label htmlFor="email"style={{ marginLeft:'20px'}} >
    Date of Birth:
  </label>
  </div>
  <div>
  <DatePicker
 
  value={startDate ? dayjs(startDate, 'DD/MM/YYYY')  : null}
  onChange={(date) => setStartDate(date ? date.format('DD/MM/YYYY') : null)}
  format='DD/MM/YYYY'
  
  required
  allowClear
/>
</div>
</div>
</div>
</div>
<div style={{ display:"flex",
    alignItems: "center",
    marginTop:"30px"}}>
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

<div style={{ 
    marginRight: "25px",}}>
               <Button className='w-100 mb-4' onClick={()=>{
  navigate('/account')
}} style={{ backgroundColor:' #783584',
color:'white',
fontSize:'15px',
padding: '10px 2px',
borderRadius: '8px',
borderColor:'transparent',
margin:'10px',
width:'150px',
height:'40px'
}} >cancel</Button>
</div>
</div>
           </Form>
           </div>
          

       </div>
       
   {/* </div> */}
   </div>
  
</>
  )
}
const styles = {
datepickercontainer: {
    display:"flex",
    alignItems: "center",
    marginTop:"10px",
   
  },
  
 datepickerlabel :{
    width: "110px",
    marginRight: "0px",
  },
  
  datepickerInput: {
    width: "400px !important",
    mariginTop:"10px !important",
    marginLeft:'20px'
    
  },
  phonediv:{
    display:"flex",
    alignItems: "center",
    marginTop:"10px",
  
  },
  phonecontainer: {
    width: "100px",
    marginRight: "25px",
    
  },
  phoneinput:{
    width:'80% ',
    fontSize:'12px',
    margin:'10px !important',
    borderRadius:'8px',

  },
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "250px",
    background: "#333",
    color: "#fff",
    padding: "20px",
    height:'100vh'
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
export default ProfileAdmin
