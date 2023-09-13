import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import back from './images/distibution.jpg'
import { BrowserRouter,Route,Routes,Switch  } from "react-router-dom";

import Login from "./components/pages/Login";
import { AuthContextProvider } from "./context/AuthContext";

import Protected from "./components/pages/Protected";
import PhoneSignUp from "./components/pages/PhoneSignUp";
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import Dashboard from "./components/pages/Dashboard";
import { ResetPassword } from "./components/accountBox/ForgotPassword";
// import AdminProFile from "./components/pages/AdminProFile";
import ProfileAdmin from "./components/pages/ProfileAdmin";
import Shop from "./components/pages/shop"
import Deatail from "./components/pages/Detail";
import Dashboarder from "./components/pages/dashenew";
import cartReducer from "./features/CartSlice";

// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: left;
//   justify-content: center;
  
 
// `;



function App() {
  const store=configureStore({
    reducer:{
      cart:cartReducer
    }

  })
  return (
   <>
   {/* <Login/> */}
   <AuthContextProvider>
   <Provider store={store}>
    <Routes>
    <Route  exact path="/"  element={<Shop />}/> 
   
    <Route exact path="/login"  element={<Login/>}/>
    <Route exact path="/profile"  element={<Protected><ProfileAdmin/></Protected>}/>


    <Route exact path="/phoneSignUp" element={<PhoneSignUp/>}/>
    
    <Route path="/detail/:id"  element={<Deatail />}></Route> 
<Route exact path="/account" element={<Protected><Dashboard/></Protected>}/>
<Route exact path="/forgot" element={<ResetPassword/>}/>
<Route exact path="/dasher" element={<Dashboarder/>}/>

    </Routes>
    </Provider>
    </AuthContextProvider>
    </>
  );
}

export default App;
