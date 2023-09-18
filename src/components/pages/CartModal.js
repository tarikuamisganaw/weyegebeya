import React from 'react'
import {React,useState,useEffect} from 'react';
import '../css/shop.css';
import { useDispatch,useSelector } from 'react-redux';
import {addCart, decreaseQuantity, removeFromCart,clearCart} from '../../features/CartSlice'
import {supabase} from '../../config/supabaseClient'
import { Form,Alert, Button  } from 'react-bootstrap'
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
const CartModal = () => {
    const toggleModal = () => {
        setModal(!modal);
      };
      const cart=useSelector((state)=>state.cart)
      const [modal, setModal] = useState(false);
      const [loading, setLoading] = useState(false);
 const [modale, setModale] = useState(false);
 
 const {user,logout}=UserAuth()
const  dispatch=useDispatch()
const totalPrice = cart.cartItems.reduce((total, product) => total + product.product_price * product.cartQunatity, 0);
 const handleRemoveCart = (product) => {
 
  dispatch(removeFromCart(product))
};

const decrementCartQuantity = (product) => {
dispatch(decreaseQuantity(product))
};
const incrementCartQuantity = (product) => {
  dispatch(addCart(product))
};
 const addToCart = (product) => {
  dispatch(addCart(product))
  
  setModal(true);
};


const handleOrder = async () => {
  setLoading(true);

  // Get total number of items and total price from cart
  const noItems = cart.cartItems.reduce((total, product) => total + product.cartQunatity, 0);
  const totalPrice = cart.cartItems.reduce((total, product) => total + product.product_price * product.cartQunatity, 0);

  // Insert order into order_table
  const { data, error } = await supabase.from('ordering').upsert([
    {
      id: newUserId,
      user_id: user.uid,
      no_items: noItems,
      total_price: totalPrice,
    },
  
  ]);

  if (error) {
    console.error(error);
  } else {
    // Update product_table with new quantities
    for (const product of cart.cartItems) {
      const { data: updatedProduct, error } = await supabase
        .from('products_table')
        .update({ 
          product_amount: product.product_amount - product.cartQunatity <= 0 
            ? "soldout" 
            : product.product_amount - product.cartQunatity 
        })
        .eq('id', product.id)
        .single();
    
      if (error) {
        console.error(error);
      }
    }

    dispatch(clearCart());
  }

  setLoading(false);
};;
 
  return (
    <div className="modal">
    <div onClick={toggleModal} className="overlay"></div>
    <div className="modal-content" style={{width:'500px'}}>
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
          <th>product image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qunatity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
  {cart.cartItems.map((product) => (
    <tr key={product.id}>
    <td>
    <img
      src={`https://dfvcmxwvvqvmnpikczag.supabase.co/storage/v1/object/public/proImage/${product.product_image}`} 
      style={{width:'70px',height:'70px'}}
      alt={product.product_name}
    />
  </td>
      <td>{product.product_name}</td>
      <td>${product.product_price}</td>
      
      <td>
      <div class="cart-quantity">
    <Button class="minus-btn" onClick={() => decrementCartQuantity(product)}>-</Button>
    <span>{product.cartQunatity}</span>
    <Button class="plus-btn" onClick={() => addToCart(product)}>+</Button>
  </div>
      </td>
      <td>{product.product_desc}</td>
     
      <td>
        <Button   style={{backgroundColor:' red',borderRadius: '5px',
      borderColor:'transparent',}} onClick={() => handleRemoveCart(product)}>Remove</Button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
     
      <div className="total-price">Total price:${totalPrice}</div>
      <button disabled={loading} onClick={handleOrder} style={{ backgroundColor:' #118dda',
        color:'white',
        fontSize:'15px',
        padding: '5px 2px',
        borderRadius: '5px',
        borderColor:'transparent',
        margin:'10px',
        width:'100px',
        height:'30px',
        marginLeft:'130px',
        cursor: "pointer"
        
        }}>
        {loading ? 'Placing order...' : 'Place Order'}
      </button>

     
      
       
      <Button className='close-modal' onClick={toggleModal}>
        <AiOutlineClose />
      </Button>
    </div>
  </div>
  )
}

export default CartModal
