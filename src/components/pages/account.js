import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
const Account = () => {
    const {user,logout}=UserAuth()
    const handleSignOut=async()=>{
try{
await logout()
}catch(error){
    console.log(error)
}

    }
  return (
    
    <div>
        

       
      
    </div>
  )
}

export default Account
