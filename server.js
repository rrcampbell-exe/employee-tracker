const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001
const app = express();

// Middleware for Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Point to apiRoutes
app.use('/api', apiRoutes);

// Default response for other requests (Not Found error)
app.use((req, res) => {
    res.status(404).end();
});

// Start server on DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server now running on port ${PORT}!`)
    });
});