const express = require('express');
const router = express.Router();
const Likes = require('../models/likes');
const { authenticateToken } = require('../middleware/auth');

// Get likes for an item
router.get('/items/:itemId/likes', (req, res) => {
    const { itemId } = req.params;
    Likes.getLikes(itemId, (err, likes) => {
        if (err) return res.status(500).json({ error: 'Unable to get likes.' });
        res.json(likes);
    });
});

// Add a like (requires authentication)
router.post('/items/:itemId/likes', authenticateToken, (req, res) => {
    const { itemId } = req.params;
    const userId = req.user.id;
    Likes.addLike(itemId, userId, (err) => {
        if (err) return res.status(500).json({ error: 'Unable to add like.' });
        res.status(201).send();
    });
});

module.exports = router;
