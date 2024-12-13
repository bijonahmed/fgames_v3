// src/pages/Index.js
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "/config/axiosConfig";
import Navbar from "../components/Navbar";
import ShortVideoPlayer from "../components/ShortVideoPlayer"; // Adjust path if necessary
import GameSlider from "../components/GameSlider";

import GameComponentOne from "../components/Games/GameComponentOne";
import GameComponentTwo from "../components/Games/GameComponentTwo";
import GameComponentThree from "../components/Games/GameComponentThree";
import GameComponentFour from "../components/Games/GameComponentFour";


import Footer from "../components/Footer";
import RightSideBarHoster from "../components/RightSideBarHoster";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import FullScreenDarkMode from "../components/FullScreenDarkMode";
import { LanguageContext } from "../context/LanguageContext";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [loading, setLoading] = useState(true);
  const { content } = useContext(LanguageContext);

  useEffect(() => {
    // Set a timeout to hide the loader after 5 seconds
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
          <Navbar />
          {/* space  */}
          <div style={{ height: 50 }} />
          {/* navbar end here  */}
          <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#log_modal">
            Launch demo modal
          </button>

          <div className="row m-auto justify-content-center p-0 m-0">
            <div className="col-md-4 tablet_view_home ">
              <LeftSideBarComponent />
            </div>
            <ShortVideoPlayer />
            <div className="col-xl-4 col-lg-4 col-md-4  desktop_view">
              <div className="here " style={{ height: '80vh' }}>
                <div className="right_index">
                  <div className="premium_games">
                    <h5>Free Games</h5>
                    <div className="game_slide owl-carousel">
                      <div className="game_content">
                        <a href="#">
                          <img src="/theme_fansgames/images/Joker_Poker.png" loading="lazy" className="img-fluid" />
                        </a>
                      </div>
                      <div className="game_content">
                        <a href="#">
                          <img src="/theme_fansgames/images/baccarat_512.jpg" loading="lazy" className="img-fluid" />
                        </a>
                      </div>
                      <div className="game_content">
                        <a href="#">
                          <img src="/theme_fansgames/images/gaming guide web_BACCARAT 580.jpg" loading="lazy" className="img-fluid" />
                        </a>
                      </div>

                    </div>
                    <p>Note: Play free games and collect Dimond</p>
                  </div>
                  <div className="premium_games">
                    <h5 className="premium">Premium Games</h5>
                    <div className="game_slide owl-carousel">
                      <div className="game_content">
                        <a href="#">
                          <img src="/theme_fansgames/images/Joker_Poker.png" loading="lazy" className="img-fluid" />
                        </a>
                      </div>
                      <div className="game_content">
                        <a href="#">
                          <img src="/theme_fansgames/images/baccarat_512.jpg" loading="lazy" className="img-fluid" />
                        </a>
                      </div>
                      <div className="game_content">
                        <a href="#">
                          <img src="/theme_fansgames/images/gaming guide web_BACCARAT 580.jpg" loading="lazy" className="img-fluid" />
                        </a>
                      </div>

                    </div>
                    <p>Note: Subscribe For Play premium games.</p>
                  </div>
                  <div className="bottom_right">
                    <img src="/theme_fansgames/images/transparent_img.png" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main content part end here  */}


        <Footer />

        {/* END */}
      </div>
    </div>
  );
};

export default Index;
