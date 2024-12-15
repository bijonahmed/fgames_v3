import React, { useState, useEffect, useContext } from "react";
import Slider from 'react-slick';
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import AuthUser from "../components/AuthUser";
import { LanguageContext } from "../context/LanguageContext";
import '../components/css/GameList.css'; // Import your CSS file
import { Carousel } from 'react-bootstrap';
import Loader from "../components/Loader";
const GamesList = () => {

    const { user } = AuthUser();
    const { language, content, changeLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pltfrmLoading, setLoadingPltfrm] = useState(true);
    const [showPltformNameName, setPlatformName] = useState("");
    const [responseGameType, setData] = useState([]);
    const [responsePltfrm, setPlatformData] = useState([]);
    const [gametypeId, setGameTypeId] = useState("");
    const { token } = AuthUser();
    // Function to handle the Axios request and navigation
    const playPlatformGame = async (slug) => {
        setLoadingPltfrm(true);
        console.log("gametype:", gametypeId);
        console.log("platType:", slug);

        try {
            const response = await axios.post('/games/platformTypeGames', {
                platType: slug,
                gameType: gametypeId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(`reponse url: ${response.data.response_url.data.url}`);
            if (response.data.success && response.data.response_url.data.url) {
                window.open(response.data.response_url.data.url, '_blank');
            } else {
                console.error('No URL found in the response');
            }

        } catch (error) {
            console.error('Error sending game data:', error);
        } finally{
            setLoadingPltfrm(false);
        }
    };
    const defaultFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/allGamesType/`);
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
            const response = await axios.get('/public/gameTypeWisePlatformList/', {
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

            {/* Start */}
            <div>
                {/* space  */}
                <div style={{ height: 54 }} />
                {/* navbar end here  */}
                {/* banner part start here  */}

                <div className="container-fluid">
                    <div className="row">
                        <Carousel className="custom-carousel">
                            <Carousel.Item>
                                <a href="#">
                                    <img
                                        src="/theme_fansgames/images/sliders/slider(1).jpg"
                                        className="d-block w-100 img-fluid"
                                        alt="Slide 1" style={{ maxHeight: '350px', borderRadius: '15px' }}
                                    />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a href="#">
                                    <img
                                        src="/theme_fansgames/images/sliders/slider(2).jpg"
                                        className="d-block w-100 img-fluid"
                                        alt="Slide 2" style={{ maxHeight: '350px', borderRadius: '15px' }}
                                    />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a href="#">
                                    <img
                                        src="/theme_fansgames/images/sliders/slider(3).jpg"
                                        className="d-block w-100 img-fluid"
                                        alt="Slide 3" style={{ maxHeight: '350px', borderRadius: '15px' }}
                                    />
                                </a>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                {/* bannar part end here  */}

                {/* sound part start here  */}
                <div className="container-fluid">
                    <div className="sound">
                        <div className="volume">
                            <i className="fa-solid fa-volume-high" />
                        </div>
                        <div>
                            <p>
                                <marquee behavior="scroll" scrollamount={5} direction="left">Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Unde, neque! </marquee>
                            </p>
                        </div>
                        <div>
                            <a href="#"><i className="fa-solid fa-list" />Lorem</a>
                        </div>
                    </div>
                </div>

                {/* profile and function part start here  */}
                <div className="container-fluid">
                    <div className="profile_func">
                        <div className="row">
                            <div className="col-4">
                                <div className="profile">
                                    <div>
                                        <h1>{user?.name ? user.name : user?.email ? user.email : 'User'}</h1>
                                    </div>
                                    <div>
                                        <p>$ 00.00 <button><i className="fa-solid fa-arrows-rotate rotate" /></button></p>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="col-8"> */}
                            <div className="col-8 d-flex justify-content-center align-items-center">
                                <div className="s_width">
                                    <a href="deposite.html" style={{ textDecoration: 'none' }}>
                                        <div className="option op_withdraw">
                                            <img src="/theme_fansgames/images/money-bag-green60.png" />
                                            <h3>Deposite</h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="s_width">
                                    <a href="withdraw.html" style={{ textDecoration: 'none' }}>
                                        <div className="option op_reward">
                                            <img src="/theme_fansgames/images/cash_in.png" />
                                            <h3>width</h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="s_width">
                                    <a href="referal.html" style={{ textDecoration: 'none' }}>
                                        <div className="option op_refer">
                                            <img src="/theme_fansgames/images/gift-box.png" />
                                            <h3>Refer</h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="s_width">
                                    <a href="pricing.html" style={{ textDecoration: 'none' }}>
                                        <div className="option op_mail">
                                            <img src="/theme_fansgames/images/dimond.png" />
                                            <h3>Dimond</h3>
                                        </div>
                                    </a>
                                </div>
                                {/* </div> */}
                                {/* </div> */}
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                {/* profile and functions part end here  */}
                {/* gaming part start here  */}
                <div className="container-fluid ">
                    <div className="row ">
                        {/* {showPltformNameName} */}
                        <div className="col-3 scroll mt-3"> {/*cat part start here */}
                            <div className="row">
                                <div className="col-12">
                                    <div>
                                        {/* Show loading spinner or any loader */}
                                        {loading ? (
                                            <p>Loading.....</p>
                                        ) : (
                                            responseGameType.map((gameType) => (
                                                <div
                                                    className={`cat sub_cat ${activeId === gameType.id ? "active" : ""}`}
                                                    key={gameType.id}
                                                    onClick={() => handleGameTypeClick(gameType.id)}>
                                                    {/* [{gameType.id}] */}
                                                    <Link to="#">
                                                        <img
                                                            src={gameType.imagepath}
                                                            alt={gameType.name}
                                                            onError={(e) => (e.target.src = "/theme_fansgames/images/dimond.png")} // Fallback image
                                                        />
                                                        <h4>{gameType.name}</h4>
                                                    </Link>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div> {/*cat part end here */}
                        <div className="col-9 ">
                            {/*Games part start here */}
                            <div className="row mt-3 px-3" style={{ borderRadius: 5 }}>
                                <div className="game_icon text-center py-2" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(239,229,253,1) 0%,rgba(195,169,243,1) 100%)' }}>
                                    <h6>{showPltformNameName}</h6>

                                </div>
                                <center> {pltfrmLoading && <p><Loader />Loading.....</p>}</center>
                            </div>
                            <div className="scrollTwo mt-3">
                                <div className=" game_part_new mt-0">

                                    {responsePltfrm.map((game) => (
                                        <div key={game.id}>
                                            <div className="game_pic">
                                                <Link to="#" onClick={(e) => {
                                                    e.preventDefault(); // Prevent default link behavior
                                                    playPlatformGame(game.slug);
                                                }} className="btn_fav_pop">
                                                    <img
                                                        src={game.imagepath || "/theme_fansgames/images/dimond.png"} // Fallback image if imagepath is empty
                                                        loading="lazy"
                                                        alt={game.name}
                                                        className="img-fluid" />
                                                </Link>

                                            </div>
                                            <p className="text-center mb-1">{game.name}</p>

                                        </div>

                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* gaming part end here  */}
                {/* -=========footer start ========-  */}
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12" style={{ height: 70 }} />
                    </div>
                </div>
            </div>

            <Footer />

            {/* END */}
        </>
    );
};

export default GamesList;
