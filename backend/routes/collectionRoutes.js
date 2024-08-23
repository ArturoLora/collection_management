const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// Create a new collection
router.post('/collections', (req, res) => {
    const { name, description, topic, imageUrl, userId } = req.body;
    if (!name || !description || !topic || !imageUrl || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    Collection.create({ name, description, topic, imageUrl, userId }, (error, results) => {
        if (error) return res.status(500).json({ message: 'Error creating collection' });
        res.status(201).json({ id: results.insertId, name, description, topic, imageUrl, userId });
    });
});

// Delete a collection
router.delete('/collections/:collectionId', (req, res) => {
    const { collectionId } = req.params;
    if (!collectionId) return res.status(400).json({ message: 'Collection ID is required' });

    Collection.deleteById(collectionId, (error, results) => {
        if (error) return res.status(500).json({ message: 'Error deleting collection' });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Collection not found' });
        res.status(200).json({ message: 'Collection deleted successfully' });
    });
});

// Get top collections
router.get('/collections/top', (req, res) => {
    Collection.findTop((err, collections) => {
        if (err) return res.status(500).json({ message: 'Error getting top collections' });
        res.status(200).json(collections);
    });
});

// Search collections
router.get('/search/collections', (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: 'Search term is required' });

    Collection.search(query, (err, collections) => {
        if (err) return res.status(500).json({ message: 'Error searching collections' });
        res.status(200).json(collections);
    });
});

// Get collection by ID
router.get('/collections/:collectionId', (req, res) => {
    const { collectionId } = req.params;
    if (!collectionId) return res.status(400).json({ message: 'Collection ID is required' });

    Collection.findById(collectionId, (err, collection) => {
        if (err) return res.status(500).json({ message: 'Error getting collection' });
        if (!collection) return res.status(404).json({ message: 'Collection not found' });
        res.status(200).json(collection);
    });
});

// Get collections by user ID
router.get('/collections/user/:userId', (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    Collection.findByUserId(userId, (err, collections) => {
        if (err) return res.status(500).json({ message: 'Error getting collections' });
        res.status(200).json(collections);
    });
});

module.exports = router;
