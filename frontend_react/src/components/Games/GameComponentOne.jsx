import React, { useRef, useState, useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom'; // Ensure you have this import for the Link component
import '../GameSlider.css'; // Import your CSS
import axios from '/config/axiosConfig';
import { LanguageContext } from "../../context/LanguageContext";


const GameComponentOne = () => {
  const { language, content, changeLanguage } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [games, setData] = useState([]);
  const [gameTypeName, gtypeName] = useState();

  const swiperRef = useRef(null); // Create a reference for the Swiper
  // Handlers for navigation buttons
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext(); // Move to the next slide
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev(); // Move to the previous slide
    }
  };

  const slug = 'pg';
  const defaultFetch = async () => {
    //`/public/gameTypeWiseCategory/${slug}` language: language,
    try {
      const response = await axios.get(`/public/categoryWiseGames/${slug}`);
      setData(response.data.data); // Set the video data
      gtypeName(response.data.gameTypeName); // Set the video data
      //setTotalPages(response.data.last_page); // Get total pages from response
    } catch (error) {
      console.error("Error Data:", error);
    }
  };

  useEffect(() => {
    defaultFetch();
  }, [slug]); // Dependency array includes slug and currentPage

  const ImageWithFallback = ({ src, alt }) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleError = () => {
      setImageSrc('/images/model.png'); // Set the default image path
    };

    return (
      <img
        src={imageSrc}
        alt={alt}
        className="img-fluid"
        onError={handleError}
      />
    );
  };

  return (

    <section className="game-slider">
      <div className="slier_header">
        <h5>{gameTypeName}</h5>
        <div className="slide_nav">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`games-list/${slug}`} style={{ marginRight: '0px', display: 'flex', alignItems: 'center' }}>
              All<i className="fa-regular fa-chevron-right" style={{ marginLeft: '4px' }}></i>
            </Link>
            <button
              className="btn_nav Game_prev_1"
              onClick={handlePrev}
              style={{ marginLeft: '8px' }} // Add space to the left of the button
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="btn_nav Game_nxt_1"
              onClick={handleNext}
              style={{ marginLeft: '8px' }} // Add space to the left of the button
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <Swiper
        ref={swiperRef} // Assign the reference to the Swiper
        spaceBetween={10} // Set to 0 to remove gaps between slides
        slidesPerView={5} // Set the number of visible slides (items per page)

        navigation={{
          nextEl: '.Game_nxt_1', // Custom next button class
          prevEl: '.Game_prev_1', // Custom previous button class
        }} // Enable navigation
        breakpoints={{
          1280: {
            spaceBetween: 0,
            slidesPerView: 8,
          },
          1024: {
            spaceBetween: 10,
            slidesPerView: 8,
          },
          991: {
            spaceBetween: 10,
            slidesPerView: 16,
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
        modules={[Pagination, Navigation, Autoplay]} // Include Navigation module
        className="swiper-wrapper"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div className="games_box">
              <Link to={`/play-game/${game.slug}`} className="game_link">
                <ImageWithFallback
                  src={game.imagepath} // Use src instead of data-src
                  alt={game.translate_name}
                  className="img-fluid"
                />
                <h2 className="wow fadeIn">{game.translate_name}</h2>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>


  );
};

export default GameComponentOne;