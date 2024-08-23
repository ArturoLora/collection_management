const connection = require('../config/db');

// Collection model
const Collection = {
    create: (data, callback) => {
        const { name, description, topic, imageUrl, userId } = data;
        const query = `INSERT INTO collections (name, description, topic, image_url, user_id) VALUES (?, ?, ?, ?, ?)`;
        connection.query(query, [name, description, topic, imageUrl, userId], callback);
    },

    findByUserId: (userId, callback) => {
        const query = `
            SELECT 
                collections.*, 
                items.id AS item_id, 
                items.name AS item_name, 
                items.description AS item_description 
            FROM 
                collections
            LEFT JOIN 
                items ON collections.id = items.collection_id
            WHERE 
                collections.user_id = ?
        `;
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);

            const collectionsMap = results.reduce((map, row) => {
                if (!map[row.id]) {
                    map[row.id] = { ...row, items: [] };
                }
                if (row.item_id) {
                    map[row.id].items.push({
                        id: row.item_id,
                        name: row.item_name,
                        description: row.item_description
                    });
                }
                return map;
            }, {});

            callback(null, Object.values(collectionsMap));
        });
    },

    findById: (id, callback) => {
        connection.query('SELECT * FROM collections WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    findTop: (callback) => {
        const query = `
            SELECT 
                collections.id,
                collections.name,
                collections.description,
                collections.topic,
                collections.image_url,
                collections.user_id,
                COUNT(items.id) AS number_of_items
            FROM 
                collections
            LEFT JOIN 
                items ON collections.id = items.collection_id
            GROUP BY 
                collections.id
            ORDER BY 
                number_of_items DESC
            LIMIT 5
        `;
        connection.query(query, callback);
    },

    search: (query, callback) => {
        const sql = 'SELECT * FROM collections WHERE name LIKE ?';
        connection.query(sql, [`%${query}%`], callback);
    },

    deleteById: (id, callback) => {
        connection.query('DELETE FROM items WHERE collection_id = ?', [id], (error) => {
            if (error) return callback(error);

            connection.query('DELETE FROM collections WHERE id = ?', [id], callback);
        });
    }
};

module.exports = Collection;
