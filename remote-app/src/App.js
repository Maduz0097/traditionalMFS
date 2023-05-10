import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'eventFromContainer') {
          console.log(2,performance.now())
        setMessages((prevMessages) => [...prevMessages, event.data.data]);
      }
    };
    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'register', event: 'eventFromContainer' }, '*');
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
      <div className="App">
        <h1>Microfrontend A</h1>
        <ul>
          {messages.map((message, index) => (
              <li key={index}>{message.empid}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;
