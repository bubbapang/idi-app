import React, { useState, useEffect } from 'react';
import './App.css';
import OrdersComponent from './components/ordersComponent';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://idi-online-production.up.railway.app/')
      .then((response) => response.text())
      .then((text) => setMessage(text));  
  }, []);

  return (
    <div className="App">
      <h1>Backend: {message}</h1>
      <h2>Frontend: Hello World!</h2>
      <OrdersComponent />
    </div>
  );
}

export default App;
