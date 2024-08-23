const connection = require('../config/db');

// Comments model
const Comments = {
    getComments: (itemId, callback) => {
        const query = `
            SELECT comments.*, users.username AS userName 
            FROM comments 
            JOIN users ON comments.user_id = users.id 
            WHERE item_id = ?`;
        connection.query(query, [itemId], callback);
    },

    addComment: (itemId, userId, text, callback) => {
        const query = 'INSERT INTO comments (item_id, user_id, text) VALUES (?, ?, ?)';
        connection.query(query, [itemId, userId, text], (err, results) => {
            if (err) return callback(err);

            const newCommentId = results.insertId;
            connection.query(`
                SELECT comments.*, users.username AS userName 
                FROM comments 
                JOIN users ON comments.user_id = users.id 
                WHERE comments.id = ?`, [newCommentId], (err, [newComment]) => {
                if (err) return callback(err);
                callback(null, newComment);
            });
        });
    }
};

module.exports = Comments;
