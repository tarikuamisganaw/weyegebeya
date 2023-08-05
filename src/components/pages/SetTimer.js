import React, { useState, useEffect } from "react";
// import '../css/timer.css'
import Timer from "./Clock";
import {supabase} from '../../config/supabaseClient'
import { BsFillPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";


export default function CountdownTimer({ productId }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  // End of Time

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
      }
    };
  
    fetchCreatedAt();
  }, []);
  // Start Pause & Stop functions

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
    } else {
      setShowEndScreen({ ...showEndScreen, show: true });
      resetTimer();
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
      {/* {!isRunning && (
        <button className="btn btn-accept btn-lg" onClick={startTimer}>
          <BsFillPlayFill />
        </button>
      )} */}
      {/* {isRunning && (
        <button className="btn btn-warning btn-lg" onClick={pauseTimer}>
          <BsPauseFill />
        </button>
      )}{" "}
      <button className="btn btn-danger btn-lg" onClick={stopTimer}>
        <BsStopFill />
      </button> */}
    </div>
  );
}
