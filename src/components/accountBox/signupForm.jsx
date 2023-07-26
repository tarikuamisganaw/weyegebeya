import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import {  Alert } from 'react-bootstrap'
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
  const [successMessage, setSuccessMessage] = useState('');

  const regsiter = async () => {
    try {
     
      
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
       

      )
      setRegisterEmail("");
      setRegisterPasswordl("");
      setSuccessMessage('success fully signed up');
      
      
    } catch (error) {
      console.log(error.message)
    }
  }
 
  
  return (
    <BoxContainer>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <FormContainer>
        {/* <Input type="text" placeholder="Full Name" /> */}
        <Input type="email" placeholder="Email" style={{ color: 'black' }}
          onChange={e => setRegisterEmail(e.target.value)}  value={registerEmail}/>
        <Input type="password" placeholder="Password"
          onChange={e => setRegisterPasswordl(e.target.value)}  value={registerPassword}/>
        
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <button type="submit" onClick={regsiter} style={{backgroundColor:' #783584',
  color:'white',
  fontSize:'17px',
  height:'40px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent'}}>Signup</button>
      <Link to='/phoneSignup'>
      <button type="submit" style={{ backgroundColor:' #783584',
  color:'white',
  fontSize:'17px',
  height:'40px',
  width:'250px',
  padding: '10px 10px',
  borderRadius: '5px',
  margin: '10px 0px',
  borderColor:'transparent' }}>signup with phone number</button>
      </Link>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#"style={{color:'black'}}>
        Already have an account?
        <BoldLink href="#" style={{color:'black'}} onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
