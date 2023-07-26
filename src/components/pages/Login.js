import "../../App.css";
import styled from "styled-components";
import { AccountBox } from "../accountBox";
import back from '../../images/loginer.gif'
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
    <div  style={{backgroundColor:'white',width:'100vw',display:"flex",
    alignItems: "center",}}>
     <div   style={{backgroundImage:`url(${back})`,height:'100%',
width: '40%',
backgroundSize:'contain',
backgroundRepeat:'no-repeat',
backgroundPosition:'center',
marginRight:"2000px",
backgroundColor:''

}}>
 
    <AppContainer style={{marginLeft:'750px',marginTop:'10px'}}>
      <AccountBox />
      

      
    </AppContainer>
    </div>
    </div>
   
  );
}

export default Login;