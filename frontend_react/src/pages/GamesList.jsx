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
const GamesList = () => {

    const { user } = AuthUser();
    const { language, content, changeLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [responseData, setData] = useState([]);
    const [platform_name, gtypeName] = useState();



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    // const defaultFetch = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(`/public/gameTypeWiseCategory/${slug}`);
    //         setData(response.data.data); // Set the video data
    //         gtypeName(response.data.platform_name); // Set the video data
    //         //setTotalPages(response.data.last_page); // Get total pages from response
    //     } catch (error) {
    //         console.error("Error Data:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        // defaultFetch();
    }, []); // Dependency array includes slug and currentPage

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
                        <div className="col-3 scroll mt-3"> {/*cat part start here */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="cat sub_cat active">
                                        <a href="#">
                                            <img src="/theme_fansgames/images/fire.png" />
                                            <h4>Video</h4>
                                        </a>
                                    </div>
                                    <div className="cat sub_cat">
                                        <a href="#">
                                            <img src="/theme_fansgames/images/chips.png" />
                                            <h4>Slot machine</h4>
                                        </a>
                                    </div>
                                    <div className="cat sub_cat">
                                        <a href="#">
                                            <img src="/theme_fansgames/images/card.png" />
                                            <h4>lottery</h4>
                                        </a>
                                    </div>
                                    <div className="cat sub_cat">
                                        <a href="#">
                                            <img src="/theme_fansgames/images/jackpot.png" />
                                            <h4>sports</h4>
                                        </a>
                                    </div>
                                    <div className="cat sub_cat">
                                        <a href="#">
                                            <img src="/theme_fansgames/images/football.png" />
                                            <h4>e-sports</h4>
                                        </a>
                                    </div>
                                    <div className="cat sub_cat">
                                        <a href="#">
                                            <img src="/theme_fansgames/images/fire.png" />
                                            <h4>hunting</h4>
                                        </a>
                                    </div>
                                    <div className="cat sub_cat">
                                        <a href="#">
                                            <img src="/theme_fansgames/images/chips.png" />
                                            <h4>chess and cards</h4>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div> {/*cat part end here */}
                        <div className="col-9 ">
                            {/*Games part start here */}
                            <div className="row mt-3 px-3" style={{ borderRadius: 5 }}>
                                <div className="game_icon text-center py-2" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(239,229,253,1) 0%,rgba(195,169,243,1) 100%)' }}>
                                    <h6 className="m-0">AG</h6>
                                </div>
                            </div>
                            <div className="scrollTwo mt-3">
                                <div className=" game_part_new mt-0">
                                    <div className="game_pic">
                                        <a href="games.html" className="btn_fav_pop">
                                            <img src="/theme_fansgames/images/Joker_Poker.png" loading="lazy" className="img-fluid" />
                                        </a>
                                    </div>
                                    <div className="game_pic">
                                        <a href="games.html" className="btn_fav_pop">
                                            <img src="/theme_fansgames/images/baccarat_512.jpg" loading="lazy" className="img-fluid" />
                                        </a>
                                    </div>
                                    <div className="game_pic">
                                        <a href="games.html" className="btn_fav_pop">
                                            <img src="/theme_fansgames/images/gaming guide web_BACCARAT 580.jpg" loading="lazy" className="img-fluid" />
                                        </a>
                                    </div>

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
