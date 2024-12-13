import React, { useState,useEffect } from "react";
import { Helmet } from 'react-helmet';
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
import MiniSidebar from "../components/MiniSidebar";
import AuthUser from "../components/AuthUser";




const Transaction = () => {


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
                <h1 className="page_title">Transaction</h1>
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
                  {/*----------------------*/}
                  <div className="deposit_sec balance_container">
                    <div className="dropdown_filters">
                      <div className="form-group ">
                        <select className="form-control">
                          <option value>Deposit</option>
                          <option value>Withdraw</option>
                          <option value>Swap</option>
                          <option value>Buy Crypto</option>
                          <option value>Bill</option>
                          <option value>Bonus</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select  className="form-control">
                          <option value>All Assets</option>
                          <option value>BDT</option>
                          <option value>USD</option>
                          <option value>USDT</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option value>Past 90 days</option>
                          <option value>Past 60 days</option>
                          <option value>Past 30 days</option>
                          <option value>Past 7 days</option>
                          <option value>Past 24 hours</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option value>All Status</option>
                          <option value>Complete</option>
                          <option value>Processing</option>
                          <option value>Failed</option>
                          <option value>Canceled</option>
                        </select>
                      </div>
                    </div>
                    <table className="transection_table">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th className="text-center">Merchant Id</th>
                          <th className="text-center">Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className=" text-light fw-bold">Withdraw</td>
                          <td className="text-center ">97234728923</td>
                          <td className="text-center"> <span className="text-success fw-bold">+$5.00</span></td>
                          <td>Ongoing</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-center text-white py-2 mt-3">No More</p>
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

export default Transaction;
