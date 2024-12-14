// FullScreenDarkMode.js
import React, { useState, useEffect } from "react";
import './css/FullScreenDarkMode.css'; // Import your CSS file

const FullScreenDarkMode = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to control the overlay visibility

  // Function to detect if the user is on a mobile device
  const detectMobileDevice = () => {
    return (
      window.innerWidth <= 992 ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    );
  };

  useEffect(() => {
    // Check on component mount
    if (detectMobileDevice()) {
      setIsMobile(true);
      setIsVisible(true); // Show overlay if it's a mobile device
    }

    // Optionally, you can add an event listener to handle window resizing
    const handleResize = () => {
      if (detectMobileDevice()) {
        setIsMobile(true);
        setIsVisible(true);
      } else {
        setIsMobile(false);
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeOverlay = () => {
    setIsVisible(false); // Close the overlay
  };

  return (
    <div>
      {isVisible && (
        <div className="fullscreen-overlay">
          <div className="overlay-content">
            <h1>Download Our App!</h1>
            <p>
              Get the best experience on your mobile device by downloading our
              app. Stay updated with the latest features, exclusive content,
              and personalized recommendations.
            </p>

            {/* Download Links */}
            <div className="download-links">
              <a
                href="#" // Replace with your actual Google Play Store link
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/theme_fansgames/images//google-playstore.png" // Replace with a valid Google Play Store icon
                  alt="Download on Google Play"
                  className="store-icon"
                />
              </a>
              <a
                href="#" // Replace with your actual App Store link
                target="_blank"
                rel="noopener noreferrer">
                <br /><br />
                <img
                  src="/theme_fansgames/images//apple.png" // Path starts from the public folder
                  alt="Download on the App Store"
                  className="store-icon"
                />
              </a>
            </div>

            {/* <button className="close-button" onClick={closeOverlay}>Close</button> */}
          </div>
        </div>
      )}


    </div>
  );
};

export default FullScreenDarkMode;
