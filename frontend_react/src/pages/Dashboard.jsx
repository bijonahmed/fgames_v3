import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import GuestNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import LeftSideBarComponent from "../components/LeftSideBarComponent";

const Dashboard = () => {
  const { getToken, token, logout } = AuthUser();
  const { user } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to the login page if `user` is null or undefined
    }
  }, [user, navigate]);
  return (
    <>
      <Helmet>
        <title>Welcome to Dashboard</title>
      </Helmet>

     <GuestNavbar />
      <LeftSideBarComponent />
      <div className="main_section">
        {/*main section start here  */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-9">
              <div className="title_section">
                <Link onClick={() => navigate(-1)}><i className="fa-solid fa-chevron-left" /></Link>
                <h1 className="page_title">Welcome to {user?.name || user?.email}! </h1>
              </div>
              {/* profile details section start here  */}
              <div className="user_profile">
                <ul className="nav nav-tabs tab_buttons" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="Bio-tab" data-bs-toggle="tab" data-bs-target="#Bio" type="button" role="tab" aria-controls="Bio" aria-selected="true">Welcome to FG</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="security-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab" aria-controls="security" aria-selected="false">Settings &amp; Privacy</button>
                  </li>

                </ul>
                <div className="tab-content" id="myTabContent">
                  {/* bio */}
                  <div className="tab-pane fade show active" id="Bio" role="tabpanel" aria-labelledby="Bio-tab">
                    {/* profile details section start here  */}
                    <div className="user_profile">
                      <p className="text-justify">
                        FGames is a worldwide online gaming platform that brings entertainment and earning opportunities together. With a variety of exciting games, you can enjoy playing while quickly making real money. It’s easy to start, whether you're a beginner or experienced. FGames makes gaming fun and rewarding, offering everyone a chance to win. Join us today and experience a new way to play and earn!
                      </p>
                    </div>
                    {/* profile style 2 */}
                    <div className="user_profile_2">
                      <div className="profile_section_title pt-5">
                        <h1>Personal details</h1>
                        <Link to="/my-profile" className="btn_action"> Edit</Link>
                      </div>
                      <Link to="/my-profile">Edit Bio</Link>
                      <table>
                        <tbody>
                          <tr>
                            <td className="text-start">FG ID:</td>
                            <td className="text-start"><strong>{user ? <p>{user.fg_id}</p> : <p>Loading...</p>}</strong>
                            </td>
                          </tr>

                          <tr>
                            <td className="text-start">Name:</td>
                            <td className="text-start"><strong>{user ? <p>{user.name}</p> : <p>Loading...</p>}</strong></td>
                          </tr>
                          <tr>
                            <td className="text-start">Email:</td>
                            <td className="text-start"><strong>{user ? <p>{user.email}</p> : <p>Loading...</p>}</strong></td>
                          </tr>
                          <tr>
                            <td className="text-start">Username:</td>
                            <td className="text-start"><strong>{user ? <p>{user.username}</p> : <p>Loading...</p>}</strong></td>
                          </tr>
                          <tr>
                            <td className="text-start">FG Wallet Address:</td>
                            <td className="text-start"><strong>{user ? <p>{user.fg_wallet_address}</p> : <p>Loading...</p>}</strong></td>
                          </tr>

                        </tbody></table>
                    </div>
                  </div>
                  {/* security  */}
                  <div className="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                    {/* security section start here  */}
                    <form action="">
                      <div className="user_profile_2 settings">
                        <div className="profile_section_title pt-5 border-0">
                          <h1>Security Settings</h1>
                        </div>
                        <Link to="/user/change-password">Update Password</Link>
                      
                        
                        
                      </div>
                    </form>
                    {/* security seciton end here  */}
                  </div>

                </div>
              </div>
            </div>
            {/* right side part start here */}
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

export default Dashboard;
