const notes = require('express').Router();
const { readFile, appendFile, writeFile } = require('../helpers/utils');

notes.get('/', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

