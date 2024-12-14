import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import '../components/css/Pagination.css';

import axios from "/config/axiosConfig";

const PornModels = () => {
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
                                <div>
                                    {/* Start Models */}

                                    <div>
                                        <div>
                                        dfdf
                                        </div>
                                    </div>

                                    {/* END Model */}
                                </div>

                            </div>
                            {/* RightSideBarHoster Component */}
                            <div className="col-xxl-3 d-xxl-block d-none ">
                                <div className="right_sidebar">
                                    <Link to="/games-list/pg">
                                        <div className="ads_section">
                                            <img
                                                src="/images/250x250_Google_ads_size.gif"
                                                alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </Link>
                                    <Link to="/games-list/pg">
                                        <div className="ads_section_two">
                                            <img
                                                src="/images/adsbannar.webp"
                                                alt="pic"
                                                className="ads_image img-fluid"
                                            />
                                        </div>
                                    </Link>
                                    <div className="slier_header d-none">
                                        <h5>Game Providers</h5>
                                        <div className="slide_nav">
                                            <a href="games.html">
                                                All <i className="fa-regular fa-chevron-right" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="providers_container_two d-none">
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

export default PornModels;
