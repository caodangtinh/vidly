const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());
const arr = [
    {
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Adventure'
    },
    {
        id: 3,
        name: 'Comedy'
    },
    {
        id: 4,
        name: 'Crime'
    },
    {
        id: 5,
        name: 'Drama'
    },
    {
        id: 6,
        name: 'Science fiction'
    }
];

// Express method

// welcome page
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to Vidly');
});

// get all gener
app.get('/api/genres', (req, res) => {
    return res.status(200).send(arr);
});

// get genre by id
app.get('/api/genres/:id', (req, res) => {
    const id = req.params.id;
    const found = findById(id);
    if (!found)
        return res.status(404).send(`The given id ${id} doesn\'t exist`);

    return res.status(200).send(found);
});

// create new genre
app.post('/api/genres', (req, res) => {
    const id = arr.length + 1;
    // validate
    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = {
        id: id,
        name: req.body.name
    };
    arr.push(genre);
    res.status(201).send(genre);
});

// update genre
app.put('/api/genres/:id', (req, res) => {
    const id = req.params.id;
    // check exist
    const found = findById(id);
    if (!found) return res.status(404).send(`The given id ${id} doesn\'t exist`);
    // validate
    const { error } = validateInput(res.body);
    if (error) return res.status(400).send(error.details[0].message);
    // update
    found.name = req.body.name;
    res.status(200).send(found);
});

// delete
app.delete('/api/genres/:id', (req, res) => {
    const id = req.params.id;
    // check exist
    const found = findById(id);
    if (!found) return res.status(404).send(`The given id ${id} doesn\'t exist`);
    // validate
    const { error } = validateInput(res.body);
    if (error) return res.status(400).send(error.details[0].message);
    // delete
    const index = arr.indexOf(found);
    const remove = arr.splice(index, 1);
    res.status(200).send(remove);
});

/**
 * util method
 */
// validate input information
function validateInput(gener) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(gener, schema);
}
//find by id
function findById(id) {
    const found = arr.find(g => g.id === parseInt(id));
    return found;
};

// server information
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server starting at ${PORT} ...`);
});