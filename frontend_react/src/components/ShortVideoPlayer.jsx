// src/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import axios from "/config/axiosConfig";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from "swiper/modules";
import './VideoPlayer.css'; // Import your CSS file
//VideoPlayer.css

const ShortVideoPlayer = () => {

  const swiperRef = useRef(null);  // Create a reference to Swiper
  const videoRefs = useRef([]);    // Array to store video references

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

  const handleReachEnd = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(0); // Reset to the first slide
    }
  };



  useEffect(() => {
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
      <div className="col-md-4 col-12 p-0 v_container text-center">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {/* Reels video part start here */}
            <div className="container-fluid p-0">
              <Swiper
                ref={swiperRef}
                modules={[Mousewheel]} // Enable mousewheel scrolling
                direction="vertical"
                slidesPerView={1}
                mousewheel
                style={{ height: "100vh" }}
                onSlideChange={handleSlideChange} // Listen to slide change
                onReachEnd={handleReachEnd}
              >
                {videos.map((video, index) => (
                  <SwiperSlide key={video.id} className="custom-slide">
                    <div className="position-relative d-flex justify-content-center align-items-center vh-100">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)} // Store video references
                        src={video.src}
                        className="video-rounded w-100 h-100"
                        controls
                        autoPlay={index === 0} // Play the first video initially
                        loop
                      />
                      {/* Icons Section */}
                      <div
                        className="position-absolute d-flex flex-column align-items-center d-none"
                        style={{
                          top: "50%",
                          right: "20px",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <div
                          className="mb-3"
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <a href="#"><img
                            src="/theme_fansgames/images/like.png"
                            alt="Like"
                            style={{ width: "30px", height: "30px" }}
                          /></a>
                        </div>
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <a href="#"><img
                            src="https://purepng.com/public/uploads/large/share-icon-7nl.png"
                            alt="Share"
                            style={{ width: "30px", height: "30px" }}
                          /></a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>


            {/* reels videos end here  */}
          </div>
        </div>
      </div>

    </>
  );
};

export default ShortVideoPlayer;
