import React, { useEffect, useRef,useState } from 'react';
import './App.css';




function DataView() {
    const [messages, setMessages] = useState([]);
    const [receivedTime,setReceivedTime] = useState(0)
    const [time,setTime] = useState(0)
    // container.js
    const subscriptions = {
        channel:["channel1"]
    };


    useEffect(()=>{
        console.log(15,performance.now())
        window.addEventListener('message', (event) => {
            console.log(12,performance.now())
            if (event.data){
                const { channel, data } = event.data;
                console.log(12,data)

console.log(data)

                // setSendTime(formattedDate)
                // let performanceTime = performance.now()
                if (channel == 'channel1'){
                    const startTime = performance.now()
                    console.log("receive exact 2",Date.now())
                    setMessages(prevState => [...prevState,data.message])

                        setReceivedTime(startTime)


                }
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
                        <p id={"dataReceivedTime"}>{receivedTime}</p>
                        {/*<ul>*/}
                        {/*    {*/}
                        {/*        messages?.map((message,index)=>(*/}
                        {/*            <li>*/}
                        {/*                {message} | {receivedTime[index]}*/}
                        {/*            </li>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</ul>*/}

                    </div>
                </div>

    );
}

export default DataView;
