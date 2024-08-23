import React, { useState } from 'react';
import { Container, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; 

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!username || !email || !password) {
            setError('All fields are required.');
            return;
        }
    
        api.post('/users', { username, email, password, role })
            .then(() => {
                setSuccess(true);
                setError(null);
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch(() => {
                setError('Error registering user.');
            });
    };

    return (
        <>
            <Navbar bg="transparent" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Register</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link to="/" className="btn btn-outline-light mx-2">Home</Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <h1 className="text-center mb-4">Register</h1>
                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Registration successful. Redirecting to login...</Alert>}
                    
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter your username" 
                        />
                    </Form.Group>

                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password" 
                        />
                    </Form.Group>

                    <Form.Group controlId="role" className="mt-3">
                        <Form.Check 
                            type="checkbox" 
                            label="Register as Admin" 
                            checked={role === 'admin'} 
                            onChange={(e) => setRole(e.target.checked ? 'admin' : 'user')}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-4">
                        Register
                    </Button>
                </Form>

                <div className="mt-3 text-center">
                    <Link to="/login">Already have an account? Log in here</Link>
                </div>
            </Container>
        </>
    );
}

export default SignupPage;
