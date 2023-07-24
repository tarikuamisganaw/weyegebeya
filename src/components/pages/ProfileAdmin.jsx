import React from 'react'
import { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import ImageUploader from "react-images-upload";
import { Form, Button, Alert, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import back from '../../images/distibution.jpg'
import icon from '../../images/icon.png'
// import "bootstrap/dist/css/bootstrap.min.css";
import {supabase} from '../../config/supabaseClient'
import { UserAuth } from "../../context/AuthContext";
const ProfileAdmin = () => {


    const [startDate, setStartDate] = useState(null);
     const [pictures, setPictures] = useState([]);
     const [successMessage, setSuccessMessage] = useState('');
     const [email,setEmail]=useState('')
     const [userName, setuserName] = useState('');
    const [fullName, setfullName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [image,setImage]=useState('')
    const [avatarUrl,setavatarUrl]=useState('')
    const [location, setLocation] = useState('');
   
    const {user}=UserAuth()
  
     const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle the form submission and store the data
        
        if(image){
          
          
            const {data,erorr}=await supabase.storage.from("avatars").upload(`${Date.now()} ${image.name}`, image)

            if(erorr){
                console.log("storage erorr");
                console.log(erorr);
            }
            if (data) {
              
                const avatarUrl = data.path;
              
                setavatarUrl(data.path)
              
                console.log(user);
                const { data: profileData, error: profileError } = await supabase.from("profiles").upsert({
                  id: user.uid,
                  username: userName,
                  full_name: fullName,
                  avatar_url: avatarUrl,
                  email: email,
                  dateofbirth: startDate,
                  phonenumber: phoneNumber,
                  location: location,
                });
          
                if (profileError) {
                  console.log("Profile error");
                  console.log(profileError);
                }
          
                if (profileData) {
                  console.log("Successfully submitted");
                  setSuccessMessage('success fully updated');
                }
              }
}
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
        console.log(user);
        setuserName(data.username || "");
        setfullName(data.full_name || "");
        setEmail(data.email || "");
        setStartDate("");
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
    <div id="container"  style={{backgroundImage:`url(${back})`,height:'100vh',
width: '100vw',
backgroundSize:'cover',
backgroundRepeat:'no-repeat',
backgroundPosition:'center'
}}>
       <div className="p-4 box" style={{width:'40%',height:'100vh',marginTop:'10px',marginLeft:'10px', border: '1px solid',
padding: '10px',

/* box-shadow: h-offset v-offset blur */
boxShadow: '5px 10px 10px',borderRadius:'10px'}}>
           <h2 className="text-center mb-4">Profile page</h2>
          
          {avatarUrl?<img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`} alt="profilepic" className="avatar" style={{verticalAlign:'middle',
width:'80px',
height:'80px',
borderRadius:'50%',
borderWidth:'5px',
borderColor:'gray',
borderStyle:'outset'}}/>:"no vatart url" } 
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
  <div>
                   <label className="text-center mb-3" htmlFor="email">username:</label>
                   <input
                       className=''
                       type="text"
                       
                       value={userName}
                       onChange={(e) => setuserName(e.target.value)}
                       style={{width:'40%',height:'40px',fontSize:'17px',marginTop:'10px'}}
                   />
                   </div>
                   <div>
                    <label className="text-center mb-3" htmlFor="email">fullname:</label>
                   <input
                       className=''
                       type="text"
                      
                       value={fullName}
                       onChange={(e) => setfullName(e.target.value)}
                       style={{width:'70%',height:'40px',fontSize:'17px',marginTop:'10px'}}
                   />
                   </div>
                   <div>
                   <label className="text-center mb-3" htmlFor="email">phonenumber:</label>
                   <input
                       className=''
                       type="text"
                       value={phoneNumber}
                       onChange={(e) => setphoneNumber(e.target.value)}
                       style={{width:'60%',height:'40px',fontSize:'17px',marginTop:'10px'}}
                   />
                   </div>
                   <div>
                   <label className="text-center mb-3" htmlFor="email">adress:</label>
                   <input
                       className=''
                       type="text"
                       value={location}
                       onChange={(e) => setLocation(e.target.value)}
                       style={{width:'60%',height:'40px',fontSize:'17px',marginTop:'10px'}}
                   />
                   </div>
                   <div>
                   <label className="text-center mb-3" htmlFor="email">email:</label>
                   <input
                       className=''
                       type="text"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       style={{width:'60%',height:'40px',fontSize:'17px',marginTop:'10px'}}
                   />
                   </div>
               
          
               </div>
               <div style={styles.datepickercontainer}>
  <label htmlFor="email" style={styles.datepickerlabel}>
    Date of Birth:
  </label>
  <DatePicker
    style={styles.datepickerInput}
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="dd/MM/yyyy"
    required
  />
</div>
          <div style={{ marginTop:'10px' }}>
               <Button className='w-100 mb-4'style={{ backgroundColor:' #4c8bf5',
color:'black',
fontSize:'15px',
padding: '10px 2px',
borderRadius: '5px',

marginTop:'10px',
width:'150px'
}} type="submit">submit</Button>
</div>
           </Form>
           </div>
           <div className='w-100 text-center mt-10'>
               <Link to="/account">back to dashboard</Link> 
              
           </div>

       </div>
       
   </div>
  
</>
  )
}
const styles = {
datepickercontainer: {
    display:"flex",
    alignItems: "center",
  },
  
 datepickerlabel :{
    width: "100px",
    marginRight: "10px",
  },
  
  datepickerInput: {
    width: "50px !important",
  },
 
};
export default ProfileAdmin
