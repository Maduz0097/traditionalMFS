import React, { useEffect, useRef } from 'react';

const Microfrontend = ({ src, id, onMessage }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        const handleMessage = (event) => {
            if (event.source === iframe.contentWindow) {
                onMessage(event);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [iframeRef, onMessage]);

    return (
        <iframe
            ref={iframeRef}
            src={src}
            id={id}
            title={id}
            style={{ width: '100%', height: '500px', border: 'none' }}
        />
    );
};

export default Microfrontend;
