import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";

import GameSlider from "../components/GameSlider";
import '../components/css/Pagination.css';
import axios from "/config/axiosConfig";



const HosterDetails = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rowData, setData] = useState([]);
    const [gallaryData, setGallary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); // State to track loading errors

    // Function to handle iframe error event
    const handleError = () => {
        setIsLoading(false); // Set loading to false if there's an error
    };



    const { slug } = useParams();
    console.log("Slug=" + slug);
    //const [quesAns, setQuestionAns] = useState([]);

    const defaultFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/checkHosterProfile/${slug}`);
            setData(response.data.row);
            setGallary(response.data.gallary);
            //setTotalPages(response.data.last_page); // Get total pages from response
        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Simulate the delay if needed
        }, 6000);
        defaultFetch();

    }, [slug]);


    const handleLoad = () => {
        setIsLoading(false);
    };



    // Define the default image URL
    const defaultImage = 'https://c.tenor.com/XasjKGMk_wAAAAAC/load-loading.gif'; // Update with your default image URL

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
                <title>Hoster List</title>
            </Helmet>

            <GuestNavbar />
            <div className="main_content">
                <LeftSideBarComponent />


                <div className="main_section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-9">

                                <div className="live_player" style={{ position: 'relative' }}>
                                    <iframe
                                        width="100%"
                                        height="500px"
                                        src={rowData.embed} // Use the dynamic source
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        onLoad={handleLoad} // Trigger handleLoad when the iframe loads
                                        onError={handleError} // Handle iframe loading error
                                        style={{ display: isLoading ? 'none' : 'block' }} // Hide iframe while loading
                                    />
                                </div>
                                <GameSlider />

                                <div className="row">
                                    <div className="col-6 d-flex justify-content-start">
                                        <div className="title_section">
                                            <Link to="#" onClick={() => navigate(-1)}>
                                                <i className="fa-solid fa-chevron-left" />
                                            </Link>
                                            <h1 className="page_title">Hoster List</h1>
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end">
                                        <div className="title_section">

                                            <h1 className="page_title">More Games</h1>&nbsp;
                                            <Link to="/games-list/pg">
                                                <i className="fa-solid fa-chevron-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>



                                <div>
                                    <nav className="tab_buttons">
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" style={{ backgroundColor: "black" }}>Bio</button>
                                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" style={{ backgroundColor: "black" }}>Images</button>
                                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" style={{ backgroundColor: "black" }}>Videos</button>
                                        </div>
                                    </nav>

                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                            <div>
                                                <table style={{
                                                    width: '100%',
                                                    borderCollapse: 'collapse',
                                                    backgroundColor: '#232626',
                                                    color: 'white'
                                                }}>
                                                    <tbody>
                                                        <tr>
                                                            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid white' }}>Category:</th>
                                                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{rowData.category}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid white' }}>Title:</th>
                                                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{rowData.title}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid white' }}>Keywords:</th>
                                                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{rowData.keywords}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab text-white my-3">
                                            <div className="main_hosterList">

                                                {gallaryData.map((item) => (
                                                    <div className="hoster_" key={item.id}>
                                                        {/* <Link to={`/hoster-profile/${slug}`} className="home_hoster_link">
                                                            <ImageWithFallback src={item.thumb_src} alt={item.id} className="img-fluid" />
                                                        </Link> */}
                                                        <Link to="#" className="home_hoster_link">
                                                            <ImageWithFallback src={item.thumb_src} alt={item.id} className="img-fluid" />
                                                        </Link>
                                                    </div>
                                                ))}




                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab text-white">
                                            {/* game list part start here  */}
                                            <section className="game_list_container my-3">

                                                <div className="iframe-container" style={{ marginTop: '20px' }}>
                                                    <iframe
                                                        src={rowData.embed} // Use the dynamic value here
                                                        title="Embedded video"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        style={{
                                                            width: '20%',
                                                            height: '315px',
                                                        }}
                                                    ></iframe>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>



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
                                    <a href="#">
                                        <div className="ads_section_two">
                                            <img src="/images/adsbannar.webp" alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </a>


                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

                <div className="main_section d-none">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-9">
                                <div className="banner_section">
                                    <div className="swiper bannerSlider">
                                        {/* SliderComponent Component */}
                                        {/* <SliderComponent /> */}
                                        <div className="swiper-pagination" />
                                    </div>
                                </div>

                                {/* GameSlider Component */}
                                <GameSlider />
                                <div>
                                    {/* <pre>{JSON.stringify(categoryData, null, 2)}</pre> */}
                                </div>
                                <div>
                                    <div className="title_section">
                                        <a href="#" onClick={() => navigate(-1)}>
                                            <i className="fa-solid fa-chevron-left" />
                                        </a>
                                        <h1 className="page_title">Hoster List </h1>
                                    </div>

                                    <div className="main_hosterList">

                                        {gallaryData.map((item) => (
                                            <div className="hoster_" key={item.id}>
                                                <Link to={`/hoster-details/${item.api_id}`} className="home_hoster_link">
                                                    <ImageWithFallback src={item.thumb_src} alt={`Model ${item.id}`} className="img-fluid" />
                                                </Link>
                                            </div>
                                        ))}

                                    </div>





                                </div>

                            </div>
                            {/* RightSideBarHoster Component */}
                            <div className="col-xxl-3 d-xxl-block d-none ">
                                <div className="right_sidebar">
                                    <a href="#">
                                        <div className="ads_section">
                                            <img
                                                src="/images/250x250_Google_ads_size.gif"
                                                alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div className="ads_section_two">
                                            <img
                                                src="/images/adsbannar.webp"
                                                alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </a>
                                    <div className="slier_header">
                                        <h5>Game Providers</h5>
                                        <div className="slide_nav">
                                            <a href="#">
                                                All <i className="fa-regular fa-chevron-right" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="providers_container_two">
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(1).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(2).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(3).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(4).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(5).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(6).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(7).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(8).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(9).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(10).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(11).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/images/providers/providers(12).png"
                                                alt="pic"
                                                className="img-fluid"
                                            />
                                        </a>
                                    </div>
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

export default HosterDetails;
