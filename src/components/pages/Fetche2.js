import React, { useState } from 'react';
import { auth } from '../../firebase-config';
import { Form, Button, Alert, Card } from 'react-bootstrap'
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import back from '../../images/distibution.jpg'
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
             <div id="container"  style={{backgroundImage:`url(${back})`,height:'100vh',
    width: '100vw',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center'
}}>
                <div className="p-4 box" style={{width:'40%',height:'35%',marginTop:'200px',marginLeft:'10px', border: '1px solid',
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
                                style={{width:'40%',height:'33px',fontSize:'17px',marginTop:'10px',}}
                            />
                        </div>
                        <Button className='w-100 mb-4'style={{ backgroundColor:'#4c8bf5',
  color:'black',
  fontSize:'15px',
  padding: '10px 2px',
  borderRadius: '5px',
  margin: '10px 0px',
  width:'150px'
 }} type="submit">Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to="/">Sign Up</Link> or
                        <Link to='/'> Log In</Link>
                    </div>

                </div>
            </div>
        </>
    );
};
