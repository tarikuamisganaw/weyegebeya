import React, { useContext,useEffect,useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { auth } from "../../firebase-config";
import GoogleButton from 'react-google-button'
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from '@react-oauth/google';
// import { FcGoogle } from "react-icons/fc";
//loginform

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
// const pass=(googledata)=>{
//   console.log("googledata")
// }
// const fail=(result)=>{
//   console.log("result")
// }


const [loginEmail,setLoginEmail]=useState("")
const [loginPassword,setLoginPassword]=useState("")
const {googleSignIn,user}=UserAuth()
const navigate=useNavigate()
const handleGoogleSignIn=async()=>{
  try{
    console.log('wait')
await googleSignIn()

  }catch(error){
    console.log(error)
  }


}
const handlePhonesigin=()=>{
  
}

const login=()=>{

}
const logout=()=>{
  

}
useEffect(()=>{
if(user!=null){
  console.log('signedin')
  navigate('/account')
}
},[user])
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" style={{color:'black'}}
        onChange={e => setLoginEmail(e.target.value)}/>
        <Input type="password" placeholder="Password" 
        onChange={e => setLoginPassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" style={{color:'black'}}>Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <button type="submit" style={{ backgroundColor:' #4c8bf5',
  color:'white',
  fontSize:'17px',
  height:'55px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>signin with email</button>
             
     <GoogleButton  onClick={handleGoogleSignIn} style={{ backgroundColor:' #4c8bf5',
  color:'white',
  fontSize:'17px',
  padding: '0px 0px',
  borderRadius: '5px',
  width:'250px',
  margin: '10px 0px',}}/>
          <Link to='/phoneSignup'>
      <button type="submit" style={{ backgroundColor:' #4c8bf5',
  color:'white',
  fontSize:'17px',
  height:'55px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>signin with phone number</button>
      </Link>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
