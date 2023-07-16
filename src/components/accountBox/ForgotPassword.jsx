import React, { useState } from 'react';
import { auth } from '../../firebase-config';
import { Form, Button, Alert, Card } from 'react-bootstrap'
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
            <Card>
                <Card.Body>
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
                            />
                        </div>
                        <Button className='w-100 mb-4' type="submit">Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to="/">Sign Up</Link> or
                        <Link to='/'> Log In</Link>
                    </div>

                </Card.Body>
            </Card>
        </>
    );
};
