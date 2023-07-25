
import React from 'react'
import { useState,useEffect } from "react";
import {supabase} from '../../config/supabaseClient'
import { UserAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
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
    <div>
       {avatarUrl?<img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`} alt="profilepic" className="avatar" style={{verticalAlign:'middle',
width:'80px',
height:'80px',
borderRadius:'50%',
borderWidth:'5px',
borderColor:'gray',
borderStyle:'outset'}}/>:"no image choosen" } 
<p>{userName}</p>
<p>Welcome,{user?.displayName || user?.email || user?.phoneNumber }</p>

    </div>
  )
}

export default ProfileInfo
