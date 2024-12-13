import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import SliderComponent from "../components/SliderComponent";

import "../components/Pagination.css";
import axios from "/config/axiosConfig";
import RightSideBarHoster from "../components/RightSideBarHoster";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import { LanguageContext } from "../context/LanguageContext";

const GamesList = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { language, content, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [responseData, setData] = useState([]);
  const [gameTypeName, gtypeName] = useState();

  const { slug } = useParams();
  console.log("==Slug=" + slug);
  //const [quesAns, setQuestionAns] = useState([]);

  const defaultFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/public/gameCategoryGame", {
        params: {
          slug: slug,
          language: language, // Add more parameters as needed
        },
      });
      // const response = await axios.get(`/public/gameCategoryGame/${slug}`);
      setData(response.data.data.allGames); // Set the video data
      gtypeName(response.data.data.gameName); // Set the video data
      //setTotalPages(response.data.last_page); // Get total pages from response
    } catch (error) {
      console.error("Error Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    defaultFetch();
  }, [language, slug]); // Dependency array includes slug and currentPage

  return (
    <>
      <Helmet>
        <title>Games List {slug}</title>
      </Helmet>

      <GuestNavbar />
      <div className="main_section">
        <LeftSideBarComponent />
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
                <h1 className="page_title">{gameTypeName} </h1>
              </div>

              <div className="game_list_2">
                {responseData.map((game, index) => (
                  <div className="game_box" key={index}>
                    <Link
                      to={`/play-game/${game.slug.toLowerCase()}`}
                      className="home_hoster_link"
                    >
                      {/* Placeholder image */}
                      {!imageLoaded && (
                        <img
                          src="/images/elementor-placeholder-image.png"
                          alt="placeholder"
                          className="img-fluid"
                        />
                      )}

                      {/* Main image with loading and error handling */}
                      <img
                        src={game.images}
                        alt={game.id}
                        className="img-fluid"
                        style={{ display: imageLoaded ? "block" : "none" }}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop if placeholder fails
                          e.target.src =
                            "/images/elementor-placeholder-image.png";
                        }}
                      />

                      <h5>{game.name}</h5>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {/* RightSideBarHoster Component */}
            <RightSideBarHoster />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default GamesList;
