import React, { useContext,useEffect,useState,useRef } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import {createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword} from 'firebase/auth'
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { auth } from "../../firebase-config";
import GoogleButton from 'react-google-button'
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ResetPassword } from "./ForgotPassword";
import { async } from "@firebase/util";
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

const emailRef = useRef()
const passwordRef = useRef()
const { login } = UserAuth()
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
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
async function handleSubmit(e) {
  e.preventDefault()

  try {
    
    setError(' ')
    
    setLoading(true)
    await login(emailRef.current.value, passwordRef.current.value)
    emailRef.current.value = ""
    passwordRef.current.value = ""
  }
  catch {
    setError('Failed to log in')
  }
  setLoading(false)

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
      <Input ref={emailRef} type="email" placeholder="Email" style={{ color: 'black' }}
         required />
        <Input ref={passwordRef} type="password" placeholder="Password"
         required />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="/forgot" style={{color:'black'}}>Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <button type="submit" style={{ backgroundColor:'#783584',
  color:'white',
  fontSize:'17px',
  height:'40px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}} onClick={handleSubmit} >{!loading ? "Signin" : "loading"}</button>
             
     <GoogleButton  onClick={handleGoogleSignIn} style={{ backgroundColor:' #783584',
  color:'white',
  fontSize:'17px',
  padding: '0px 0px',
  borderRadius: '5px',
  width:'250px',
  height:'40px',
  margin: '10px 0px',}}/>
          <Link to='/phoneSignup'>
      <button type="submit" style={{ backgroundColor:'#783584',
  color:'white',
  fontSize:'17px',
  height:'40px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>signin with phone number</button>
      </Link>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#" style={{color:'black'}}>
        Don't have an account?{" "}
        <BoldLink href="#"style={{color:'#783584'}} onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
