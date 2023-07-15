import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import back from './images/distibution.jpg'
import { BrowserRouter,Route,Routes,Switch  } from "react-router-dom";
import Home from "./components/Home";
import Login from "./Login";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./components/account";
import Protected from "./components/Protected";
import PhoneSignUp from "./components/PhoneSignUp";
// import Dashboard from "./components/DashBoard";
import Dashboard from "./components/Dashboard2";
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
   
    {/* <Route exact path="/"  element={<Home/>}/> */}

    <Route exact path="/"  element={<Login/>}/>
    <Route exact path="/phoneSignUp" element={<PhoneSignUp/>}/>

{/* <Route exact path="/account" element={<Protected><Account/></Protected>}/> */}
<Route exact path="/account" element={<Protected><Dashboard/></Protected>}/>

{/* <Route exact path="/dashboard" element={<Dashboard/>}/> */}
    </Routes>
    
    </AuthContextProvider>
    </>
  );
}

export default App;
