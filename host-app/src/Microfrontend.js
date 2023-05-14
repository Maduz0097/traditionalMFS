import React, { useEffect, useRef } from 'react';

const Microfrontend = ({ src, id }) => {
    const iframeRef = useRef(null);

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
