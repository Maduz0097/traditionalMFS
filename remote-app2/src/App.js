import React, {lazy, useEffect, useState} from 'react';
// import * as ObjectFiles from "./test"
import './App.css';

import {obj6} from "./test2";
import {obj7} from "./test2";
import {obj8} from "./test2";
import {obj9} from "./test2";
import {obj} from "./test2"
function App() {

  const [sendTime, setSendTime] = useState(0);
  const [input, setInput] = useState('');
    const [time,setTime] = useState(0)
  const publish = (channel, data)=> {
    window.parent.postMessage({ channel, data }, '*');
  }
  const handleSubmit = (object) => {
    console.log(0,performance.now())
      const startTime = performance.now()
      console.log("send 2",Date.now())
      setSendTime(startTime)

      const data = object

    publish('channel1', {data})
    console.log("Send Exact",Date.now())
    setInput('');
  };
useEffect(() => {
    let timeOrigin = window.performance.timeOrigin
    setTime(timeOrigin)
},[])

  return (
      <>
          <>Time : {time}</>
        <div className={"data-input"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button id="one" onClick={()=> handleSubmit(obj6)}>Send Data 500KB </button>
          <button onClick={()=> handleSubmit(obj7)}>Send Data 449KB </button>
          <button onClick={()=> handleSubmit(obj8)}>Send Data 1.91MB </button>
          <button onClick={()=> handleSubmit(obj9)}>Send Data 2.67MB </button>
          <button onClick={()=> handleSubmit(obj)}>Send Data 5MB </button>


        <p name="send">{sendTime}</p>
      </>
  );
}

export default App;
