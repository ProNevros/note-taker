const app = require('express').Router();
const { readFile, appendFile, writeFile } = require('../helper/util');

app.get('/', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const newId = json.filter((note) => note.id != noteId);
            writeFile('./db/db.json', newId);
            res.json(`Note ${noteId} deleted`);
        });
});

app.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        var id = Date.now();
        const addNote = {
            title, text, id
        };
        appendFile(addNote, './db/db.json');
        res.json(`Added`);
    } else {
        res.error('Could not add note');
    }
});


module.exports = app;