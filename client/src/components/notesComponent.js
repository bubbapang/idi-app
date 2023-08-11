import React, { useState, useEffect } from 'react';
import './notesComponent.css';

function NotesComponent() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Base URL for the backend
    const baseURL = 'https://idi-online-production.up.railway.app';

    // READ: Fetch notes from the backend
    const fetchNotes = () => {
        fetch(`${baseURL}/notes`)
            .then((res) => res.json())
            .then((data) => setNotes(data))
            .catch((err) => console.error(err));
    };
    
    // CREATE: Add a new note
    const createNote = () => {
        fetch(`${baseURL}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        })
            .then(() => {
                setTitle('');
                setContent('');
                fetchNotes();
            })
            .catch((err) => console.error(err));
    };
    
    // UPDATE: Update a note by ID
    const updateNote = () => {
        if (!selectedNote) return;
        fetch(`${baseURL}/notes/${selectedNote._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        })
            .then(() => {
                setSelectedNote(null);
                setTitle('');
                setContent('');
                fetchNotes();
            })
            .catch((err) => console.error(err));
    };
    
    // DELETE: Delete a note by ID
    const deleteNote = (id) => {
        fetch(`${baseURL}/notes/${id}`, { method: 'DELETE' })
            .then(() => fetchNotes())
            .catch((err) => console.error(err));
    };
    

    // Load notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <div className='note-box'>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                {selectedNote ? (
                    <button onClick={updateNote}>Update Note</button>
                ) : (
                    <button onClick={createNote}>Create Note</button>
                )}
            </div>
            <ul className='note-list'>
                {notes.map((note) => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <button onClick={() => { setSelectedNote(note); setTitle(note.title); setContent(note.content); }}>Edit</button>
                        <button onClick={() => deleteNote(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotesComponent;
