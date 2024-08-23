require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

// Set up the database connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');

  // Insert data into the users table, explicitly setting role to 'user'
  const insertUsers = 'INSERT INTO users (username, email, password, role) VALUES ?';
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push([faker.person.firstName() + faker.person.lastName(), faker.internet.email(), faker.internet.password(), 'user']);
  }
  connection.query(insertUsers, [users], (err, result) => {
    if (err) throw err;
    console.log('Users inserted:', result.affectedRows);

    // Insert data into the collections table
    const insertCollections = 'INSERT INTO collections (name, description, topic, image_url, user_id) VALUES ?';
    const collections = [];
    for (let i = 0; i < 5; i++) {
      collections.push([faker.commerce.productName(), faker.lorem.paragraph(), faker.commerce.department(), faker.image.imageUrl(), faker.datatype.number({ min: 1, max: 10 })]);
    }
    connection.query(insertCollections, [collections], (err, result) => {
      if (err) throw err;
      console.log('Collections inserted:', result.affectedRows);

      // Insert data into the items table
      const insertItems = 'INSERT INTO items (name, description, collection_id, tags) VALUES ?';
      const items = [];
      for (let i = 0; i < 20; i++) {
        items.push([faker.commerce.productName(), faker.lorem.paragraph(), faker.datatype.number({ min: 1, max: 5 }), faker.lorem.words(3)]);
      }
      connection.query(insertItems, [items], (err, result) => {
        if (err) throw err;
        console.log('Items inserted:', result.affectedRows);

        // Insert data into the comments table
        const insertComments = 'INSERT INTO comments (item_id, user_id, text) VALUES ?';
        const comments = [];
        for (let i = 0; i < 30; i++) {
          comments.push([faker.datatype.number({ min: 1, max: 20 }), faker.datatype.number({ min: 1, max: 10 }), faker.lorem.sentence()]);
        }
        connection.query(insertComments, [comments], (err, result) => {
          if (err) throw err;
          console.log('Comments inserted:', result.affectedRows);

          // Insert data into the likes table
          const insertLikes = 'INSERT INTO likes (item_id, user_id) VALUES ?';
          const likes = [];
          for (let i = 0; i < 20; i++) {
            likes.push([faker.datatype.number({ min: 1, max: 20 }), faker.datatype.number({ min: 1, max: 10 })]);
          }
          connection.query(insertLikes, [likes], (err, result) => {
            if (err) throw err;
            console.log('Likes inserted:', result.affectedRows);

            connection.end();
          });
        });
      });
    });
  });
});
