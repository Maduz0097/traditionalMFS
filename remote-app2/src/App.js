import React, {  useState } from 'react';

import './App.css';
function App() {

  const [sendTime, setSendTime] = useState(0);
  const [input, setInput] = useState('');
  const publish = (channel, data)=> {
    window.parent.postMessage({ channel, data }, '*');
  }
  const handleSubmit = () => {
    console.log(0,performance.now())
    setSendTime(performance.now())
    publish('channel1', {message : input})
    console.log(1,performance.now())
    setInput('');
  };


  return (
      <>
        <div className={"data-input"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Send Data</button>
        <p>Data Send Time : {sendTime}</p>
      </>
  );
}

export default App;
