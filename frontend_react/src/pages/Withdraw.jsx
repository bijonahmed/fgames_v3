import React, { useState,useEffect } from "react";
import { Helmet } from 'react-helmet';
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import MiniSidebar from "../components/MiniSidebar";
import AuthUser from "../components/AuthUser";


const Withdraw = () => {

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
        <title>Withdraw</title>
      </Helmet>

      <GuestNavbar />
      <LeftSideBarComponent />
      <div className="main_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="title_section">
                <button onClick={() => navigate(-1)} style={{
                  fontSize: "14px",
                  background: "rgb(70, 79, 80)",
                  padding: "5px",
                  borderRadius: "5px",
                  transition: "0.4s ease-in-out",
                  marginRight: "10px",
                  color: "var(--white-color)"
                }}><i className="fa-solid fa-chevron-left" /></button>
                <h1 className="page_title">Withdraw</h1>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-9">
              <div className="row">
                <div className="col-md-4">
                  {/* Start MiniSidebar */}
                  <MiniSidebar />
                  {/* End MiniSidebar */}
                </div>

                <div className="col-md-8">

                  <div className="deposit_sec balance_container">
                    <form action="" className="withdraw_form">
                      <div className="form-group mb-3">
                        <h6 className="mb-2">Withdraw Currency</h6>
                        <select className="form-control">
                          <option value disabled>Select Network</option>
                          <option value>USD</option>
                          <option value>USDT</option>
                          <option value>BDT</option>
                          <option value>XRP</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <h6 className="mb-2">Withdraw Method</h6>
                        <select className="form-control">
                          <option value disabled>Select Method</option>
                          <option value>TRC20</option>
                          <option value>ERC20</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <h6 className="mb-2">Account number</h6>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-2">Withdraw amount</h6>
                          <h6 className="mb-2">Min: <span className="text-danger mb-0 fw-bold">522USD</span> </h6>
                        </div>
                        <input type="number" className="form-control" />
                        <div className="short_amt">
                          <button type="button" className="btn_amt">Min</button>
                          <button type="button" className="btn_amt">25%</button>
                          <button type="button" className="btn_amt">50%</button>
                          <button type="button" className="btn_amt">Max</button>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-2">Avaiable: 0</h6>
                          <h6 className="mb-2">Locked founds: 0</h6>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-2">Withdrawal amount:</h6>
                          <h6 className="mb-2">0</h6>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-2">Marchant Fee:</h6>
                          <h6 className="mb-2">0</h6>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-xxl-3 d-xxl-block d-none ">
              <div className="right_sidebar">
                <a href="games.html">
                  <div className="ads_section">
                    <img src="/images/300x600.gif" className="ads_image img-fluid" />
                  </div>
                </a>
                <a href="games.html">
                  <div className="ads_section_two">
                    <img src="/images/adsbannar.webp" className="ads_image img-fluid" />
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>


    </>

  );
};

export default Withdraw;
