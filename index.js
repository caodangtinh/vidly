const express = require('express');
const app = express();
const morgan = require('morgan');
const genres = require('./route/genres');
const home = require('./route/home');

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

// server information
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server starting at ${PORT} ...`);
});