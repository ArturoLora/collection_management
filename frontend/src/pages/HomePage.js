// HomePage.js

import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Form, Button, ListGroup, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
    const [items, setItems] = useState([]);
    const [collections, setCollections] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResultsItems, setSearchResultsItems] = useState([]);
    const [searchResultsCollections, setSearchResultsCollections] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('dark-mode');

        const token = localStorage.getItem('token');
        if (token) {
            api.get('/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUserRole(response.data.role);
                setIsAuthenticated(true); 
            })
            .catch(error => {
                console.error('Error fetching user role:', error);
                navigate('/login');
            });
        }

        api.get('/items/recent')
           .then(response => setItems(response.data))
           .catch(error => console.error('Error fetching recent items:', error));

        api.get('/collections/top')
           .then(response => setCollections(response.data))
           .catch(error => console.error('Error fetching top collections:', error));

        return () => {
            document.body.classList.remove('dark-mode');
        };
    }, [navigate]);

    function handleSearch(event) {
        event.preventDefault();
        api.get(`/search/items?q=${searchQuery}`)
           .then(response => setSearchResultsItems(response.data))
           .catch(error => console.error('Error searching items:', error));

        api.get(`/search/collections?q=${searchQuery}`)
           .then(response => setSearchResultsCollections(response.data))
           .catch(error => console.error('Error searching collections:', error));
    }

    function handleAccountPage() {
        if (userRole === 'admin') {
            navigate('/admin');
        } else {
            navigate('/user');
        }
    }

    function handleExportUsers() {
        api.get('/users/export', { responseType: 'blob' })
           .then(response => {
               const url = window.URL.createObjectURL(new Blob([response.data]));
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'users_export.csv');
               document.body.appendChild(link);
               link.click();
           })
           .catch(error => console.error('Error exporting users:', error));
    }

    return (
        <>
            <Navbar bg="transparent" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Content Manager</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link to="/signup">
                            <Button variant="outline-light" className="mx-2">Sign Up</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline-light" className="mx-2">Log In</Button>
                        </Link>
                        {isAuthenticated && (
                            <Button onClick={handleAccountPage} variant="outline-light" className="mx-2">
                                Account Page
                            </Button>
                        )}
                        {isAuthenticated && userRole === 'admin' && (
                            <Button onClick={handleExportUsers} variant="outline-light" className="mx-2">
                                Export Users
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <h1 className="text-center mb-4">Home</h1>
                <Form onSubmit={handleSearch} className="mb-4">
                    <Form.Group controlId="searchQuery">
                        <Form.Control 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search items or collections..." 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                        Search
                    </Button>
                </Form>

                <div className="row">
                    <div className="col-md-6">
                        <h2>Search Results</h2>
                        {searchResultsItems.length > 0 && (
                            <>
                                <h3>Items</h3>
                                <ListGroup className="mb-4">
                                    {searchResultsItems.map(result => (
                                        <ListGroup.Item key={result.id}>
                                            <Link to={`/items/${result.id}`}>{result.name}</Link>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </>
                        )}
                        {searchResultsCollections.length > 0 && (
                            <>
                                <h3>Collections</h3>
                                <ListGroup className="mb-4">
                                    {searchResultsCollections.map(result => (
                                        <ListGroup.Item key={result.id}>
                                            <Link to={`/collections/${result.id}`}>{result.name}</Link>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </>
                        )}
                        {searchResultsItems.length === 0 && searchResultsCollections.length === 0 && (
                            <Alert variant="info">
                                No results found for "{searchQuery}".
                            </Alert>
                        )}
                    </div>

                    <div className="col-md-6">
                        <h2>Recent Items</h2>
                        <ListGroup className="mb-4">
                            {items.map(item => (
                                <ListGroup.Item key={item.id}>
                                    <Link to={`/items/${item.id}`}>{item.name}</Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <h2>Top Collections</h2>
                        <ListGroup className="mb-4">
                            {collections.map(collection => (
                                <ListGroup.Item key={collection.id}>
                                    <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HomePage;
