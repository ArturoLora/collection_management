const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const Collection = require('../models/collection');
const connection = require('../config/db');

// Get all users (admin only)
router.get('/admin/users', authenticateToken, authorizeAdmin, (req, res) => {
    User.findAll((err, users) => {
        if (err) return res.status(500).send('Error getting users');
        res.status(200).json(users);
    });
});

// Create a new user
router.post('/users', (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('Username, email, and password are required.');
    }

    User.create({ username, email, password, role }, (err) => {
        if (err) return res.status(500).send('Error creating user');
        res.status(201).send('User created successfully');
    });
});

// Get user by email
router.get('/users/email/:email', (req, res) => {
    User.findByEmail(req.params.email, (err, user) => {
        if (err) return res.status(500).send('Error getting user');
        if (!user) return res.status(404).send('User not found.');
        res.status(200).json(user);
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send('Error getting user');
        if (!user) return res.status(404).send('User not found.');

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Error comparing passwords');
            if (!isMatch) return res.status(401).send('Incorrect password.');

            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token, role: user.role });
        });
    });
});

// Get current user
router.get('/users/me', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [req.user.id], (error, results) => {
        if (error) return res.status(500).send('Error getting user');
        if (results.length === 0) return res.status(404).send('User not found.');
        res.status(200).json(results[0]);
    });
});

// Get user collections
router.get('/collections', authenticateToken, (req, res) => {
    User.findCollectionsByUserId(req.user.id, (err, collections) => {
        if (err) return res.status(500).send('Error getting collections');
        res.status(200).json(collections);
    });
});

// Delete a user (admin only)
router.delete('/admin/users/:id', authenticateToken, authorizeAdmin, (req, res) => {
    const { id } = req.params;

    // Delete likes for items of the user
    const deleteLikesQuery = 'DELETE FROM likes WHERE item_id IN (SELECT id FROM items WHERE collection_id IN (SELECT id FROM collections WHERE user_id = ?))';
    connection.query(deleteLikesQuery, [id], (err) => {
        if (err) return res.status(500).send('Error deleting likes');

        // Delete comments of the user
        const deleteCommentsQuery = 'DELETE FROM comments WHERE item_id IN (SELECT id FROM items WHERE collection_id IN (SELECT id FROM collections WHERE user_id = ?))';
        connection.query(deleteCommentsQuery, [id], (err) => {
            if (err) return res.status(500).send('Error deleting comments');

            // Delete items associated with the user's collections
            const deleteItemsQuery = 'DELETE FROM items WHERE collection_id IN (SELECT id FROM collections WHERE user_id = ?)';
            connection.query(deleteItemsQuery, [id], (err) => {
                if (err) return res.status(500).send('Error deleting items');

                // Delete collections of the user
                const deleteCollectionsQuery = 'DELETE FROM collections WHERE user_id = ?';
                connection.query(deleteCollectionsQuery, [id], (err) => {
                    if (err) return res.status(500).send('Error deleting collections');

                    // Finally, delete the user
                    const deleteUserQuery = 'DELETE FROM users WHERE id = ?';
                    connection.query(deleteUserQuery, [id], (err) => {
                        if (err) return res.status(500).send('Error deleting user');
                        res.status(200).send('User and their collections successfully deleted');
                    });
                });
            });
        });
    });
});

module.exports = router;
