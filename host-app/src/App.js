import React, { useEffect, useRef,useState } from 'react';
import Microfrontend from './Microfrontend';
import MessageBus from './MessageBus';
import './App.css';
const messageBus = new MessageBus();

const MicrofrontendA = 'http://localhost:4000';
const MicrofrontendB = 'http://localhost:3002';

function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleMessage = (event) => {
        if (event.data.type === 'register') {
            messageBus.subscribe(event.data.event, (data) => {
                event.source.postMessage({ type: event.data.event, data }, '*');
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(0,performance.now())
            await messageBus.publish('eventFromContainer', {
                "empid": "SJ011MS",
                "personal":
                    {
                        "name":"Smith Jones",
                        "gender":"Male",
                        "age": 28,
                        "address":
                            {
                                "streetaddress":"724th Street",
                                "city":"New York",
                                "state": "NY",
                                "postalcode":"10038"
                            }
                    },
                "profile":
                    {
                        "designation":"Deputy General",
                        "department":"Finance"
                    }
            })
            console.log(1,performance.now())
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating news event:', error);
        }
    };
    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Send Message to Microfrontends</button>
            </form>
            {/*<button onClick={() => messageBus.publish('eventFromContainer', {message,description})}>Send Message to Microfrontends</button>*/}
            <Microfrontend src={`${MicrofrontendA}`} id="microfrontend-a" onMessage={handleMessage} />
            {/*<Microfrontend src={`\${MicrofrontendB}`} id="microfrontend-b" onMessage={handleMessage} />*/}
        </div>
    );
}

export default App;
