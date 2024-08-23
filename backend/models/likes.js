const connection = require('../config/db');

// Likes model
const Likes = {
    getLikes: (itemId, callback) => {
        const query = 'SELECT * FROM likes WHERE item_id = ?';
        connection.query(query, [itemId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    addLike: (itemId, userId, callback) => {
        const query = 'INSERT INTO likes (item_id, user_id) VALUES (?, ?)';
        connection.query(query, [itemId, userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Likes;
