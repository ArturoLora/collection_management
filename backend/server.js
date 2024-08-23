// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Configure environment variables
dotenv.config();

// Create an Express instance
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Server port
const PORT = process.env.PORT || 5000;

// Test route
app.get('/', (req, res) => res.send('Server is running'));

// Import routes
const collectionRoutes = require('./routes/collectionRoutes');
const itemRoutes = require('./routes/itemRoutes');
const likesRoutes = require('./routes/likesRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const userRoutes = require('./routes/userRoutes');
const exportRoutes = require('./routes/export');


// Use routes
app.use('/api', collectionRoutes);
app.use('/api', itemRoutes);
app.use('/api', likesRoutes);
app.use('/api', commentsRoutes);
app.use('/api', userRoutes);
app.use('/api', exportRoutes);


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
