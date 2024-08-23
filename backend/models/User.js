const connection = require('../config/db');
const bcrypt = require('bcrypt');
const Collection = require('./collection');

// User model
const User = {
    create: (userData, callback) => {
        const { username, email, password, role = 'user' } = userData;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        connection.query(query, [username, email, hashedPassword, role], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM users';
        connection.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findCollectionsByUserId: (userId, callback) => {
        Collection.findByUserId(userId, callback);
    },

    delete: (userId, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = User;
