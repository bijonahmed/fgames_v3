import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import AuthUser from "../components/AuthUser";
import { LanguageContext } from "../context/LanguageContext";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from 'swiper/react';
import GameSlider from "../components/GameSlider";
import { Pagination, Autoplay } from 'swiper/modules';
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

    const images = [
        'https://via.placeholder.com/100x100?text=1',
        'https://via.placeholder.com/100x100?text=2',
        'https://via.placeholder.com/100x100?text=3',
        'https://via.placeholder.com/100x100?text=4',
        'https://via.placeholder.com/100x100?text=5',
        'https://via.placeholder.com/100x100?text=6',
        'https://via.placeholder.com/100x100?text=7',
        'https://via.placeholder.com/100x100?text=8',
        'https://via.placeholder.com/100x100?text=9',
        'https://via.placeholder.com/100x100?text=10',
    ];
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
            <Navbar />



            <div style={{ height: 54 }} />


            <Navbar />
            <div className="container-fluid" style={{ minHeight: "100vh" }}>
                <div className="row">
                    <div className="col-3">
                        <LeftSideBarComponent />
                    </div>
                    <div className="col-9 mt-4" >
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

                </div>
            </div>
            <Footer />





















            <Footer />

            {/* END */}
        </>
    );
};

export default AllGameList;
