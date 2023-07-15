import React, { useState } from "react";
import './Phone.css'
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { SubmitButton } from "./accountBox/common";
// import { useUserAuth } from "../context/UserAuthContext";
import { UserAuth } from "../context/AuthContext";
import back from "../images/distibution.jpg"
const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } =UserAuth()
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/account");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div id="container"  style={{backgroundImage:`url(${back})`,height:'100vh',
    width: '100vw',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center'
}}>
      <div className="left" style={{}}>
      
      <div className="p-4 box" style={{width:'70%',height:'30%',marginTop:'200px',marginLeft:'10px', border: '1px solid',
        padding: '10px',
         
        /* box-shadow: h-offset v-offset blur */
        boxShadow: '5px 10px 10px',borderRadius:'10px'}}>
        <h2 className="mb-3"> Phone Authentication</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none"
 }}>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{}}>
            <PhoneInput
              defaultCountry="ET"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
              style={{width:'50%'}}
            />
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
            <button type="submit" style={{ backgroundColor:' #24a0e',
  color:'black',
  fontSize:'20px',
  padding: '10px 60px',
  borderRadius: '5px',
  margin: '10px 0px',
 }}>Cancel</button>
            </Link>
            &nbsp;
            <button type="submit" style={{ backgroundColor:'#4c8bf5',
  color:'black',
  fontSize:'20px',
  padding: '10px 2px',
  borderRadius: '5px',
  margin: '10px 0px',
  width:'200px'
 }}>send Otp</button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
            <button type="submit" style={{ backgroundColor:' #24a0e',
  color:'black',
  fontSize:'20px',
  padding: '10px 60px',
  borderRadius: '5px',
  margin: '10px 0px',
 }}>Cancel</button>
            </Link>
            &nbsp;
            <button type="submit" style={{ backgroundColor:'#4c8bf5',
  color:'black',
  fontSize:'20px',
  padding: '10px 2px',
  borderRadius: '5px',
  margin: '10px 0px',
  width:'200px'
 }}>verify</button>
          </div>
        </Form>
      </div>
      </div>
      </div>
    <div className="right"></div>
    </>
  );
};

export default PhoneSignUp;