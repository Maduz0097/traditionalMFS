import React, { useEffect,useState } from 'react';
import './App.css';




function DataView() {
    const [messages, setMessages] = useState([]);
    const [receivedTime,setReceivedTime] = useState([])
    // container.js
    const subscriptions = {
        channel:["channel1"]
    };


    useEffect(()=>{
        window.addEventListener('message', (event) => {
            console.log(12,performance.now())
            console.log("eventdata",event.data)
            const { channel, data } = event.data;
            console.log(12,data)
            const startTime = performance.now()

            if (subscriptions.channel.includes(channel)){
                setMessages(prevState => [...prevState,data.message])
                setReceivedTime(prevState => [...prevState,startTime])
            }

            // setSendTime(formattedDate)
            // let performanceTime = performance.now()
            // if (channel == 'channel1'){
            //     setMessages(prevState => [...prevState,data.message])
            //     setReceivedTime(prevState => [...prevState,startTime])
            // }

        });
        return () => {
            window.removeEventListener('message',(event)=>{
                console.log("unmounted")
            })
        }
    },[])




    return (

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

    );
}

export default DataView;
