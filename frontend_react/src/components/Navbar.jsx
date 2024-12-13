import React, { useState, useEffect, useContext } from 'react'; // Ensure useContext is imported
import { useNavigate, Link, useParams } from 'react-router-dom'; // Combine imports from react-router-dom
import axios from '/config/axiosConfig'; // Assuming your axios config is correct
import AuthUser from "../components/AuthUser";
import { LanguageContext } from "../context/LanguageContext"; // Import LanguageContext
const Navbar = () => {

  const navigate = useNavigate(); // Move useNavigate inside the component
  const { language, content, changeLanguage } = useContext(LanguageContext);
  const { token, logout } = AuthUser();



  const [getlanguage, setLangauge] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/public/language");
      //console.log("====" + response.data)
      setLangauge(response.data.languages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const closeNav = () => {
    console.log("Navigation closed!");
    // Add your logic to close the navigation menu
  };

  const openNav = () => {
    console.log("Navigation opened!");
    // Add your logic to open the navigation menu
  };



  const logoutUser = async () => {
    if (token) {
      await logout();
      navigate('/login');
    }
  };
  const handleRedirect = () => {
    navigate('/deposit');
  };

  const handleRedirectLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    fetchData();


  }, [language]);

  return (

    <div className="row ">
      <div className="nav_bar" style={{ zIndex: 9999, backgroundImage: 'linear-gradient(45deg, #7565f38a,#cfcafb4a, #c4bdfa61)' }}>
        <div className="row">
          <div className="col-12">
            {/* nav for desktop view  */}
            <div id="mySidenav" className="sidenav">
              <div className="head  align-items-center">
                <div className="row">
                  <a href="profileinfo.html" className="text-secondary text-decoration-none">
                    <div className="text-start d-flex align-items-center ms-2 profile_img">
                      <img src="/theme_fansgames/images/profile-female.jpg" className="rounded-circle" width="40px" height="35px" />

                      <p className="m-0 ms-1">user123</p>
                    </div>
                  </a>
                  <div>
                    <a href="#" className="closebtn" onClick={closeNav}>×</a>

                  </div>
                </div>
                <div className="row">
                  <div className="col-6"><a href="pricing.html"><img src="/theme_fansgames/images/dimond.png" /> 5000</a></div>
                  <div className="col-6"><a href="deposite.html"><img src="/theme_fansgames/images/dollar.png" /> 5000</a></div>
                </div>
              </div>
              <div className="body">
                <a href="index.html"><img src="/theme_fansgames/images/reels-60.png" /> Reels</a>
                <a href="livestream.html"><img src="/theme_fansgames/images/live-streaming.png" />Stream</a>
                <a href="ranking.html"><img src="/theme_fansgames/images/trophy.png" />Ranking</a>
                <a href="gamelist.html"><img src="/theme_fansgames/images/casino (1).png" />Games</a>
                <a href="wallet.html"><img src="/theme_fansgames/images/wallet.png" />Wallet</a>
                <a href="referal.html"><img src="/theme_fansgames/images/refferal-transformed-removebg-preview.png" />Reffer</a>
                <a href="affiliate.html"><img src="/theme_fansgames/images/affiliate-60.png" />Affiliate</a>
                <a href="deposite.html"><img src="/theme_fansgames/images/money-bag-green60.png" />Deposite</a>
                <a href="withdraw.html"><img src="/theme_fansgames/images/cash_in.png" />withdraw</a>
                {/* <a href="profile.html"><img src="/theme_fansgames/images/user.png" ="">Profile</a> */}
                <a href="login.html"><img src="/theme_fansgames/images/user.png" />Login</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className=" nav_profile">
              <div className="logo_fg">
                <div>
                  <a href="#" style={{ textDecoration: 'none' }} className="text-dark bg-transparent">
                    <img src="/theme_fansgames/images/fav_logo.jpg" className="img-fluid" />
                  </a>
                </div>
                <div>
                  <h5>Fansgame</h5>
                  <p>Online Games</p>
                </div>
              </div>
              {/* settings button  */}
              <div className="ms-auto text-end ">
                <a className="nav-link" onClick={openNav}>
                  <div className="grid_dots">
                    <div className="dots">
                      <span /><span /><span />
                    </div>
                    <div className="dots">
                      <span /><span /><span />
                    </div>
                    <div className="dots">
                      <span /><span /><span />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
