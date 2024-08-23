import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, ListGroup, Alert, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function ItemPage() {
    const [item, setItem] = useState(null);
    const [collection, setCollection] = useState(null);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const { itemId } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch item data
        api.get(`/items/${itemId}`)
            .then(response => {
                setItem(response.data);
                if (response.data.collection_id) {
                    return api.get(`/collections/${response.data.collection_id}`);
                }
                return null;
            })
            .then(response => {
                if (response) {
                    setCollection(response.data);
                }
            })
            .catch(() => setError('Failed to fetch data.'));

        // Fetch item likes
        api.get(`/items/${itemId}/likes`)
            .then(response => setLikes(response.data))
            .catch(() => setError('Failed to fetch likes.'));

        // Fetch item comments
        api.get(`/items/${itemId}/comments`)
            .then(response => setComments(response.data))
            .catch(() => setError('Failed to fetch comments.'));
    }, [itemId]);

    function handleLike() {
        if (!token) {
            alert('You must be logged in to like this item.');
            return;
        }

        api.post(`/items/${itemId}/likes`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setLikes(prevLikes => [...prevLikes, { item_id: itemId, user_id: token }]);
        })
        .catch(() => setError('Failed to add like.'));
    }

    function handleCommentSubmit(event) {
        event.preventDefault();
        if (!token) {
            alert('You must be logged in to comment.');
            return;
        }

        api.post(`/items/${itemId}/comments`, { text: newComment }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setComments(prevComments => [...prevComments, response.data]);
            setNewComment('');
        })
        .catch(() => setError('Failed to add comment.'));
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            {item ? (
                <>
                    <h1 className="text-center mb-4">{item.name}</h1>
                    {item.description && <p className="text-center mb-4">{item.description}</p>}
                    
                    {collection && (
                        <div className="mb-4">
                            <h2>Collection</h2>
                            <Link to={`/collections/${collection.id}`} className="btn btn-primary">
                                View Collection: {collection.name}
                            </Link>
                        </div>
                    )}

                    <h2>Tags</h2>
                    {item.tags ? (
                        <p>{item.tags}</p>
                    ) : (
                        <Alert variant="info">No tags for this item.</Alert>
                    )}

                    <h2>Likes</h2>
                    <p>{likes.length} Likes</p>
                    <Button onClick={handleLike} variant="outline-primary">Like</Button>

                    <h2>Comments</h2>
                    {comments.length > 0 ? (
                        <ListGroup>
                            {comments.map(comment => (
                                <ListGroup.Item key={comment.id}>
                                    <strong>{comment.userName}</strong>: {comment.text}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <Alert variant="info">No comments for this item.</Alert>
                    )}

                    {token && (
                        <Form onSubmit={handleCommentSubmit} className="mt-4">
                            <Form.Group controlId="formComment">
                                <Form.Label>Add a Comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary">Comment</Button>
                        </Form>
                    )}
                </>
            ) : (
                <Alert variant="info">Loading item...</Alert>
            )}
        </Container>
    );
}

export default ItemPage;
