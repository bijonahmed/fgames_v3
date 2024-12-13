import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../components/ImageSlider.css';
import axios from "/config/axiosConfig";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
// Updated image gallery with more images

const LightboxComponent = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedImage, setClickedImage] = useState(null); // New state to show selected image outside
  const [popupImage, setPopupImage] = useState(null); // State to track clicked image

  const navigate = useNavigate();


  const openModal = (index) => {
    setActiveIndex(index); // Set the initial slide index
    setClickedImage(images[index]); // Set the clicked image
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };


  const handleImageClick = (image) => {
    setPopupImage(image); // Set the clicked image
  };

  const closePopup = () => {
    setPopupImage(null); // Close the popup
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultFetch = async () => {
    setLoading(true); // Show the loader
    try {
      const response = await axios.get(`/public/getPornStarPic`);
      setData(response.data); // Set the video data
      //setTotalPages(response.data.last_page); // Get total pages from response
    } catch (error) {
      console.error("Error Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    defaultFetch();
  }, []); // Dependency array includes slug and currentPage


  return (
    <div>
      {/* Image Grid */}


      <div className="title_section">
        <a onClick={() => navigate(-1)}>
          <a href="#"><i className="fa-solid fa-chevron-left" /></a>
        </a>
        <h1 className="page_title">Model List</h1>
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}


{!loading && (
      <div className="row">
        {images.map((image, index) => (
          <div
            key={index}
            className="col-1 col-sm-2 col-md-1 col-lg-5 col-xl-1 mb-3"
            style={{
              padding: "10px", // Add spacing around the images
            }}
          >
            <div
              style={{
                height: "150px", // Fixed height for all images
                backgroundColor: "#fff", // Light background for the box
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Box shadow for a nice effect
                borderRadius: "5px", // Optional rounded corners
                overflow: "hidden", // Ensures the image fits nicely in the box
                display: "flex", // Center the image vertically
                alignItems: "center", // Center the image vertically
                justifyContent: "center", // Center the image horizontally
                cursor: "pointer",
              }}
              onClick={() => openModal(index)} // Open modal on image click
            >
              <img
                src={image}
                alt={`Image ${index}`}
                style={{
                  height: "100%", // Ensure the image fits the box height
                  width: "auto", // Maintain the aspect ratio
                  objectFit: "cover", // Ensure the image covers the area
                }}
              />
            </div>
          </div>
        ))}
      </div>
  )}
      {/* Popup Modal with Slider */}
      {isModalOpen && (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          onClick={closeModal} // Close modal on background click
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body">
                <Swiper
                  initialSlide={activeIndex}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  navigation={true}
                  className="popup-swiper"
                  modules={[Navigation]}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Popup Slide ${index}`}
                        className="img-fluid"
                        style={{
                          maxHeight: "80vh",
                          objectFit: "contain",
                          margin: "auto",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-danger" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxComponent;
