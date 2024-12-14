import React, { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom'; // Ensure you have this import for the Link component
import './css/GameSlider.css'; // Import your CSS
import axios from '/config/axiosConfig';
import { LanguageContext } from "../context/LanguageContext";

const GameSlider = () => {
  const { language, content, changeLanguage } = useContext(LanguageContext);
  const [games, setData] = useState([]);
  const slug = 'jili';
  const defaultFetch = async () => {
    try {

      const response = await axios.get(`/public/categoryWiseGames/${slug}`);
      // const response = await axios.get(`/public/categoryWiseGames/`, {
      //   params: { 
      //     language: language,
      //     slug: slug,
      //   }, // Pass the selected language (e.g., 'bn', 'en')
      // });

      setData(response.data.data); // Set the video data
      //setTotalPages(response.data.last_page); // Get total pages from response
    } catch (error) {
      console.error("Error Data:", error);
    }
  };

  useEffect(() => {

    defaultFetch();
  }, [language, slug]); // Dependency array includes slug and currentPage

  return (
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
  );
};

export default GameSlider;
