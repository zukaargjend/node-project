const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/vildy')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Failed to connect to MongoDB...'))

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));