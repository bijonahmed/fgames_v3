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
import '../components/css/allGamesList.css'; // Import your CSS file
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";


const AllGameList = () => {
    const { user } = AuthUser();
    const { language, content, changeLanguage } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [responsePltFrm, setPltfrmData] = useState([]);
    const { getToken, token, logout } = AuthUser();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const defaultFetch = async () => {
        setLoading(true);
        try {

            const response = await axios.get(`/public/getonlyPltform`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                },
            });
            //console.log("pltfrmData:", response.data);
            setPltfrmData(response.data.data);
        } catch (error) {
            console.error("Error Data:", error);
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                console.log("Unauthorized: Redirecting to login...");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        defaultFetch();

    }, []); // Dependency array includes slug and currentPage

    return (
        <>
            <div style={{ height: 54 }} />
            <Navbar />


            <div className="container-fluid" style={{ minHeight: "100vh" }}>

                <div className="row">
                    <div className="col-2" style={{ marginTop: '-50px' }}>
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

                        {loading ? (
                            <div>
                                <Loader />
                                <span>Loading.....</span>
                            </div>
                        ) : (
                            <div className="grid-container">
                                {responsePltFrm.map((platform) => (
                                    <div className="grid-item" key={platform.id}>
                                        <Link to={`/platform-games/${platform.slug}`} style={{ textDecoration: 'none' }}>
                                            <div className="card">
                                                <img
                                                    src={platform.image}
                                                    alt={platform.name}
                                                    className="platform-image"
                                                />
                                                <div className="card-content">
                                                    <p className="platform-name">{platform.name}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                        )}

                    </div>
                    <div className="col-2" style={{ marginTop: '-50px' }}>
                        <LeftSideBarComponentPlt />
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="row ">
                    <div className="col-md-12" style={{ height: 90 }} />
                </div>
            </div>
            <Footer />

            {/* END */}
        </>
    );
};

export default AllGameList;
