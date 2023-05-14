import React, { useEffect, useRef,useState } from 'react';
import Microfrontend from './Microfrontend';
import './App.css';


const MicrofrontendA = 'http://localhost:4000';
const MicrofrontendB = 'http://localhost:5000';

function App() {
    const [messages, setMessages] = useState([]);
    const [receivedTime,setReceivedTime] = useState([])
    // container.js
    const subscriptions = {
        channel:["channel1"]
    };


useEffect(()=>{
    window.addEventListener('message', (event) => {
        console.log(performance.now())
        const { channel, data } = event.data;
        console.log(data)
        let performanceTime = performance.now()
        if (channel == 'channel1'){
            setMessages(prevState => [...prevState,data.message])
            setReceivedTime(prevState => [...prevState,performanceTime])
        }

    });
    return () => {
        window.removeEventListener('message',(event)=>{
            console.log("unmounted")
        })
    }
},[])




    return (
        <div className="App">
            <div className={"main-container"}>
                <h2>Main Container</h2>
                <div className={"data-view"}>
                    <h3>Data View</h3>
                    <div className={"data-list"}>
                        <ul>
                            {
                                messages?.map((message,index)=>(
                                    <li>
                                        {message} | {receivedTime[index]}
                                    </li>
                                ))
                            }
                        </ul>

                    </div>
                </div>
                <div className="grid-container">
                    <div className="grid-item">
                        <h3>Micro Frontend 1</h3>
                        <div>
                            <Microfrontend src={`${MicrofrontendA}`} id="microfrontend-a"  />
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>Micro Frontend 2</h3>
                        <div>
                            <Microfrontend src={`${MicrofrontendB}`} id="microfrontend-b"  />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;
