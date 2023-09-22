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
import { AiOutlineClose } from 'react-icons/ai';
import Header from './Header';
import HeaderExtra from './common/HeaderExtra';
import swal from "sweetalert"
const Deatail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(1);
  const navigate=useNavigate()
  const {user,logout}=UserAuth()
  const [bidPrice, setBidPrice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [modali, setModali] = useState(false);
  const handleBidClick = () => {
    if(!user){
      swal ("sigup first to offer bid ")
    }else{setShowModal(true);}
    
  };
  const handleModalSubmit = async () => {
   
    if (bidPrice >= product.product_price) {
      const { data, error } = await supabase
        .from('products_table')
        .update({ product_price: bidPrice, bidder_id: user.uid })
        .eq('id', id);
      if (error) {
        console.log(error);
      } else {
        setProduct(data);
        setShowModal(false);
      }
    } else {
      swal(`Bid price cannot be below ${product.product_price}`);
    }
  }; 
  const toggleModali = () => {
    setModali(!modali);
  };
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
  }, [handleModalSubmit]);

  const handlelog=()=>{
    navigate('/login')
  }
  const handlehome=()=>{
    navigate('/')
  }
  if (!product) {
    return <div>Loading...</div>;
  }
    return(
       <div>
         {/* <div className="header">
        <div className="header__actions">
      

      <span className="header__action-title"onClick={handlehome} ><span>Home</span></span>
      {!user && (
      <span className="header__action-title" onClick={handlelog} ><span>Signin</span></span>
      )}
     
      {user && (
        <div className="header__actions">
          <span className="header__action-title" onClick={handleSignOut}><span>Logout</span></span>
          
        </div>
        )}
    </div>
    </div> */}
    <HeaderExtra/>
         
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
            <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>start bid price:${product.product_price}</p>
           
            <p style={{ color: 'black' }}>Only {product.product_amount} items left</p>
            </div>
            {product.bid_info === 'bid' ? (
        <div>
          <p>time left for auction end</p>
          <CountdownTimer productId={product.id} product={product} />
          <Button
            className='w-100 mb-4'
            style={{
              backgroundColor: '#783584',
              color: 'white',
              fontSize: '15px',
              padding: '5px 2px',
              borderRadius: '15px',
              borderColor: 'transparent',
              margin: '10px',
              marginLeft: '50px',
              width: '150px',
              height: '30px',
              marginRight: 'auto',
              cursor: 'pointer',
            }}
            onClick={handleBidClick}
          >
            Offer Bid
          </Button>
       
        </div>
      ) : (
        <Button
          className='w-100 mb-4'
          style={{
            backgroundColor: '#783584',
            color: 'white',
            fontSize: '15px',
            padding: '5px 2px',
            borderRadius: '15px',
            borderColor: 'transparent',
            margin: '10px',
            width: '150px',
            height: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
            cursor: 'pointer',
          }}
        >
          Buy Now
        </Button>
      )}
 {failMessage && <Alert variant="success">{failMessage}</Alert>}
  {showModal  && <div className="modal" >
      <div className="modal-content" >
        
        <p>Enter your bid price:</p>
        <input
        type="number"
        min={product.product_price}
        value={bidPrice}
        onChange={(e) => setBidPrice(e.target.value)}
      />
    
          <button className='close-modal' onClick={() => setShowModal(false)}>
      <AiOutlineClose />
      </button>
          <button  className="orderb" onClick={handleModalSubmit}>
            Submit Bid
          </button>
      </div>
    </div>}
           
          </div>
        </div>
      </div>
      </div>
    );
  };
  export default Deatail;
