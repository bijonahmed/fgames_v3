import React, { useState, useEffect, useContext } from "react";
import Slider from 'react-slick';
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import AuthUser from "../../components/AuthUser";
import { LanguageContext } from "../../context/LanguageContext";
import '../../components/css/GameList.css'; // Import your CSS file
import '../../components/css/profile.css'; // Import your CSS file
import { Carousel } from 'react-bootstrap';
const Profile = () => {

  const { user } = AuthUser();
  const { language, content, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const { token, logout } = AuthUser();

  const logoutUser = async () => {
    if (token) {
      await logout();
      navigate('/login');
    }
  };



  return (
    <>
      <Navbar />

      {/* Start */}
      <div>
        {/* space  */}
        <div style={{ height: 54 }} />
        {/* navbar end here  */}
        {/* banner part start here  */}


        <div className="container-fluid">
          <div className="row">
            <Carousel className="custom-carousel">
              <Carousel.Item>
                <a href="#">
                  <img
                    src="/theme_fansgames/images/sliders/slider(1).jpg"
                    className="d-block w-100 img-fluid"
                    alt="Slide 1" style={{ maxHeight: '350px', borderRadius: '15px' }}
                  />
                </a>
              </Carousel.Item>
              <Carousel.Item>
                <a href="#">
                  <img
                    src="/theme_fansgames/images/sliders/slider(2).jpg"
                    className="d-block w-100 img-fluid"
                    alt="Slide 2" style={{ maxHeight: '350px', borderRadius: '15px' }}
                  />
                </a>
              </Carousel.Item>
              <Carousel.Item>
                <a href="#">
                  <img
                    src="/theme_fansgames/images/sliders/slider(3).jpg"
                    className="d-block w-100 img-fluid"
                    alt="Slide 3" style={{ maxHeight: '350px', borderRadius: '15px' }}
                  />
                </a>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        {/* bannar part end here  */}

        {/* sound part start here  */}
        <div className="container-fluid">
          <div className="sound">
            <div className="volume">
              <i className="fa-solid fa-volume-high" />
            </div>
            <div>
              <p>
                <marquee behavior="scroll" scrollamount={5} direction="left">Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Unde, neque! </marquee>
              </p>
            </div>
            <div>
              <a href="#"><i className="fa-solid fa-list" />Lorem</a>
            </div>
          </div>
        </div>


        {/* profile and function part start here  */}
        <div className="container-fluid">
          <div className="profile_func">
            <div className="row">
              <div className="col-4">
                <div className="profile">
                  <div>
                    <h1>{user?.name ? user.name : user?.email ? user.email : 'User'}</h1>
                  </div>
                  <div>
                    <p>$ 00.00 <button><i className="fa-solid fa-arrows-rotate rotate" /></button></p>
                  </div>
                </div>
              </div>
              {/* <div class="col-8"> */}
              <div className="col-8 d-flex justify-content-center align-items-center">
                <div className="s_width">
                  <a href="deposite.html" style={{ textDecoration: 'none' }}>
                    <div className="option op_withdraw">
                      <img src="/theme_fansgames/images/money-bag-green60.png" />
                      <h3>Deposite</h3>
                    </div>
                  </a>
                </div>
                <div className="s_width">
                  <a href="withdraw.html" style={{ textDecoration: 'none' }}>
                    <div className="option op_reward">
                      <img src="/theme_fansgames/images/cash_in.png" />
                      <h3>width</h3>
                    </div>
                  </a>
                </div>
                <div className="s_width">
                  <a href="referal.html" style={{ textDecoration: 'none' }}>
                    <div className="option op_refer">
                      <img src="/theme_fansgames/images/gift-box.png" />
                      <h3>Refer</h3>
                    </div>
                  </a>
                </div>
                <div className="s_width">
                  <a href="pricing.html" style={{ textDecoration: 'none' }}>
                    <div className="option op_mail">
                      <img src="/theme_fansgames/images/dimond.png" />
                      <h3>Dimond</h3>
                    </div>
                  </a>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
        {/* profile and functions part end here  */}
        {/* Start  */}

        <div className="list">
          <div className="container-fluid">
            <div className="col-12">
              <div className="list_content">
                <ul>
                  <li>
                    <a href="profileinfo.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/personal-information-60.png" className="game_i" /> Personal information </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="changepass.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/change-password-100.png" className="about_i" /> Change Password </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="transection.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/document-60.png" className="doc_i" /> Transection history </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="affiliate.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/affiliate-60.png" className="game_i" /> Affiliate </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="referal.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/gift-box.png" className="headset_i" /> Refer a friend </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="about.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/i.png" className="icon_i" /> about </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="FAQ.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/faq-60.png" className="briefcase_i" /> FAQ Privacy Policy </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="Customercare.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/customer-service-60.png" className="headset_i" /> Customer care</h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="settings.html">
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/Ssettings-60.png" className="doc_i" /> Settings </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <Link to="#" onClick={logoutUser}>
                      <div className="row justify-content-space align-items-center">
                        <div className="col-10">
                          <h3><img src="/theme_fansgames/images/logout-60.png" className="settings_i" /> Logout </h3>
                        </div>
                        <div className="col-2 text-end list_arrow">
                          <i className="fa-solid fa-chevron-right" />
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
                <br /><br />
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />


      {/* END */}
    </>
  );
};

export default Profile;
