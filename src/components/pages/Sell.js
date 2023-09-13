import React from 'react'
import { useEffect,useState } from "react";
import '../css/Modal.css'
import uuid from 'react-uuid'
import {supabase} from '../../config/supabaseClient'
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons';
import { UserAuth } from "../../context/AuthContext";

import {  Input, DatePicker, } from 'antd';

import { useNavigate } from "react-router-dom";


import { Form,Alert, Button, ModalFooter  } from 'react-bootstrap'

const Sell = ({ toggleModale }) => {
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDesription]=useState('')
  const [image,setImage]=useState('')
  const [amount,setAmount]=useState('')
  const [select, setSelect] = useState('');
  const [modale, setModale] = useState(false);
  const [avatarUrl,setavatarUrl]=useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const [category, setcategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [customer,setCustomer]=useState(null)
  const {user,logout}=UserAuth()
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUserId = uuid(); 
   
   let newavatarUrl = avatarUrl 
    if (image) {
      const { data, error } = await supabase.storage
        .from('proImage')
        .upload(`${Date.now()} ${image.name}`, image);
  
      if (error) {
        console.log('Storage error');
        console.log(error);
      }
  
      if (data) {
        newavatarUrl = data.path;
        setavatarUrl(newavatarUrl);
       
        console.log('Successfully uploaded image');
      }
    }
  
    const { data: profileData, error: profileError } = await supabase.from('products_table').upsert({
      id: newUserId,
       product_name:name,
      product_image: newavatarUrl,
      product_price:price,
  product_desc:description,
  product_amount:amount,
  category:category,
  end_date_of_bidding: startDate ? startDate.toISOString() : null,
      bid_info:select,
      customer_id:user.uid
    });
  
    if (profileError) {
      console.log('Profile error');
      console.log(profileError);
    }
  
    if (profileData) {
      console.log('Successfully submitted');
      setSuccessMessage('Successfully updated');
    }
    setSuccessMessage('Successfully updated');
    setImage("")
    setName("")
    setPrice("")
    setDesription("")
    setSelect("")
    setAmount("")
    setStartDate("")
    setcategory("")
    document.getElementById('imageInput').value = "";
  
  }
  
  return (
    <div className="modal">
    <div onClick={toggleModale} className="overlay"></div>
    <div className="modal-content" style={{width:'300px'}}>
      <h2 style={{color:"black",}}>Sell product</h2>
      {successMessage && <Alert variant="success" style={{color:"black",}}>{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
      <div>
        <div>
        <label  htmlFor="email" style={{marginRight:"10px",color:"black"}}>product image:</label>
      <input type="file" id="imageInput" className='input' placeholder="choose image" accept={"image/jpeg image/png"} onChange={(e) => setImage(e.target.files[0])}
/>
</div>
             <Input
                 className='inputer'
                 type="text"
                placeholder="product name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 
             />
              <Input
                 className='inputer'
                 type="text"
                 placeholder="product price"
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
                 
             />
             <Input
                 className='inputer'
                 type="text"
                 placeholder="product description"
                 value={description}
                 onChange={(e) => setDesription(e.target.value)}
                 
             />
             <Input
                 className='inputer'
                 type="text"
                 placeholder="Enter amount"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}

                 
             />
             <Input
                 className='inputer'
                 type="text"
                 placeholder="Enter category"
                 value={category}
                 onChange={(e) =>setcategory(e.target.value)}

                 
             />

              <select  value={select} 
              onChange={(e) => setSelect(e.target.value)}
              className='inputer' name="bidding information">
                <option></option>
  <option value="bid">bid</option>
  <option value="no bid">no bid</option>
  
</select>
{select === 'bid'?(
  <div>
      <DatePicker
value={startDate}
onChange={(date) => setStartDate(date)}
showTime={{ format: 'HH:mm:ss' }}
format="MM/DD/YYYY HH:mm:ss"
placeholder="select end date for auction"
/>
</div>
      
    ):""}
             </div>
             <Button className='w-100 mb-4'style={{ backgroundColor:' #783584',
color:'white',
fontSize:'15px',
padding: '5px 2px',
borderRadius: '15px',
borderColor:'transparent',
margin:'10px',
width:'150px',
height:'30px',
marginLeft:'80px',
cursor: "pointer"

}} type="submit">create product</Button>
      <Button className='close-modal' onClick={() => toggleModale(false)}>
      <AiOutlineClose />
      </Button>
      </Form>
    </div>
  </div>
  )
}

export default Sell
