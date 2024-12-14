import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
const Footer = () => {
  const { content } = useContext(LanguageContext);


  
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
                <Link to="/user/profile" className="text-center"><img src="/theme_fansgames/images/user.png" className="img-fluid" /><br />
                  <p>User</p>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
