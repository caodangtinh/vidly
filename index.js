const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('config');
const genres = require('./route/genres');
const home = require('./route/home');
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Enable Morgan');
}

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

// server information
// const PORT = process.env.PORT || 3000;
const PORT = config.get('port');
app.listen(PORT, () => {
    console.log(`Server starting at ${PORT} ...`);
});