import { useContext,createContext, useEffect,useState} from "react";

import { GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,sendPasswordResetEmail,
  signInWithRedirect,signOut,onAuthStateChanged,RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
 const AuthContext=createContext()
  export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState({})
    const navigate=useNavigate()
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password)
     
  }

  function resetPassword(email) {
      return sendPasswordResetEmail(email)
  }

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
  setLoading(false)
  
  return()=>{
    unsubscribe();

  }

})

    },[])
  
    return( 
        
        <AuthContext.Provider value={{login,resetPassword,googleSignIn,logout,user,setUpRecaptha}}>
          {!loading && children}
        </AuthContext.Provider>
    )

  }
  export const UserAuth=()=>{
    return useContext(AuthContext)
  }