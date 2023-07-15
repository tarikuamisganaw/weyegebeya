import { useContext,createContext, useEffect,useState} from "react";
import { useInRouterContext } from "react-router-dom";
import { GoogleAuthProvider,signInWithPopup,
  signInWithRedirect,signOut,onAuthStateChanged,RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
 const AuthContext=createContext()
  export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState({})
    const navigate=useNavigate()
    const googleSignIn=()=>{
      const provider=new GoogleAuthProvider()
      signInWithRedirect(auth,provider)
    }
   function setUpRecaptha (number){
const recaptchaVerifier=new RecaptchaVerifier(auth, 'recaptcha-container', {});
recaptchaVerifier.render()
return signInWithPhoneNumber(auth,number,recaptchaVerifier)
   }
    const logout=()=>{
      signOut(auth)
      navigate('/')
    
    }
    useEffect(()=>{
const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
  setUser(currentUser)
  console.log('User',user)
  return()=>{
    unsubscribe();

  }

})

    },[])
    return( 
        
        <AuthContext.Provider value={{googleSignIn,logout,user,setUpRecaptha}}>
          {children}
        </AuthContext.Provider>
    )

  }
  export const UserAuth=()=>{
    return useContext(AuthContext)
  }