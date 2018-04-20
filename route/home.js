const express = require('express');
const route = express.Router();

// welcome page
route.get('/', (req, res) => {
    return res.status(200).send('Welcome to Vidly');
});


module.exports = route;