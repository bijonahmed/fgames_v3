import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import SliderComponent from "../components/SliderComponent";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import GameSlider from "../components/GameSlider";
import '../components/Pagination.css';
import axios from "/config/axiosConfig";



const Adultcategory = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryData, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 30; // Example total pages

    const { slug } = useParams();
    console.log("Slug=" + slug);
    //const [quesAns, setQuestionAns] = useState([]);

    const defaultFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/public/getCategorySlug/${slug}`, {
                params: {
                    page: currentPage // Current page number
                }
            });
            setData(response.data.data); // Set the video data
            //setTotalPages(response.data.last_page); // Get total pages from response
        } catch (error) {
            console.error("Error Data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        defaultFetch();
    }, [slug, currentPage]); // Dependency array includes slug and currentPage




    const ImageWithFallback = ({ src, alt }) => {
        const [imageSrc, setImageSrc] = useState(src);

        const handleError = () => {
            setImageSrc('/images/casino-9P3_MIUy.webp'); // Set the default image path
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
                                <div className="banner_section">
                                    <div className="swiper bannerSlider">
                                        {/* SliderComponent Component */}
                                        <SliderComponent />
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
                                    {/* Hoster list  here  */}
                                    {loading ? ( // Conditional rendering based on loading state
                                      <center>
                                      <Loader />
                                      <div className="loading-indicator">
                                          <img src="/images/loader.gif" />
                                          <span className="text-black">Loading.....</span>
                                      </div>
                                  </center>
                                        // <div className="loading">Loading...</div>
                                    ) : (
                                        <div className="main_hosterList">
                                            {categoryData.length > 0 ? (
                                                categoryData.map((category, index) => (
                                                    <div className="hoster_" key={index}> {/* Key prop should be on this div */}
                                                        <Link to={`/hoster-details/${category.api_id}`} className="home_hoster_link">
                                                            <ImageWithFallback src={category.thumb_src} className="img-fluid" />
                                                        </Link>
                                                    </div>
                                                ))
                                            ) : (
                                                <p></p> // Optional: message if array is empty
                                            )}


                                        </div>
                                    )}

                                    {/* Pagination Controls */}
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>

                            </div>
                            {/* RightSideBarHoster Component */}
                            <div className="col-xxl-3 d-xxl-block d-none ">
                                <div className="right_sidebar">
                                    <a href="games.html">
                                        <div className="ads_section">
                                            <img
                                                src="/images/250x250_Google_ads_size.gif"
                                                alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </a>
                                    <a href="games.html">
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
                                            <a href="games.html">
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

export default Adultcategory;
