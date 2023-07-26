import React, { useState } from 'react';
import { auth } from '../../firebase-config';
import { Form, Button, Alert, Card } from 'react-bootstrap'
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import back from '../../images/forgotlottie.gif'
export function ResetPassword () {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email)
            setSuccessMessage('Password reset email sent. Please check your inbox.');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
           <div style={{backgroundColor:''}}>
     <div   style={{backgroundImage:`url(${back})`,height:'100vh',
width: '40%',
backgroundSize:'contain',
backgroundRepeat:'no-repeat',
backgroundPosition:'center',
marginRight:"2000px",
marginTop:'100px'

}}>
       <div  style={{width:'80%',height:'50vh',backgroundColor:'white',mariginBottom:'10px',marginTop:'150px',marginLeft:'750px', border: '1px solid',
padding: '10px',

/* box-shadow: h-offset v-offset blur */

boxShadow: '5px 10px 10px',borderRadius:'10px'}}>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {errorMessage && <Alert variant="success">{errorMessage}</Alert>}
                    <Form onSubmit={handleResetPassword}>
                        <div>
                            <label className="text-center mb-3" htmlFor="email">Email:</label>
                            <input
                                className=''
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{width:'50%',height:'33px',fontSize:'17px',marginTop:'10px',}}
                            />
                        </div>
                        <Button className='w-100 mb-4'style={{ backgroundColor:'#783584',
  color:'white',
  fontSize:'15px',
  padding: '10px 2px',
  borderRadius: '8px',
borderColor:'transparent',
  marginLeft: '50px',
  marginTop:'20px',
  width:'200px'
 }} type="submit">Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-2' style={{ marginLeft: '50px',
  marginTop:'20px',}}>
                        <Link to="/">Sign Up</Link> or
                        <Link to='/'> Log In</Link>
                    </div>
                    </div>

                </div>
            </div>
        </>
    );
};
