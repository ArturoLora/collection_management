const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get recent items
router.get('/items/recent', (req, res) => {
    Item.findRecent((err, items) => {
        if (err) return res.status(500).send('Error getting recent items');
        res.status(200).json(items);
    });
});

// Search items
router.get('/search/items', (req, res) => {
    const query = req.query.q;
    Item.search(query, (err, items) => {
        if (err) return res.status(500).send('Error searching items');
        res.status(200).json(items);
    });
});

// Get item by ID
router.get('/items/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    Item.findById(itemId, (err, item) => {
        if (err) return res.status(500).send('Error getting item');
        if (!item) return res.status(404).send('Item not found');
        res.status(200).json(item);
    });
});

// Get items by collection ID
router.get('/items/collection/:collectionId', (req, res) => {
    const collectionId = req.params.collectionId;
    Item.findByCollectionId(collectionId, (err, items) => {
        if (err) return res.status(500).send('Error getting items');
        res.status(200).json(items);
    });
});

// Create an item
router.post('/items', (req, res) => {
    const { name, description, collection_id, tags } = req.body;
    if (!name || !collection_id) return res.status(400).send('Name and collection ID are required');

    Item.create({ name, description, collection_id, tags }, (err, result) => {
        if (err) return res.status(500).send('Error creating item');
        res.status(201).json({ id: result.insertId, name, description, collection_id, tags });
    });
});

// Delete an item by ID
router.delete('/items/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    Item.delete(itemId, (err, result) => {
        if (err) return res.status(500).send('Error deleting item');
        if (!result.affectedRows) return res.status(404).send('Item not found');
        res.status(200).send('Item deleted successfully');
    });
});

module.exports = router;
