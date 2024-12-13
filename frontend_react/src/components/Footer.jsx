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
            <div className="col-md-12">
              <div className="footer_top">
                <div className="row">
                  <div className="col-md-8">
                    <div className="footer_top_right">
                      <h4>FG Games</h4>
                      <p>
                      {content.lvl_footer_fg_game || "FG Games"}
                      </p>
                      {/* <Link to="/about" className="more_about btn btn-default">
                        More about <i className="fa-solid fa-chevron-right" />
                      </Link> */}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="footer_top_left">
                      <h5>Help us to improve your experience.</h5>
                      <h6>Get rewarded for your valuable feedback!</h6>
                      <div className="form-group">
                        <textarea className="form-control" />
                      </div>
                      <button className="btn more_about">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer_top mb-0">
                <div className="row">
                  <div className="col-md-2 col-4">
                    <div className="footer_link_list">
                      <h5>Casino</h5>
                      <ul>
                        <li>
                          <a href="#">Casino Home</a>
                        </li>
                        <li>
                          <a href="#">Slots</a>
                        </li>
                        <li>
                          <a href="#">Live Casino</a>
                        </li>
                        <li>
                          <a href="#">New Releases</a>
                        </li>
                        <li>
                          <a href="#">Recommended</a>
                        </li>
                        <li>
                          <a href="#">Table Game</a>
                        </li>
                        <li>
                          <a href="#">BlackJacksho</a>
                        </li>
                        <li>
                          <a href="#">Roulette</a>
                        </li>
                        <li>
                          <a href="#">Baccarat</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2 col-4">
                    <div className="footer_link_list">
                      <h5>Sports</h5>
                      <ul>
                        <li>
                          <a href="#">Sports Home</a>
                        </li>
                        <li>
                          <a href="#">Live</a>
                        </li>
                        <li>
                          <a href="#">Rules</a>
                        </li>
                        <li>
                          <a href="#">Sport Betting Insights</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2 col-4">
                    <div className="footer_link_list">
                      <h5>Promo</h5>
                      <ul>
                        <li>
                          <a href="#">Vip Club</a>
                        </li>
                        <li>
                          <a href="#">Affiliate</a>
                        </li>
                        <li>
                          <a href="#">Promotions</a>
                        </li>
                        <li>
                          <a href="#">Lottery</a>
                        </li>
                        <li>
                          <a href="#">Refer a friend</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2 col-4">
                    <div className="footer_link_list">
                      <h5>Support/Legal</h5>
                      <ul>
                        <li>
                          <a href="#">Help Center</a>
                        </li>
                        <li>
                          <a href="#">Important Announcement</a>
                        </li>
                        <li>
                          <a href="#">BlockDance B.V.</a>
                        </li>
                        <li>
                          <a href="#">Gamble Aware</a>
                        </li>
                        <li>
                          <a href="#">Faireness</a>
                        </li>
                        <li>
                          <a href="#">FAQ</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Terms Of Service</a>
                        </li>
                        <li>
                          <a href="#">Law Enforcement</a>
                        </li>
                        <li>
                          <a href="#">Self-exclusion</a>
                        </li>
                        <li>
                          <a href="#">AML</a>
                        </li>
                        <li>
                          <a href="#">Design Resources</a>
                        </li>
                        <li>
                          <a href="#">App</a>
                        </li>
                        <li>
                          <a href="#">Live Support</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2 col-4">
                    <div className="footer_link_list">
                      <h5>About Us</h5>
                      <ul>
                        <li>
                          <a href="#" target="_blank">
                            News
                          </a>
                        </li>
                        <li>
                          <a href="#">Work with us</a>
                        </li>
                        <li>
                          <a href="#">Business Contacts</a>
                        </li>
                        <li>
                          <a href="#">Help Desk</a>
                        </li>
                        <li>
                          <a href="#">Verify Representative</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2 col-4">
                    <div className="footer_link_list">
                      <h5>Social Links</h5>
                      <ul>
                        <li>
                          <a href="#">Casino Home</a>
                        </li>
                        <li>
                          <a href="#">Slots</a>
                        </li>
                        <li>
                          <a href="#">Live Casino</a>
                        </li>
                        <li>
                          <a href="#">New Releases</a>
                        </li>
                        <li>
                          <a href="#">Recommended</a>
                        </li>
                        <li>
                          <a href="#">Table Game</a>
                        </li>
                        <li>
                          <a href="#">BlackJacksho</a>
                        </li>
                        <li>
                          <a href="#">Roulette</a>
                        </li>
                        <li>
                          <a href="#">Baccarat</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
