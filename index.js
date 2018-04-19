const express = require('express');
const app = express();
const morgan = require('morgan');
const genres = require('./route/genres');

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/genres', genres);

// welcome page
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to Vidly');
});

// server information
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server starting at ${PORT} ...`);
});