import React, { useState,useEffect } from 'react';
import '../css/detail.css'

// import DetailsThumb from './DetailThumb';
import { Form,Alert, Button  } from 'react-bootstrap'
import cargo_pants from '../../images/download.jpeg';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';
import {supabase} from '../../config/supabaseClient'
import RatingStars from 'react-rating-stars-component';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import {FiLogOut, } from 'react-icons/fi';
import SetTimer from './SetTimer';
import CountdownTimer from './SetTimer';
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"
const Deatail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(1);
  const navigate=useNavigate()
  const {user,logout}=UserAuth()
    const handleSignOut=async()=>{
try{
await logout()
}catch(error){
    console.log(error)
}
    }
  useEffect(() => {
    const getProduct = async () => {
      // Fetch the data from the product_table
      const { data, error } = await supabase
        .from('products_table')
        .select('*')
        .eq('id', id )
        .single();
        console.log(id );
      if (error) {
        console.log(error);
      } else {
        setProduct(data);
      }
    };

    getProduct();
  }, [id]);

 
  if (!product) {
    return <div>Loading...</div>;
  }
    return(
       <div>
         <div  style={{background:'#333',width:'100%',height:'35px'}} >
         <button onClick={()=>{
  navigate('/shop')
}} style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'30px',
  width:'150px',
  padding: '10px 10px',
  borderRadius: '5px',
  marginLeft:'20%',
  borderColor:'transparent',
  cursor: "pointer"}}>  <FaShoppingCart  style={{marginRight: '5px'}} />product List</button>
  <button onClick={()=>{
  navigate('/account')
}}  style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'30px',
  width:'150px',
  padding: '10px 10px',
  borderRadius: '5px',
  marginLeft:'100px',
  borderColor:'transparent',
  cursor: "pointer"}}>
<FaUser  style={{marginRight: '5px'}} />dashboard</button>
<button onClick={handleSignOut}  style={{backgroundColor:' #333',
  color:'white',
  fontSize:'17px',
  height:'30px',
  width:'150px',
  padding: '10px 10px',
  borderRadius: '5px',
  marginLeft:'150px',
  borderColor:'transparent',
  cursor: "pointer"}}>
<FiLogOut style={{marginRight: '5px'}} />logout</button>
         </div>
<div className="app">
        <div className="header">
          <h1 style={{ color: 'black', textAlign: 'center', marginTop: '20px' }}>Product Details</h1>
        </div>
        <div className="details" style={{ background: '#f8f9f5'}}>
          <div className="big-img">
            <img src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${product.product_image}`} alt={product.product_name} style={{ width: '100%' }} />
          </div>

          <div className="box" style={{ background: 'lightgray', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
            <div className="row">
              <h2 style={{ color: 'black' }}>{product.product_name}</h2>
             
            </div>
            <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>short description</p>
            <li style={{ color: 'black' }}>{product.product_desc}</li>
            <RatingStars
    count={5}
    value={rating}
    onChange={setRating}
    size={24}
    activeColor="#ffd700"
  />
<div style={{marginTop:'30px'}}>
            <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>${product.product_price}</p>
           
            <p style={{ color: 'black' }}>Only {product.product_amount} items left</p>
            </div>
            {product.bid_info === 'bid' ?(
              <div>
              <p>time left for auction end</p>
<CountdownTimer productId={product.id}/>
<Button className='w-100 mb-4'
              style={{ backgroundColor: '#783584', color: 'white', fontSize: '15px', padding: '5px 2px', borderRadius: '15px', borderColor: 'transparent', margin: '10px', width: '150px', height: '30px', marginLeft: 'auto', marginRight: 'auto', cursor: "pointer" }}>
              Offer Bid
            </Button>
</div>):<Button className='w-100 mb-4'
              style={{ backgroundColor: '#783584', color: 'white', fontSize: '15px', padding: '5px 2px', borderRadius: '15px', borderColor: 'transparent', margin: '10px', width: '150px', height: '30px', marginLeft: 'auto', marginRight: 'auto', cursor: "pointer" }}>
              Buy Now
            </Button>}
            
            {/* <div style={{ background: 'lightgray',borderColor:'black', padding: '20px', borderRadius: '5px',marginTop:'40px'}}>
            <p style={{ color: 'black' }}>
              <FaTruck style={{ marginRight: '5px' }} />
              Free delivery
            </p>
            <Link style={{ color: 'black', marginTop: '10px' }}>Enter your code for delivery availability</Link>
            <p style={{ color: 'black' }}>
              <FaTruck style={{ marginRight: '5px' }} />
              Return delivery
            </p>
            <Link style={{ color: 'black', marginTop: '10px' }}>Free 30 day delivery returns</Link>
          </div> */}
          </div>
        </div>
      </div>
      </div>
    );
  };
  export default Deatail;
