const connection = require('../config/db');

// Item model
const Item = {
    create: (itemData, callback) => {
        const { name, description, collection_id, tags } = itemData;
        const query = 'INSERT INTO items (name, description, collection_id, tags) VALUES (?, ?, ?, ?)';

        connection.query(query, [name, description, collection_id, tags], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findByCollectionId: (collectionId, callback) => {
        const query = 'SELECT * FROM items WHERE collection_id = ?';
        connection.query(query, [collectionId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findById: (itemId, callback) => {
        const query = 'SELECT * FROM items WHERE id = ?';
        connection.query(query, [itemId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    findRecent: (callback) => {
        const query = 'SELECT * FROM items ORDER BY created_at DESC LIMIT 10';
        connection.query(query, (err, results) => {
            if (err) return callback(err);
            if (!results.length) console.log('No recent items found.');
            callback(null, results);
        });
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM items';
        connection.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    search: (query, callback) => {
        const searchQuery = `%${query}%`;
        const sql = 'SELECT * FROM items WHERE name LIKE ?';
        connection.query(sql, [searchQuery], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    delete: (itemId, callback) => {
        const query = 'DELETE FROM items WHERE id = ?';
        connection.query(query, [itemId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Item;
