import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import AuthUser from "../components/AuthUser";
import { LanguageContext } from "../context/LanguageContext";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import LeftSideBarComponentPlt from "../components/LeftSideBarComponentAlllGames";
import Loader from "../components/Loader";

import Carousel from 'react-bootstrap/Carousel';

import { useNavigate } from "react-router-dom";


const AllGameList = () => {

    const { user } = AuthUser();
    const { language, content, changeLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pltfrmLoading, setLoadingPltfrm] = useState(true);
    const [showPltformNameName, setPlatformName] = useState("");
    const [responseGameType, setData] = useState([]);
    const [responsePltfrm, setPlatformData] = useState([]);
    const [gametypeId, setGameTypeId] = useState("");
    const [show_errorcode, set_errorcode] = useState("");
    const [show_errorMSg, set_errorMessage] = useState("");
    const [show_pltName, set_pltName] = useState("");
    const { token } = AuthUser();
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Function to handle the Axios request and navigation
    const playPlatformGame = async (game) => {
        setLoadingPltfrm(true);
        console.log("gametype:", gametypeId);
        console.log("platType:", game.slug);

        try {
            const response = await axios.post('/games/platformTypeGames', {
                platType: game.slug,
                gameType: gametypeId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.status == 200) {

                if (response.data.success && response.data.url) {
                    console.log(`Response URL: ${response.data.url}`);
                    window.open(response.data.url, '_blank');
                } else {
                    console.error('No URL found in the response');
                }
            } else if (response.data.status == 422) {

                const errorCode = response.data.code;
                const pltName = game.name;
                const errorMessage = response.data.message || 'An unknown error occurred.';
                setShowModal(true);
                set_errorcode(errorCode);
                set_errorMessage(errorMessage);
                set_pltName(pltName);

                console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
                //alert(`Error: ${errorMessage} (Code: ${errorCode})`);
            } else {
                console.error('Unhandled response status:', response.status);
                alert('An unexpected error occurred. Please try again later.');
            }

        } catch (error) {
            console.error('Error sending game data:', error);
        } finally {
            setLoadingPltfrm(false);
        }
    };
    const defaultFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/allGamesType`);
            //console.log("pltfrmData:" + response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoading(false);
        }
    };

    const platformList = async (game_type_id) => {
        setGameTypeId(game_type_id);
        setLoadingPltfrm(true);
        try {
            const response = await axios.get('/public/gameTypeWisePlatformList', {
                params: {
                    game_type_id: game_type_id
                }
            });
            setPlatformData(response.data.data);
            setPlatformName(response.data.gameType_name);
        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoadingPltfrm(false);
        }
    };

    const [activeId, setActiveId] = useState(
        responseGameType.length > 0 ? responseGameType[0].id : null
    );
    const handleGameTypeClick = (id) => {
        console.log(`Game Type ID: ${id}`);
        setActiveId(id); // Update the active ID
        platformList(id);
    };

    useEffect(() => {
        defaultFetch();
        handleGameTypeClick(4);
        platformList(4);
    }, []); // Dependency array includes slug and currentPage

    return (
        <>
            <div style={{ height: 54 }} />
            <Navbar />


            <div className="container-fluid" style={{ minHeight: "100vh" }}>

                <div className="row">
                    <div className="col-2">
                        <LeftSideBarComponent />
                    </div>
                    <div className="col-8 mt-4" >

                        <div style={{
                             display: 'block',
                             width: '100%',
                             height: '300px',
                             borderRadius: '5px',
                             background: 'linear-gradient(135deg,#aea5f4, // Gradient background',
                             boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)', // Subtle shadow
                             padding: '5px',
                             overflow: 'hidden'

                        }}>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                <Carousel.Item interval={1500}>
                                    <img
                                        className="d-block w-100"
                                        src="/theme_fansgames/images/sliders/slider(1).jpg"
                                        alt="Image One"
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Carousel.Caption>
                                        <h3>Label for first slide</h3>
                                        <p>Sample Text for Image One</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={500}>
                                    <img
                                        className="d-block w-100"
                                        src="/theme_fansgames/images/sliders/slider(2).jpg"
                                        alt="Image Two"
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Carousel.Caption>
                                        <h3>Label for second slide</h3>
                                        <p>Sample Text for Image Two</p>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item interval={500}>
                                    <img
                                        className="d-block w-100"
                                        src="/theme_fansgames/images/sliders/slider(3).jpg"
                                        alt="Image Two"
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Carousel.Caption>
                                        <h3>Label for second slide</h3>
                                        <p>Sample Text for Image Two</p>
                                    </Carousel.Caption>
                                </Carousel.Item>


                            </Carousel>
                        </div>
                        <br />
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.
                        Make sure your container has enough space for the images. If necessary, inspect your layout using developer tools to ensure everything is sized correctly.

                    </div>
                    <div className="col-2">
                        <LeftSideBarComponentPlt />
                    </div>

                </div>
            </div>
            <Footer />





















            <Footer />

            {/* END */}
        </>
    );
};

export default AllGameList;
