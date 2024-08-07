import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');  // State to hold the server response

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://react-python-fs-app.vercel.app/contact', formData)
      .then(response => {
        setResponseMessage(response.data.message);  // Set the server response message
        console.log(response);
      })
      .catch(error => {
        console.error('Error:', error);
        setResponseMessage('Failed to send message.');  // Set error message
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" />
          <button type="submit">Send</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}  {/* Display the response message */}
      </header>
    </div>
  );
}

export default App;
