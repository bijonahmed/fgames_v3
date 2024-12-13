import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "/config/axiosConfig";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import '../../GameSlider.css'; // Import your CSS

const RightSideBarHoster = () => {
  const { language, content, changeLanguage } = useContext(LanguageContext);
  const [categorys, setChidCategory] = useState([]);
  const [gallerys, setApiGalleryData] = useState([]);
  const [responseData, setData] = useState([]);
  const [gameTypeName, gtypeName] = useState();


  const slug = 'live';
  const defaultFetch = async () => {
    //  setLoading(true);
    try {
      const response = await axios.get(`/public/gameTypeWiseCategory/${slug}`);
      setData(response.data.data); // Set the video data
      gtypeName(response.data.gameTypeName); // Set the video data
      //setTotalPages(response.data.last_page); // Get total pages from response
    } catch (error) {
      console.error("Error Data:", error);
    } finally {
      //setLoading(false);
    }
  };

  const handleImageLoad = (index) => {
    setLoadingStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = false; // Set loading to false once the image is loaded
      return newStatus;
    });
  };
  useEffect(() => {
    defaultFetch();
    const fetchData = async () => {
      try {
        //const response = await axios.get(`/public/getAllCaegorys`);
        const response = await axios.get(`/public/getAllCaegorys`, {
          params: { language: language }, // Pass the selected language (e.g., 'bn', 'en')
        });

        if (response.data && Array.isArray(response.data)) {
          setChidCategory(response.data); // Set categories to the state
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    const galleryData = async () => {
      try {
        const response = await axios.get(`/public/galleryApiData`);

        if (response.data && Array.isArray(response.data)) {
          setApiGalleryData(response.data); // Set categories to the state
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    galleryData();
    fetchData();
    console.log('Language changed to:', language);
  }, [language]);
  const [loadingStatus, setLoadingStatus] = useState(
    responseData.map(() => true) // Set loading to true for all games initially
  );

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
    <div className="col-xl-3 ">
      <Link to="/hoster-list">
        <div className="ads_section">
          <img
            src="/images/banner-DCWqOOaK.webp"
            className="ads_image img-fluid"
          />
          <div className="overlay" />
          <img src="/images/live.gif" className="img-fluid live_image" />
        </div>
      </Link>



      {/* category buttons start here  */}
      <div className="v_categories">
        {categorys.length > 0 ? (
          categorys.map((category, index) => (
            <Link
              to={`/adult-categorys/${category.slug}`} // Dynamic URL based on category name
              className="btn_category"
              key={index}
            >
              {category.name} {/* Render the category name */}
            </Link>
          ))
        ) : (
          <p></p>
        )}
      </div>

      <div className="home_hoster d-none">
        {gallerys.length > 0 ? (
          gallerys.map((gallery, index) => (
            <div className="hoster_" key={index}>
              <Link to={`/hoster-details/${gallery.api_id}`} className="home_hoster_link">
                <img src={gallery.imagepath} className="img-fluid" />
              </Link>
            </div>
          ))
        ) : (
          <p>No gallery images available</p>
        )}
      </div>



      {/* home hoster section end here  */}
    </div >
  );
};

export default RightSideBarHoster;
