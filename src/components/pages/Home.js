import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
const Home = () => {
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
       
      {user?.displayName ?(<button onClick={handleSignOut}>logout</button>):(

        <Link to='/'>Login page</Link>
      )}
    </div>
  )
}

export default Home
