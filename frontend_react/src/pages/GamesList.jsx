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
import Swal from 'sweetalert2'
import $ from 'jquery';
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
    const [show_errorcode, set_errorcode] = useState("");
    const [show_errorMSg, set_errorMessage] = useState("");
    const [show_pltName, set_pltName] = useState("");
    const { token } = AuthUser();
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { http, setToken } = AuthUser();



    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);
    const closeModalWorningMsg = () => setShowModal(false);


    // Function to handle login
    const userLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post("/auth/userLogin", { username, password });
            setToken(response.data.user, response.data.access_token);
            navigate("/game-list"); // Adjust the navigation path as needed
            console.log("Login Successfully");
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            });
            location.reload();
            closeModal();
        } catch (error) {
            const fieldErrors = error.response?.data.errors || {};
            setErrors({
                general: fieldErrors.account
                    ? fieldErrors.account[0]
                    : "Invalid username or password.",
                ...fieldErrors,
            });
        }

    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordlChange = (e) => {
        setPassword(e.target.value);
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

            <div>

                <div style={{ height: 54 }} />

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

                            <marquee behavior="scroll" scrollamount={5} direction="left">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Unde, neque! </marquee>

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
                                        <div>$ 00.00 <button><i className="fa-solid fa-arrows-rotate rotate" onClick={() => platformList(4)} /></button></div>
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
                                            <div>Loading.....</div>
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
                            {/* <button className="btn btn-primary" onClick={openModal}>
                                Login
                            </button> */}
                            {/*Games part start here */}
                            <div className="row mt-3 px-3" style={{ borderRadius: 5 }}>
                                <div className="game_icon text-center py-2" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(239,229,253,1) 0%,rgba(195,169,243,1) 100%)' }}>
                                    <h6>{showPltformNameName}</h6>

                                </div>
                                <div className="loader-container">
                                    {pltfrmLoading && (
                                        <>
                                            <Loader />
                                            <span>Loading.....</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="scrollTwo mt-3">
                                <div className=" game_part_new mt-0">
                                    {responsePltfrm.map((game) => (
                                        <div key={game.id} className="game-container">
                                            <div className="game_pic">
                                                <Link to="#" className="btn_fav_pop">
                                                    <div className="image-wrapper">
                                                        <img
                                                            src={game.imagepath || "/theme_fansgames/images/dimond.png"} // Fallback image if imagepath is empty
                                                            loading="lazy"
                                                            alt={game.name}
                                                            className="imgFluid"
                                                        />
                                                        <div className="hover-overlay">
                                                            {token ? (
                                                                <span
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        playPlatformGame(game); // Call play function
                                                                    }}>
                                                                    Play
                                                                </span>
                                                            ) : (
                                                                <span onClick={openModal}>Login</span>
                                                            )}
                                                        </div>

                                                    </div>
                                                </Link>
                                            </div>
                                            <h5 className="text-center mb-1" style={{ textAlign: 'center' }}><center>{game.name}</center></h5>
                                        </div>
                                    ))}
                                   
                                </div>
                            </div>

                        </div>
                    </div>
                </div>








                {/* gaming part end here  */}
                {/* -=========footer start ========-  */}
                {/* <div className="container">
                    <div className="row ">
                        <div className="col-md-12" style={{ height: 70 }} />
                    </div>
                </div> */}
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal modal_onload fade show"
                    id="onloadpopup"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content h-100">
                            <div className="modal-body text-center">
                                <h3>{show_pltName}</h3>
                                <h4>Error code: {show_errorcode}</h4>
                                <h4>Response: {show_errorMSg}</h4>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button onClick={closeModalWorningMsg} className="btn btn-danger">
                                    Close
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Login Popup Modal */}
            {/* Modal (Bootstrap modal) */}
            {isModalOpen && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="loginModal"
                    aria-hidden="true"
                    style={{ display: 'block' }} // Ensures the modal is shown
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModal">
                                    Login
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Login form */}
                                <div className="">
                                    <div className="">
                                        <div className="user_icon">
                                            <i className="fa-solid fa-user "></i>
                                        </div>
                                        <form onSubmit={userLogin}>
                                            <center>{errors.account && <div style={{ color: 'red' }}>{errors.account[0]}</div>}</center>
                                            {/* Username Field */}
                                            <div className="input_group">
                                                <i className="fa-solid fa-user"></i>
                                                <label htmlFor="User_name">User Name</label>

                                                <input type="text" id="User_name" className="form-control" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
                                                <center><small>{errors.username && (<div style={{ color: "red" }}>{errors.username[0]}</div>)}</small></center>
                                            </div>

                                            {/* Password Field */}
                                            <div className="input_group">
                                                <label htmlFor="password">Password</label>

                                                <i className="fa-solid fa-lock"></i>
                                                <input type="password" id="password" className="form-control" placeholder="Enter your password" value={password} onChange={handlePasswordlChange} />
                                                <center><small>{errors.password && (
                                                    <div className="error" style={{ color: "red" }}>
                                                        {errors.password[0]}
                                                    </div>
                                                )}</small></center>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn_login"
                                                onClick={userLogin}>
                                                Login
                                            </button>
                                            <div className="text-center mt-2">
                                                <a href="#" style={{ textDecoration: 'none' }}>Forget Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                                    Don't have an account? Sign Up
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            {/* END */}
        </>
    );
};

export default GamesList;
