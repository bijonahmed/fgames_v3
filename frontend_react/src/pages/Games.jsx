import React, { useState } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import RightSideBarHoster from "../components/RightSideBarHoster";
import SliderComponent from "../components/SliderComponent";



const Games = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Game List</title>
      </Helmet>

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
                <div className="title_section">
                  <a onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-chevron-left" />
                  </a>
                  <h1 className="page_title">Casino </h1>
                </div>

                <div className="game_list_2">
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/01.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/02.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/03.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/04.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/05.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/06.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/07.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/08.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/09.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/10.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/11.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/12.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/01.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/06.jpg"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/games-logo-1.png"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/games-logo-2.png"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/games-logo-3.png"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/games-logo-4.png"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                  <div className="game_box">
                    <a href="#">
                      <img
                        src="/images/games/games-logo-5.png"
                        alt
                        className="img-fluid"
                      />
                      <p>Games</p>
                      <h5>Lucky Jet</h5>
                    </a>
                  </div>
                </div>

               
              </div>
              {/* RightSideBarHoster Component */}
              <RightSideBarHoster />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Games;
