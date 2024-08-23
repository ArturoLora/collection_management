const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { Parser } = require('json2csv');

// Route to export users with their collections and items to CSV
router.get('/users/export', (req, res) => {
    // Fetch all users from the database
    db.query('SELECT * FROM users', (userError, users) => {
        if (userError) {
            console.error('Error fetching users:', userError);
            return res.status(500).send('Error generating CSV file.');
        }

        // Array to store user data with collections and items
        const userExportData = [];

        // Recursive function to process each user
        const processUser = (index) => {
            if (index >= users.length) {
                // All users processed, generate the CSV
                try {
                    const fields = ['user_id', 'username', 'email', 'collection_id', 'collection_name', 'item_id', 'item_name'];
                    const parser = new Parser({ fields });

                    // Convert data to CSV format
                    const csv = parser.parse(userExportData);

                    // Set the response to download the CSV file
                    res.header('Content-Type', 'text/csv');
                    res.attachment('users_with_collections_and_items.csv');
                    res.send(csv);
                } catch (csvError) {
                    console.error('Error generating CSV:', csvError);
                    res.status(500).send('Error generating CSV file.');
                }
                return;
            }

            const user = users[index];

            // Fetch collections for the current user
            db.query('SELECT * FROM collections WHERE user_id = ?', [user.id], (collectionError, collections) => {
                if (collectionError) {
                    console.error('Error fetching collections:', collectionError);
                    return res.status(500).send('Error generating CSV file.');
                }

                // Process each collection for the user
                const collectionPromises = collections.map(collection => {
                    return new Promise((resolve, reject) => {
                        // Fetch items for the current collection
                        db.query('SELECT * FROM items WHERE collection_id = ?', [collection.id], (itemError, items) => {
                            if (itemError) {
                                console.error('Error fetching items:', itemError);
                                return reject(itemError);
                            }

                            // Add user, collection, and item data to the export array
                            items.forEach(item => {
                                userExportData.push({
                                    user_id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    collection_id: collection.id,
                                    collection_name: collection.name,
                                    item_id: item.id,
                                    item_name: item.name
                                });
                            });

                            resolve();
                        });
                    });
                });

                // Once all collections are processed, move to the next user
                Promise.all(collectionPromises)
                    .then(() => processUser(index + 1))
                    .catch(error => {
                        console.error('Error processing collections/items:', error);
                        res.status(500).send('Error generating CSV file.');
                    });
            });
        };

        // Start processing the first user
        processUser(0);
    });
});

module.exports = router;
