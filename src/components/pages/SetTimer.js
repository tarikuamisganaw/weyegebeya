import React, { useState, useEffect } from "react";
// import '../css/timer.css'
import Timer from "./Clock";
import {supabase} from '../../config/supabaseClient'
import { BsFillPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";
import uuid from 'react-uuid'
import { UserAuth } from "../../context/AuthContext";

export default function CountdownTimer( {productId, product, onsetOrderPlaced, onNotUser,onOrderPlaced  } ) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const[orderly,setOrderly]=useState(false)
  const [see,setSee]=useState(false)
  
  // End of Time
  let newUserId = uuid();
  const {user,logout}=UserAuth()
  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "",
  });
  useEffect(() => {
    
    const fetchCreatedAt = async () => {

      const { data, error } = await supabase
        .from('products_table')
        .select('end_date_of_bidding')
        .eq('id',productId)
        .limit(1)
        .single();
        
  
      if (error) {
        console.error('Error fetching created_at:', error);
      } else {
        
        setCreatedAt(data.end_date_of_bidding);
        onNotUser(see)
        onsetOrderPlaced(orderly);
        
      }
    };
  
    fetchCreatedAt();
  }, [orderly,see]);
  // Start Pause & Stop functions
  const placeOrder = async () => {
    try {
      // Create array of items from cart
  const items = [{
    id: product.id,
    image:product.product_image,
    name: product.product_name,
    amount: product.product_amount,
    sellerid:product.customer_id,
   
  }];
  const price= product.product_amount*product.product_price
      const { data, error } = await supabase
        .from('ordering')
        .insert([
          {
            id: newUserId,
            user_id: product.bidder_id,
          no_items: product.product_amount,
            total_price: price,
             items: items
          },
        ]);

      if (error) {
        console.error('Error inserting order:', error);
      } else {
        console.log('Order placed successfully:', data);
      }
    } catch (error) {
      console.error('Error inserting order:', error);
    }
    const { data: updatedProduct, error } = await supabase
        .from('products_table')
        .update({ 
          product_amount:"soldout"
            
        })
        .eq('id', product.id)
        .single();
    
      if (error) {
        console.error(error);
      }
  };
  // Start
  function startTimer() {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      setShowEndScreen({ ...showEndScreen, show: false });
    } else {
      window.alert("Add Time.");
    }
  }

  // Pause
  function pauseTimer() {
    setIsRunning(false);
  }
  // Stop
  const calculateRemainingTime = () => {
    const difference = new Date(createdAt) - new Date();
    if (difference > 0) {
      const milliseconds =  Math.floor(difference / (1000 * 60 * 60 * 24)); 
      const seconds = Math.floor((difference / 1000) % 60);
      const minutes =  Math.floor((difference / 1000 / 60) % 60); 
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  
      setMilliseconds(seconds);
      setSeconds(minutes);
      setMinutes(hours);
      setHours(milliseconds);
    } else if (difference < 0 && product.bidder_id === user.uid) {
      setOrderly(true);
      console.log(orderly)
    
    } else{
      setSee(true)
     console.log(see)
     console.log(true)
    }
    
  };

  function stopTimer() {
    resetTimer();
    setShowEndScreen({ ...showEndScreen, show: false });
  }

  function resetTimer() {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }
  // Handlers
  useEffect(() => {
    if (createdAt !== null) {
      calculateRemainingTime();
    }
    if (orderly) {
      onOrderPlaced();
    }
  }, [createdAt]);
  const changeSeconds = (e) => {
    setSeconds(e.target.value);
  };
  const changeMinutes = (e) => {
    setMinutes(e.target.value);
  };
  const changeHours = (e) => {
    setHours(e.target.value);
  };
  return (
    <div>
      {showEndScreen.show && (
        <h1 className="title  text-light">{showEndScreen.message}</h1>
      )}
      <Timer
        milliseconds={milliseconds}
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        changeSeconds={changeSeconds}
        changeMinutes={changeMinutes}
        changeHours={changeHours}
      />
      <br />
      
    </div>
  );
}
