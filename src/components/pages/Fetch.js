import React, { useEffect,useState } from 'react'
import axios from 'axios'

const AdminProFile = () => {
  const [notes,setNotes]=useState([])
    const fetchNotes=async()=>{
        const {data}=await axios.get('/api/notes')
        setNotes(data)
        console.log(data);
    }
    useEffect(()=>{
        fetchNotes()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default AdminProFile

