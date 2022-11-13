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

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        var id = Date.now();
        const addNote = {
            title, text, id
        };
        appendFile(addNote, './db/db.json');
        res.json(`Note added`);
    } else {
        res.error('Could not add note');
    }
});


module.exports = notes;