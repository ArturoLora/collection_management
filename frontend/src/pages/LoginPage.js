import React, { useState } from 'react';
import { Container, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
    
        api.post('/login', { email, password })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    navigate(response.data.role === 'admin' ? '/admin' : '/user');
                } else {
                    setError('Invalid credentials.');
                }
            })
            .catch(() => setError('Login error. Check your credentials.'));
    };

    return (
        <>
            <Navbar bg="transparent" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Login</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link to="/" className="btn btn-outline-light mx-2">Home</Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <h1 className="text-center mb-4">Login</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password" 
                            required 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-4">
                        Login
                    </Button>
                    <p className="mt-3">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </Form>
            </Container>
        </>
    );
}

export default LoginPage;
