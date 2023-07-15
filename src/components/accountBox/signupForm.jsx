import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase-config";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPasswordl] = useState("")

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const regsiter = async () => {
    try {
     
      
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword


      )
      setRegisterEmail("");
      setRegisterPasswordl("");

      
      
    } catch (error) {
      console.log(error.message)
    }
  }
  const handlePhonesignup=()=>{
  
  }
  
  return (
    <BoxContainer>
      <FormContainer>
        {/* <Input type="text" placeholder="Full Name" /> */}
        <Input type="email" placeholder="Email" style={{ color: 'black' }}
          onChange={e => setRegisterEmail(e.target.value)} />
        <Input type="password" placeholder="Password"
          onChange={e => setRegisterPasswordl(e.target.value)} />
        
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <button type="submit" onClick={regsiter} style={{backgroundColor:' #4c8bf5',
  color:'white',
  fontSize:'17px',
  height:'55px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>Signup</button>
      <Link to='/phoneSignup'>
      <button type="submit" style={{ backgroundColor:' #4c8bf5',
  color:'white',
  fontSize:'17px',
  height:'55px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent' }}>signup with phone number</button>
      </Link>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
