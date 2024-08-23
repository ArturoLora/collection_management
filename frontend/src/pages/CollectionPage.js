import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, ListGroup, Alert, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function CollectionPage() {
    const [collection, setCollection] = useState(null);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const { collectionId } = useParams();

    useEffect(() => {
        document.body.classList.add('dark-mode');

        // Fetch collection data
        api.get(`/collections/${collectionId}`)
            .then(response => setCollection(response.data))
            .catch(() => setError('Failed to fetch collection.'));

        // Fetch items in the collection
        api.get(`/items/collection/${collectionId}`)
            .then(response => setItems(response.data))
            .catch(() => setError('Failed to fetch items.'));

        return () => {
            document.body.classList.remove('dark-mode');
        };
    }, [collectionId]);

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">{collection?.name}</h1>
            {collection?.description && <p className="text-center mb-4">{collection.description}</p>}
            {collection?.image_url && (
                <div className="text-center mb-4">
                    <img
                        src={collection.image_url}
                        alt={collection.name}
                        className="img-fluid"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>
            )}

            <h2>Items in this collection</h2>
            <ListGroup className="mb-4">
                {items.length > 0 ? (
                    items.map(item => (
                        <ListGroup.Item key={item.id}>
                            <Link to={`/items/${item.id}`}>{item.name}</Link>
                        </ListGroup.Item>
                    ))
                ) : (
                    <Alert variant="info">No items in this collection.</Alert>
                )}
            </ListGroup>
        </Container>
    );
}

export default CollectionPage;
