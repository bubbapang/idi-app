import React, { useState, useEffect } from 'react';
import './App.css';
import NotesComponent from './components/notesComponent';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then((response) => response.text())
      .then((text) => setMessage(text));
  }, []);

  return (
    <div className="App">
      <h1>Backend: {message}</h1>
      <h2>Frontend: Hello World!</h2>
      <NotesComponent />
    </div>
  );
}

export default App;
