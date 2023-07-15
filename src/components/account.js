import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
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
        <p>Welcome{user?.displayName }</p>
      <button onClick={handleSignOut}>logout</button>

       
      
    </div>
  )
}

export default Account
