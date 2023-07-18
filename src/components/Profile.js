import { useEffect, useState } from "react";
import {upload} from '../firebase-config'
import'./profile.css'
import { UserAuth } from "../context/AuthContext";
import { storage } from "../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import { uploadBytes, } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import back from '../images/profile2.png'
export default function Profile() {
  const {user}=UserAuth()
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Url,setUrl]=useState(null)
  const [photoURL, setPhotoURL] = useState(null);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
//     const imageRef=ref(storage,user.uid+'.png')
//     uploadBytes(imageRef,file)
//     getDownloadURL(imageRef).then((url)=>{
// setPhotoURL(url)


//     }).catch(error){

    //}

    upload(photo, user, setLoading);
  }
  async function upload(file,user,setLoading){
      setLoading(true)
    const fileRef=ref(storage,user.uid+'.png')
    const snapshot=await uploadBytes(fileRef,file)
    const photoURL= await getDownloadURL(fileRef)
    await updateProfile(user,{photoURL})
    // updateProfile(user,{photoURL})
    setLoading(false)
    alert("file uploaded")
    }

  useEffect(() => {
    if (user && user?.photoURL) {
      setPhotoURL(user.photoURL);
   }
  }, [user?.photoURL])

  return (
    <div className="fields">
      
 <img src={photoURL || back} alt="profilepic" className="avatar" />

 <p>Welcome,{user?.displayName || user?.email || user?.phoneNumber }</p>
  <input type="file" onChange={handleChange} style={{ backgroundColor:'transparent',
  color:'black',
  fontSize:'15px',
  padding: '10px 2px',
  borderRadius: '5px',
  margin: '10px 0px',
  width:'200px'
 }}/>
      <button disabled={loading || !photo} onClick={handleClick} style={{backgroundColor:' #24a0e',
  color:'black',
  fontSize:'15px',
  height:'40px',
  width:'100px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>Upload</button>
      
    </div>
  );
}