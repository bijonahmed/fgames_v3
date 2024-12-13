import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import MiniSidebar from "../components/MiniSidebar";
import AuthUser from "../components/AuthUser";

const Wallet = () => {
  const navigate = useNavigate();

  const { getToken, token, logout } = AuthUser();
  const { user } = AuthUser();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to the login page if `user` is null or undefined
    }
  }, [user, navigate]);


  return (
    <>
      <Helmet>
        <title>Wallet</title>
      </Helmet>

      <GuestNavbar />
      <LeftSideBarComponent />

      {/* main content part star herer  */}
      <div className="main_section">
      {/* Main section start here */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="title_section">
              <a onClick={() => navigate(-1)}>
                <i className="fa-solid fa-chevron-left" />
              </a>
              <h1 className="page_title">Wallet</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-9">
            <div className="row">
              <div className="col-md-4">
              <MiniSidebar/>
              </div>
              <div className="col-md-8">
                <div className="balance_container">
                  <div className="balance_content">
                    <div className="balance_box">
                      <p>Total Balance</p>
                      <h1>$5.01</h1>
                    </div>
                    <div className="balance_box">
                      <p>Real Money</p>
                      <h1>$0.00</h1>
                    </div>
                    <div className="balance_box">
                      <p>Bonus Money</p>
                      <h1>$5.01</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right side part start here */}
          <div className="col-xxl-3 d-xxl-block d-none">
            <div className="right_sidebar">
              <a href="games.html">
                <div className="ads_section">
                  <img src="/images/300x600.gif" className="ads_image img-fluid" alt="Ad Banner" />
                </div>
              </a>
              <a href="games.html">
                <div className="ads_section_two">
                  <img src="/images/adsbannar.webp" className="ads_image img-fluid" alt="Ad Banner" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer part start here */}
      <Footer />
      {/* Footer part end here */}
    </div>

    </>
  );
};

export default Wallet;
