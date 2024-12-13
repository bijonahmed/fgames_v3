import React, { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom'; // Ensure you have this import for the Link component
import './GameSlider.css'; // Import your CSS
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
    <section className="game-slider">
      <Swiper
        spaceBetween={10} // Default space between slides
        slidesPerView={4} // Default slides per view for the smallest screens
        autoplay={{
          delay: 10, // Autoplay delay in milliseconds
          disableOnInteraction: false, // Keep autoplay running even after interaction
        }}
        pagination={{
          clickable: false, // Set to true if you want clickable pagination
        }}
        freeMode={true}
        speed={3000}
        breakpoints={{
          991: {
            spaceBetween: 10,
            slidesPerView: 8,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 12,
          },
          576: {
            spaceBetween: 10,
            slidesPerView: 9,
          },
        }}
        modules={[Autoplay, Pagination]} // Include Autoplay module here
        className="swiper-wrapper"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div className="games_box">
              <Link to={`/play-game/${game.slug}`} className="game_link">
                <img src={game.imagepath} alt={game.translate_name} className="img-fluid" />
                <h2 className="wow fadeIn">{game.translate_name}</h2>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GameSlider;
