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


const AllGames = () => {

    const { language, content, changeLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [responseData, setData] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedGameType, setSelectedGameType] = useState("");
    const [pltfrmData, setPlatformData] = useState([]);
    const [GtypeData, setGamesData] = useState([]);

    const defaultFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/getPublicAllGames`);
            setData(response.data.data); // Set the video data
        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchPlatform = async () => {
        try {
            const response = await axios.get(`/checkGamesPlatform`);
            setPlatformData(response.data); // Set the video data
        } catch (error) {
            console.error("Error Data:", error);
        }
    };

    const searchGameType = async () => {
        try {
            const response = await axios.get(`/public/allGamesTypes`);
            setGamesData(response.data); // Set the video data
        } catch (error) {
            console.error("Error Data:", error);
        }
    };

    useEffect(() => {
        // Fetch initial data only once when the component mounts
        defaultFetch();
    
        // Fetch platform and game type data (if needed for dropdowns, for example)
        searchPlatform();
        searchGameType();
    }, []); // Empty dependency array ensures this runs only on mount
    
    const fetchFilteredGames = async () => {
        console.log("Search:", search, "PlatformId:", selectedPlatform, "GameTypeId:", selectedGameType);
        setLoading(true); // Show loading indicator
        try {
            const response = await axios.get("/public/filterGames", {
                params: {
                    search: search,
                    platformId: selectedPlatform,
                    gameTypeId: selectedGameType,
                },
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
            setData(response.data.data); // Update the filtered data
            console.log("Filtered data:", response.data.data);
        } catch (error) {
            console.error("Error fetching filtered games:", error);
            setData([]); // Clear data on error
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };
    
    // Fetch filtered games only when a filter changes
    useEffect(() => {
        if (search || selectedPlatform || selectedGameType) {
            fetchFilteredGames();
        }
    }, [search, selectedPlatform, selectedGameType]); // Only re-run when a dependency changes

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
                <title>All Games </title>
            </Helmet>

            <GuestNavbar />
            <div className="main_section">
                <LeftSideBarComponent />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            {/* GameSlider Component */}
                            <div className="title_section">
                                <a onClick={() => navigate(-1)}>
                                    <i className="fa-solid fa-chevron-left" />
                                </a>
                                <h1 className="page_title">All Games</h1>
                            </div>
                            {/* Search Input and Filter Dropdown */}
                            <div className="d-flex align-items-center mb-4">
                                {/* Search Input */}
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Search for your favorite game"
                                    style={{
                                        maxWidth: "60%",
                                        fontSize: "16px",
                                        backgroundColor: "black", // Background color
                                        color: "white",           // Text color
                                        border: "1px solid gray", // Optional: border visibility
                                    }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <div className="form-group me-2" style={{ maxWidth: "20%" }}
                                    value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
                                    <select className="form-control" defaultValue="All Platform">
                                        <option value="">All Platform</option>
                                        {pltfrmData.map((platform, index) => (
                                            <option key={index} value={platform.id}>
                                                {platform.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group me-2" style={{ maxWidth: "20%" }} value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)}>
                                    <select className="form-control" defaultValue="All Game Types">
                                        <option value="">All Type</option>
                                        {GtypeData.map((gtype, index) => (
                                            <option key={index} value={gtype.id}>
                                                {gtype.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <style>
                                {`
          .form-control::placeholder {
            color: gray; /* Placeholder color */
          }
        `}
                            </style>
                            {loading && (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}


                            {!loading && (
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

                                            </Link>
                                            <h5>
                                                <center>{game.name}</center>
                                            </h5>
                                        </div>
                                    ))}
                                </div>

                            )}
                        </div>
                        {/* RightSideBarHoster Component */}
                        {/* <RightSideBarHoster /> */}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AllGames;
