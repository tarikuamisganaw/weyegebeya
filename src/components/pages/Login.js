import "../../App.css";
import styled from "styled-components";
import { AccountBox } from "../accountBox";
import back from '../../images/distibution.jpg'
import { BrowserRouter,Route,Routes } from "react-router-dom";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  
 
`;


function Login() {
  return (
    
    <AppContainer style={{backgroundImage:`url(${back})`, width: '100vw',
    height: '100vh',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center'}}>
      <AccountBox />
      

      
    </AppContainer>
   
  );
}

export default Login;