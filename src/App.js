import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import back from './images/distibution.jpg'
import { BrowserRouter,Route,Routes,Switch  } from "react-router-dom";

import Login from "./components/pages/Login";
import { AuthContextProvider } from "./context/AuthContext";

import Protected from "./components/pages/Protected";
import PhoneSignUp from "./components/pages/PhoneSignUp";

import Dashboard from "./components/pages/Dashboard2";
import { ResetPassword } from "./components/accountBox/ForgotPassword";
// import AdminProFile from "./components/pages/AdminProFile";
import ProfileAdmin from "./components/pages/ProfileAdmin";

// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: left;
//   justify-content: center;
  
 
// `;


function App() {
  return (
   <>
   {/* <Login/> */}
   <AuthContextProvider>
   
    <Routes>
   
    <Route exact path="/"  element={<Login/>}/>
    <Route exact path="/profile"  element={<Protected><ProfileAdmin/></Protected>}/>
    <Route exact path="/phoneSignUp" element={<PhoneSignUp/>}/>


<Route exact path="/account" element={<Protected><Dashboard/></Protected>}/>
<Route exact path="/forgot" element={<ResetPassword/>}/>

    </Routes>
    
    </AuthContextProvider>
    </>
  );
}

export default App;
