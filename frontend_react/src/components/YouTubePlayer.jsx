import React, { useEffect, useRef } from 'react';

const YouTubePlayer = ({ videoId }) => {
    const playerRef = useRef(null);
    const playerInstance = useRef(null);

    useEffect(() => {
        // Load YouTube IFrame Player API asynchronously
        const loadYouTubeAPI = () => {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(script);
        };

        if (!window.YT) {
            loadYouTubeAPI();
        }

        // Function to create a YouTube player
        window.onYouTubeIframeAPIReady = () => {
            playerInstance.current = new window.YT.Player(playerRef.current, {
                height: '390',
                width: '640',
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        };
    }, [videoId]);

    const onPlayerReady = (event) => {
        // Autoplay video when ready
        event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
        // Handle state changes if needed
    };

    return (
        <div>
            <div ref={playerRef} id="player"></div>
        </div>
    );
};

export default YouTubePlayer;
