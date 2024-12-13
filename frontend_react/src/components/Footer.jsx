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
                <a href="index.html" className="text-center"><img src="/theme_fansgames/images/reels-60.png" className="img-fluid" /><br />
                  <p>Reels</p>
                </a>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <a href="hostlist.html" className="text-center"><img src="/theme_fansgames/images/live-streaming.png" className="img-fluid" /><br />
                  <p>stream</p>
                </a>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <a href="ranking.html" className="text-center"><img src="/theme_fansgames/images/trophy.png" className="img-fluid" /><br />
                  <p>Rank</p>
                </a>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <a href="gamelist.html" className="text-center"><img src="/theme_fansgames/images/casino (1).png" className="img-fluid" /><br />
                  <p>Games</p>
                </a>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ width: '20%' }}>
                <a href="profile.html" className="text-center"><img src="/theme_fansgames/images/user.png" className="img-fluid" /><br />
                  <p>User</p>
                </a>
                {/* <a href="logout.html" class="text-center"><img src="images/logout-60.png" class="img-fluid" alt=""><br><p>Logout</p></a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
