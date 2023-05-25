import React, { useEffect, useRef,useState } from 'react';
import Microfrontend from './Microfrontend';
import './App.css';
import DataView from "./DataView";


const MicrofrontendA = 'http://192.168.1.2:8002';
const MicrofrontendB = 'http://192.168.1.2:8003';

function App() {

    const iframeRef = useRef(null);
    const iframeRef2 = useRef(null);
    const subscriptions = {
        channel:["channel1"]
    };




    const sendDataToChild = (data) => {
        console.log(data)
        const childWindow = document.getElementById('mf2').contentWindow;
        if (childWindow) {
            console.log("ok2")
            console.log(14,performance.now())
            console.log("send 1",Date.now())
            childWindow.postMessage(data, '*');
        }

    };
    useEffect(()=>{
        window.addEventListener('message', (event) => {

            console.log(13,performance.now())
            const { channel, data } = event.data;

            console.log(13,data)
            const startTime = performance.now()


            // setSendTime(formattedDate)
            // let performanceTime = performance.now()
            if (channel == 'channel1'){
                console.log("ok")
                sendDataToChild(event.data)
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
               <DataView />
                <div className="grid-container">
                    <div className="grid-item">
                        <h3>Micro Frontend 1</h3>
                        <div>
                            <iframe src={`${MicrofrontendA}`} id='mf1' title="Micro Frontend A" style={{ width: '100%', height: '500px', border: 'none' }}></iframe>
                            {/*<Microfrontend ref={iframeRef2}  src={`${MicrofrontendA}`} id="microfrontendA" name="micro1"  />*/}
                        </div>
                    </div>
                    <div className="grid-item">
                        <h3>Micro Frontend 2</h3>
                        <div>
                            <iframe src={`${MicrofrontendB}`} id='mf2' title="Micro Frontend B" style={{ width: '100%', height: '500px', border: 'none' }}></iframe>

                            {/*<Microfrontend ref={iframeRef} src={`${MicrofrontendB}`} id="microfrontendB"  name="micro2" />*/}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;
