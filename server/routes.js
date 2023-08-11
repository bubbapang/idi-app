import express from 'express';
import Note from './models/note.js';

const router = express.Router();

// CREATE: Add a new note
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ: Get all notes
router.get('/', (req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE: Update a note by ID
router.put('/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.title = req.body.title;
            note.content = req.body.content;
            note.save()
                .then(() => res.json('Note updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE: Delete a note by ID
router.delete('/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;
