const express = require('express');
const router = express.Router();
const Comments = require('../models/comments');
const { authenticateToken } = require('../middleware/auth');

// Get comments for a specific item
router.get('/items/:itemId/comments', (req, res) => {
    const { itemId } = req.params;
    Comments.getComments(itemId, (err, comments) => {
        if (err) return res.status(500).json({ error: 'Unable to retrieve comments.' });
        res.json(comments);
    });
});

// Add a new comment (requires authentication)
router.post('/items/:itemId/comments', authenticateToken, (req, res) => {
    const { itemId } = req.params;
    const { text } = req.body;
    const userId = req.user.id; // Get userId from token
    Comments.addComment(itemId, userId, text, (err, newComment) => {
        if (err) return res.status(500).json({ error: 'Unable to add comment.' });
        res.status(201).json(newComment);
    });
});

module.exports = router;
