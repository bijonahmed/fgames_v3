// src/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import axios from "/config/axiosConfig";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper/modules";
import './css/VideoPlayer.css'; // Import your CSS file
import { translate } from "pdf-lib";
//VideoPlayer.css

const ShortVideoPlayer = () => {

  const swiperRef = useRef(null);  // Create a reference to Swiper
  const videoRefs = useRef([]);    // Array to store video references
  const [currentIndex, setCurrentIndex] = useState(0);

  // Enable mousewheel for vertical scrolling
  const videos = [
    { id: 1, src: "/theme_fansgames/videos/01.mp4" },
    { id: 2, src: "/theme_fansgames/videos/02.mp4" },
    { id: 3, src: "/theme_fansgames/videos/03.mp4" },
    { id: 4, src: "/theme_fansgames/videos/04.mp4" },
    { id: 5, src: "/theme_fansgames/videos/05.mp4" },
    { id: 6, src: "/theme_fansgames/videos/06.mp4" },
    { id: 7, src: "/theme_fansgames/videos/07.mp4" },
    { id: 8, src: "/theme_fansgames/videos/08.mp4" },
    { id: 9, src: "/theme_fansgames/videos/09.mp4" },
    { id: 10, src: "/theme_fansgames/videos/10.mp4" },
    { id: 11, src: "/theme_fansgames/videos/11.mp4" },
    { id: 12, src: "/theme_fansgames/videos/12.mp4" },
    { id: 13, src: "/theme_fansgames/videos/13.mp4" },
    { id: 14, src: "/theme_fansgames/videos/14.mp4" },
    { id: 15, src: "/theme_fansgames/videos/15.mp4" },
    { id: 16, src: "/theme_fansgames/videos/16.mp4" },
    { id: 17, src: "/theme_fansgames/videos/17.mp4" },
    { id: 18, src: "/theme_fansgames/videos/18.mp4" },
    { id: 19, src: "/theme_fansgames/videos/19.mp4" },
    { id: 20, src: "/theme_fansgames/videos/20.mp4" },
    { id: 21, src: "/theme_fansgames/videos/21.mp4" },
    { id: 22, src: "/theme_fansgames/videos/22.mp4" },
    { id: 23, src: "/theme_fansgames/videos/23.mp4" },


    // Add more videos as needed
  ];

  // Handle video play and pause based on the current slide index
  const handleSlideChange = (swiper) => {

    setCurrentIndex(swiper.activeIndex); // Update the active slide index
    const currentIndex = swiper.activeIndex;
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
      }
    });

    // Play the current video
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.play();
    }
  };



  // Handle keyboard arrow key navigation
  const handleKeydown = (event) => {
    if (event.key === "ArrowDown") {
      swiperRef.current.swiper.slideNext();
    } else if (event.key === "ArrowUp") {
      swiperRef.current.swiper.slidePrev();
    }
  };


  // Function to handle playing the video


  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];  // Access the specific video using the index
    if (video.paused) {
      video.play();  // Play the video
    } else {
      video.pause(); // Pause the video
    }
  }




  const playButtonRef = useRef(null); // Reference for the play button
  useEffect(() => {

    if (playButtonRef.current) {
      playButtonRef.current.click(); // Programmatically click the play button
    }

    if (videoRefs.current[0]) {
      videoRefs.current[0].play();
    }


    const randomIndex = Math.floor(Math.random() * videos.length);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(randomIndex);
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };


  }, []);


  return (
    <>
      <div className="col-md-4 col-12 v_container text-center p-0">
        <div className="swiper-container">
          {/* Reels video part start here */}
          <div className="container-fluid p-0 d-flex justify-content-center align-items-center">
            <div className="swiper-container position-relative h-80 w-100" style={{ maxWidth: "450px" }}>
              <Swiper
                ref={swiperRef}
                modules={[Mousewheel]} // Enable mousewheel scrolling
                direction="vertical"
                slidesPerView={1}
                mousewheel
                style={{ height: "100vh" }}
                onSlideChange={(swiper) => handleSlideChange(swiper)}>
                {videos.map((video, index) => (
                  <SwiperSlide key={video.id} className="custom-slide">
                    <div className="position-relative d-flex justify-content-center align-items-center w-100">
                      <video
                        id={`myVideo-${index}`}  // Make sure to give each video a unique id
                        ref={(el) => (videoRefs.current[index] = el)}  // Store reference to video
                        onClick={() => togglePlayPause(index)}  // Fix: Use an arrow function
                        style={{ objectFit: "cover", maxHeight: "80vh" }}
                        src={video.src}
                        className="video-rounded w-100 h-80"
                        loop
                      />
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
              {/* Left Arrow Button */}
              <div
                style={{ top: "50%", left: "10px", transform: "translateY(-50%)" }}
                className="swiper-button-prev position-absolute"
                onClick={() => swiperRef.current.swiper.slidePrev()}>
                <i className="fas fa-chevron-up"></i>
              </div>

              {/* Right Arrow Button */}
              <div className="swiper-button-next position-absolute me-3"
                onClick={() => swiperRef.current.swiper.slideNext()}>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>


          {/* reels videos end here  */}
        </div>
      </div>


    </>
  );
};

export default ShortVideoPlayer;
