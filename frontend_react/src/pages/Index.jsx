// src/pages/Index.js
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "/config/axiosConfig";
import GuestNavbar from "../components/Navbar";
import SliderComponent from "../components/SliderComponent"; // Adjust path if necessary
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
        <GuestNavbar />
        <div className="main_content">
          <LeftSideBarComponent />

          <div className="main_section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-9">
                  <div className="banner_section">
                    <div className="swiper bannerSlider">
                      {/* SliderComponent Component */}
                      <SliderComponent />
                      <div className="swiper-pagination" />
                    </div>
                  </div>

                  {/* GameSlider Component */}
                  <GameSlider />
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="big_cat">
                        <div className="category_section cat_casino">
                          <Link to="/play-game/aviator-100001">
                            <img
                              src="/images/Aviator-logo-South-Africa.png"
                              className="img-fluid"
                            />
                            <h1>{content.lvl_index_casino || 'Aviator'}</h1>
                          </Link>
                        </div>
                        <div className="category_section bg_sports">
                          <Link to="games-list/jili">
                            <img
                              src="/images/sports-C-mawjC1.webp"
                              className="img-fluid"
                            />
                            <h1>{content.lvl_index_sports || 'JILI'} </h1>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="smCat_list">
                        <div className="category_section bg_lottery">
                          <Link to="games-list/pp_max">
                            <img
                              src="/images/lottery-BgL2Ay0X.webp"
                              className="img-fluid"
                            />
                            <h1>{content.lvl_index_lottery || 'PP MAX'} </h1>
                          </Link>
                        </div>

                        <div className="category_section bg_updown">
                          <Link to="games-list/mini_game">
                            <img
                              src="/images/updown-DQe7IPIb.webp"
                              className="img-fluid"
                            />
                            <h1>{content.lvl_index_updown || 'Mini Games'} </h1>
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                  <section className="on_games">
                    {isLoading ? (
                      // Loader Content
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      // Content to display after loading
                      <>
                        <GameComponentOne />
                        <GameComponentTwo />
                        <GameComponentThree />
                        <GameComponentFour />
                      </>
                    )}
                  </section>

                </div>
                {/* RightSideBarHoster Component */}
                <RightSideBarHoster />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
