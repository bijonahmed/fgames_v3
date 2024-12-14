import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import GameSlider from "../components/GameSlider";
import Loader from "../components/Loader";
import '../components/css/Pagination.css';
import axios from "/config/axiosConfig";

const WatchVideos = () => {
    // const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const [rowData, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [gallerys, setGallerys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Start with page 1
    const [hasMore, setHasMore] = useState(true); // Flag to track if there's more data
    const [progress, setProgress] = useState(0); // Progress bar state
    //const [shouldFetch, setShouldFetch] = useState(true);
    //const [gallaryData, setGallary] = useState([]);
    //const [error, setError] = useState(false);
    //const [loadingIframe, setLoadingIframe] = useState(true);
    //const [isError, setIsError] = useState(false); // State to track loading errors

    const { slug } = useParams();
    const fetchGallerys = async () => {
        // if (isLoading) return; // Prevent multiple calls
        setIsLoading(true);
        setLoading(true);
        setProgress(0); // Reset progress
        let progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(progressInterval); // Stop progress at 100%
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 100);
        try {
            const response = await axios.get(`/public/getAllVideos`, {
                params: { page }
            });
            //console.log('API Response:', response.data);
            const newGallerys = response.data.data;
            if (Array.isArray(newGallerys)) {
                setGallerys((prevGallerys) => [...prevGallerys, ...newGallerys]);

                if (newGallerys.length < 10) {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    };
    const defaultFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/checkHosterProfile/${slug}`);
            setData(response.data.row);

        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoading(false);
        }
    };
    const callingData = async (slug) => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/checkHosterProfile/${slug}`);
            setData(response.data.row);

        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallerys();
        defaultFetch();
    }, [page]);

    const handleClick = (event, apiId) => {
        callingData(apiId);
    };


    const loadMoreGallerys = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1); // Increment the page
        }
    };
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
        <>
            <Helmet>
                <title>Watch Videos</title>
            </Helmet>

            <GuestNavbar />
            <div className="main_content">
                <LeftSideBarComponent />

                <div className="main_section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-9">

                                <div style={{ textAlign: 'center' }}>
                                    <iframe
                                        src={rowData.embed}
                                        title="Chaturbate Chat Room"
                                        style={{ border: 'none', width: '100%', height: '100vh', maxHeight: '600px' }}
                                        allow="autoplay; encrypted-media"
                                    />
                                </div>

                                <GameSlider />

                                <div className="title_section">
                                    <Link to="#" onClick={() => navigate(-1)}>
                                        <i className="fa-solid fa-chevron-left" />
                                    </Link>
                                    <h1 className="page_title">Hoster List </h1>
                                </div>

                                {loading ? (
                                    <center>
                                        <Loader />
                                        <div className="loading-indicator">
                                            <img src="/images/loader.gif" />
                                            <span className="text-black">Loading.....</span>
                                        </div>
                                    </center>
                                ) : (


                                    <div>
                                        {/* Start */}
                                        <div className="main_hosterList">
                                            {gallerys.length > 0 ? (
                                                gallerys.map((gallery) => (
                                                    <div className="hoster_" key={gallery.api_id}>
                                                        <a onClick={(event) => handleClick(event, gallery.api_id)}
                                                            className="home_hoster_link">
                                                            <ImageWithFallback src={gallery.thumb_src} />
                                                        </a>
                                                    </div>
                                                ))
                                            ) : (
                                                <p></p> // Provide a fallback message
                                            )}

                                        </div>
                                        <div className="load-more-container">
                                            {loading && (
                                                <div className="progress-container">
                                                    <div
                                                        className="progress-bar"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            )}

                                            {/* Load More button */}
                                            {hasMore && !loading && (
                                                <center><button className="load-more-btn" onClick={loadMoreGallerys}>
                                                    Load More
                                                </button><br /><br /></center>

                                            )}
                                        </div>

                                        {/* END */}

                                    </div>
                                )}
                            </div>
                            {/* RightSideBarHoster Component */}
                            <div className="col-xxl-3 d-xxl-block d-none ">
                                <div className="right_sidebar">
                                    <Link to="/games-list/pg">
                                        <div className="ads_section">
                                            <img
                                                src="/images/250x250_Google_ads_size.gif" alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </Link>
                                    <Link to="/games-list/pg">
                                        <div className="ads_section_two">
                                            <img src="/images/adsbannar.webp" alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

            </div>
        </>
    );
};

export default WatchVideos;
