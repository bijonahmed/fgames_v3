import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from 'react-router-dom'; // Combine imports from react-router-dom
import AuthUser from "../components/AuthUser";
const Footer = () => {
  const { content } = useContext(LanguageContext);
  const navigate = useNavigate(); // Move useNavigate inside the component


  const { token, logout } = AuthUser();

  const logoutUser = async () => {
    if (token) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <>
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 d-flex">
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <Link to="/" className="text-center"><img src="/theme_fansgames/images/reels-60.png" className="img-fluid" /><br />
                  <p>Reels</p>
                </Link>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <Link to="/model-list" className="text-center"><img src="/theme_fansgames/images/live-streaming.png" className="img-fluid" /><br />
                  <p>Stream</p>
                </Link>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <Link to="#" className="text-center"><img src="/theme_fansgames/images/trophy.png" className="img-fluid" /><br />
                  <p>Rank</p>
                </Link>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <Link to="/game-list" className="text-center"><img src="/theme_fansgames/images/casino (1).png" className="img-fluid" /><br />
                  <p>Games</p>
                </Link>
              </div>


              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                {token ? (
                  // If token exists, show user profile link
                  <Link to="/user/profile" className="text-center">
                    <img src="/theme_fansgames/images/user.png" className="img-fluid" alt="User" /><br />
                    <p>User</p>
                  </Link>
                ) : (
                  // If no token, show login link
                  <Link to="/login" className="text-center">
                    <img src="/theme_fansgames/images/user.png" className="img-fluid" alt="User" /><br />
                    <p>User</p>
                  </Link>
                )}
              </div>




            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
