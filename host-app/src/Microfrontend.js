import React, { useEffect, useRef } from 'react';

const Microfrontend = ({ref, src, id ,name }) => {


    return (
        <iframe
            ref={ref}
            src={src}
            id={id}
            title={id}
            name={name}
            style={{ width: '100%', height: '500px', border: 'none' }}
            onLoad={() => console.log('Iframe loaded')}
        />
    );
};

export default Microfrontend;
