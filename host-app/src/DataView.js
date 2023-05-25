import React, { useEffect, useRef,useState } from 'react';
import './App.css';




function DataView() {
    const [messages, setMessages] = useState([]);
    const [receivedTime,setReceivedTime] = useState([])
    const [time,setTime] = useState(0)
    // container.js
    const subscriptions = {
        channel:["channel1"]
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
                console.log("Receive Exact",Date.now())
                setMessages(prevState => [...prevState,data.message])
                setReceivedTime(prevState => [...prevState,startTime])
            }

        });
        return () => {
            window.removeEventListener('message',(event)=>{
                console.log("unmounted")
            })
        }
    },[])

    useEffect(()=>{
        let timeOrigin = window.performance.timeOrigin
        setTime(timeOrigin)
    },[])


    return (

                <div className={"data-view"}>
                    <h3>Data View</h3>
                    <>Time : {time}</>
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

    );
}

export default DataView;
