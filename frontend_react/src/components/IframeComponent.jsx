import React from 'react';
import { Helmet } from 'react-helmet'; // Optional for managing head elements

const IframeComponent = () => {
    const chatRoomUrl = 'https://www.eporner.com/embed/000fxZjL3k6/';

    return (
        <div style={{ overflow: 'hidden', width: '100%', height: '100vh' }}>
            <Helmet>
                <title>Live Room</title>
                <meta name="description" content="Live chat room on Chaturbate." />
            </Helmet>
            <iframe
                src={chatRoomUrl}
                title="Chaturbate Chat Room"
                style={{ border: 'none', width: '100%', height: '100%' }}
                allow="autoplay; encrypted-media"
            />
        </div>
    );
};

export default IframeComponent;
