//db.js
const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'collection_management',
    port: process.env.DB_PORT || 3306 // Puerto por defecto para MySQL
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});


connection.on('error', (err) => {
    console.error('Database connection error:', err);
    // You can add additional error handling logic here
});

module.exports = connection;
