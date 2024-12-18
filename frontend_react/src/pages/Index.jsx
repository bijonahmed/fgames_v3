// src/pages/Index.js
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "/config/axiosConfig";
import Navbar from "../components/Navbar";
import ShortVideoPlayer from "../components/ShortVideoPlayer"; // Adjust path if necessary
import GameSlider from "../components/GameSlider";

import Footer from "../components/Footer";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import FullScreenDarkMode from "../components/FullScreenDarkMode";
import { LanguageContext } from "../context/LanguageContext";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [loading, setLoading] = useState(true);
  const { content } = useContext(LanguageContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  return (

    <div>
      <Helmet>
        <title>Welcome to FG</title>
      </Helmet>
      <div>
        <FullScreenDarkMode />
        <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
          <div className="row">
            <div className="col-md-12">
            <Navbar />
            </div>
          </div>
          {/* <div style={{ height: 50 }} /> */}
          <div className="row m-auto justify-content-center">
            <div className="col-md-4 tablet_view_home ">
              <LeftSideBarComponent />
            </div>
            <ShortVideoPlayer />
            <GameSlider />

          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
