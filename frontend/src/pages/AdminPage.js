import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Alert, Navbar, Nav, Form } from 'react-bootstrap';
import api from '../api';

function AdminPage() {
    const [admin, setAdmin] = useState(null);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch admin data
        api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setAdmin(response.data))
            .catch(() => navigate('/login'));

        // Fetch user list
        api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(() => setError('Error fetching user list.'));
    }, [navigate]);

    const handleDeleteUser = (userId) => {
        const token = localStorage.getItem('token');

        api.delete(`/admin/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
                setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
            })
            .catch(() => setError('Error deleting user.'));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredUsers(users.filter(user =>
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        ));
    };

    return (
        <>
            <Navbar bg="transparent" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Admin Page</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link to="/" className="btn btn-outline-light mx-2">Home</Link>
                        <Button variant="outline-light" onClick={handleLogout} className="mx-2">Logout</Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <h1 className="text-center mb-4">Welcome, {admin?.username}</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Row className="mb-4">
                    <Col md={{ span: 8, offset: 2 }}>
                        <Form.Control
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <ListGroup>
                            {filteredUsers.map(user => (
                                <ListGroup.Item key={user.id}>
                                    {user.username} ({user.email})
                                    <Button variant="danger" className="float-right" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminPage;
