import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Alert, Form, Navbar, Nav } from 'react-bootstrap';
import api from '../api';

function UserPage() {
    const [user, setUser] = useState(null);
    const [collections, setCollections] = useState([]);
    const [newCollection, setNewCollection] = useState({ name: '', description: '', topic: '', imageUrl: '' });
    const [newItem, setNewItem] = useState({ name: '', description: '', tags: '' });
    const [selectedCollectionId, setSelectedCollectionId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch user data and collections
        const fetchData = async () => {
            try {
                const userResponse = await api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } });
                setUser(userResponse.data);
                const collectionsResponse = await api.get('/collections', { headers: { Authorization: `Bearer ${token}` } });
                setCollections(collectionsResponse.data);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleCreateCollection = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await api.post('/collections', {
                ...newCollection,
                user_id: user?.id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCollections([...collections, response.data]);
            setNewCollection({ name: '', description: '', topic: '', imageUrl: '' });
        } catch (error) {
            console.error(error);
            setError('Error creating collection.');
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await api.post('/items', {
                ...newItem,
                collection_id: selectedCollectionId || undefined
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const response = await api.get('/collections', { headers: { Authorization: `Bearer ${token}` } });
            setCollections(response.data);
            setNewItem({ name: '', description: '', tags: '' });
            setSelectedCollectionId('');
        } catch (error) {
            console.error(error);
            setError('Error adding item.');
        }
    };

    const handleDeleteCollection = async (collectionId) => {
        const token = localStorage.getItem('token');
        try {
            const { data: { items = [] } } = await api.get(`/collections/${collectionId}`, { headers: { Authorization: `Bearer ${token}` } });
            await Promise.all(items.map(item => api.delete(`/items/${item.id}`, { headers: { Authorization: `Bearer ${token}` } })));
            await api.delete(`/collections/${collectionId}`, { headers: { Authorization: `Bearer ${token}` } });
            setCollections(prev => prev.filter(collection => collection.id !== collectionId));
        } catch (error) {
            console.error(error);
            setError('Error deleting collection.');
        }
    };

    const handleDeleteItem = (itemId, collectionId) => {
        const token = localStorage.getItem('token');
        api.delete(`/items/${itemId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setCollections(prev => 
                    prev.map(collection => 
                        collection.id === collectionId
                            ? { ...collection, items: collection.items.filter(item => item.id !== itemId) }
                            : collection
                    )
                );
            })
            .catch(error => {
                console.error(error);
                setError('Error deleting item.');
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="transparent" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>User Page</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link to="/" className="btn btn-outline-light mx-2">Home</Link>
                        <Button variant="outline-light" onClick={handleLogout} className="mx-2">Logout</Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <h1 className="text-center mb-4">User Page</h1>
                {user ? (
                    <div className="text-center mb-4">
                        <h2>Profile</h2>
                        <p><strong>Name:</strong> {user.username || 'Unavailable'}</p>
                        <p><strong>Email:</strong> {user.email || 'Unavailable'}</p>
                    </div>
                ) : (
                    <Alert variant="info" className="text-center">Loading profile...</Alert>
                )}

                <Row>
                    <Col md={4}>
                        <h2 className="mb-4">Create New Collection</h2>
                        <Form onSubmit={handleCreateCollection}>
                            <Form.Group controlId="collectionName">
                                <Form.Label>Collection Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter collection name"
                                    value={newCollection.name}
                                    onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="collectionDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter collection description"
                                    value={newCollection.description}
                                    onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="collectionTopic">
                                <Form.Label>Topic</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter collection topic"
                                    value={newCollection.topic}
                                    onChange={(e) => setNewCollection({ ...newCollection, topic: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="collectionImageUrl">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter collection image URL"
                                    value={newCollection.imageUrl}
                                    onChange={(e) => setNewCollection({ ...newCollection, imageUrl: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Create Collection</Button>
                        </Form>

                        <h2 className="mt-5 mb-4">Add Item to Collection</h2>
                        <Form onSubmit={handleAddItem}>
                            <Form.Group controlId="selectCollection">
                                <Form.Label>Select Collection</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedCollectionId}
                                    onChange={(e) => setSelectedCollectionId(e.target.value)}
                                    required
                                >
                                    <option value="">Select a collection</option>
                                    {collections.map(collection => (
                                        <option key={collection.id} value={collection.id}>{collection.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="itemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter item name"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="itemDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter item description"
                                    value={newItem.description}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemTags">
                                <Form.Label>Tags (comma separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., tag1, tag2"
                                    value={newItem.tags}
                                    onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Add Item</Button>
                        </Form>

                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Col>

                    <Col md={8}>
                        <h2 className="mb-4">My Collections</h2>
                        {collections.length > 0 ? (
                            <ListGroup>
                                {collections.map(collection => (
                                    <ListGroup.Item key={collection.id} className="mb-2">
                                        <Row>
                                            <Col md={9}>
                                                <h5>{collection.name}</h5>
                                                <p>{collection.description}</p>
                                                <p><strong>Topic:</strong> {collection.topic}</p>
                                                {collection.items.length > 0 && (
                                                    <>
                                                        <h6>Items:</h6>
                                                        <ListGroup>
                                                            {collection.items.map(item => (
                                                                <ListGroup.Item key={item.id}>
                                                                    <Row>
                                                                        <Col md={9}>
                                                                            <strong>{item.name}</strong>
                                                                            <p>{item.description}</p>
                                                                            <p><strong>Tags:</strong> {item.tags}</p>
                                                                        </Col>
                                                                        <Col md={3} className="text-right">
                                                                            <Button
                                                                                variant="danger"
                                                                                size="sm"
                                                                                onClick={() => handleDeleteItem(item.id, collection.id)}
                                                                            >
                                                                                Delete Item
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    </>
                                                )}
                                            </Col>
                                            <Col md={3} className="text-right">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteCollection(collection.id)}
                                                >
                                                    Delete Collection
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No collections available. Create one to get started.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserPage;
