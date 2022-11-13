const notes = require('express').Router();
const { readFile, appendFile, writeFile } = require('../helpers/utils');

notes.get('/', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id != noteId);
            writeFile('./db/db.json', result);
            res.json(`Note ${noteId} was deleted`);
        });
});

