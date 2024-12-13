import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import SliderComponent from "../components/SliderComponent";


import '../components/Pagination.css';
import axios from "/config/axiosConfig";
import RightSideBarHoster from "../components/RightSideBarHoster";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import { LanguageContext } from "../context/LanguageContext";


const GamesList = () => {

    const { language, content, changeLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [responseData, setData] = useState([]);
    const [platform_name, gtypeName] = useState();

    const { slug } = useParams();
    console.log("==Slug=" + slug);
    //const [quesAns, setQuestionAns] = useState([]);

    const defaultFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/gameTypeWiseCategory/${slug}`);
            setData(response.data.data); // Set the video data
            gtypeName(response.data.platform_name); // Set the video data
            //setTotalPages(response.data.last_page); // Get total pages from response
        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        defaultFetch();
    }, [slug]); // Dependency array includes slug and currentPage

    const [loadingStatus, setLoadingStatus] = useState(
        responseData.map(() => true) // Set loading to true for all games initially
    );

    const handleImageLoad = (index) => {
        setLoadingStatus((prevStatus) => {
            const newStatus = [...prevStatus];
            newStatus[index] = false; // Set loading to false once the image is loaded
            return newStatus;
        });
    };

    const ImageWithFallback = ({ src, alt, className }) => {
        const [imageSrc, setImageSrc] = useState(src);
        const fallbackImage = '/images/imagenotfound.gif'; // Specify the fallback image path

        return (
            <img
                src={imageSrc}
                alt={alt}
                className={className}
                onError={() => setImageSrc(fallbackImage)} // Set fallback image if loading fails
            />
        );
    };


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
                                <h1 className="page_title">{platform_name} </h1>
                            </div>

                            <div className="game_list_2">
                                {responseData.map((game, index) => (
                                    <div className="game_box" key={index}>
                                        <Link to={`/play-game/${game.slug}`} className="home_hoster_link">
                                            {/* Show loader while the image is loading */}
                                            {loadingStatus[index] && (
                                                <div className="loader">
                                                    <img src="/path/to/loader.gif" alt="Loading..." />
                                                </div>
                                            )}

                                            {/* Image with fallback once loaded */}
                                            <ImageWithFallback
                                                src={game.imagepath}
                                                className="img-fluid"
                                                style={{
                                                    display: loadingStatus[index] ? 'none' : 'block',
                                                }}
                                                onLoad={() => handleImageLoad(index)} // Once image loads, remove the loader
                                            />

                                            {/* Game name and code */}
                                            <h5>
                                                <center>{game.name}</center>
                                            </h5>
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
