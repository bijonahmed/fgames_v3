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

    <div className="navbar_secion">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <div>
            <button className="btn_sidebar_pc">
              <i className="fa-sharp fa-solid fa-bars-sort" />
            </button>
            <button className="btn_sidebar mobile">
              <i className="fa-sharp fa-solid fa-bars-sort" />
            </button>
            <Link className="navbar-brand" to="/">
              <img src="/images/LOGO.png" className="img-fluid" />
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <div className="">
              <div className="">
                
                <select
                  className="form-select"
                  style={{ backgroundColor: "#292d2e", color: "white" }} value={language}
                  onChange={(e) => changeLanguage(e.target.value)}>
                  {getlanguage.map(({ code, name }) => (
                    <option key={code} value={code} style={{ color: "white" }}>{name}</option>
                  ))}
                </select>
              </div>


              <header>
              </header>
            </div>

            {token ? (
              <button className="btn btn_signup mx-2 text-white" onClick={handleRedirect}>{content.level_deposit || 'Deposit'}</button>) : (
              <button className="btn btn_signup mx-2 text-white" onClick={handleRedirectLogin}>{content.level_deposit || 'Deposit'}</button>
            )}
            <div className="button_box">
              {token ? (
                <>
                  <Link to="/dashboard" className="btn_signin">Dashboard</Link>
                  <Link className="btn_signin" id="bLogin" to="#" onClick={logoutUser}>Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn_signin">{content.level_sign_in || 'Sign in'}</Link>
                  <Link to="/signup" className="btn_signup">{content.level_sign_up || 'Sign up'}</Link>
                </>
              )}
            </div>


            <div style={{ marginTop: '20px', color: 'white', display: 'none' }}>
              {Object.keys(content).length > 0 ? (
                <div>
                  <p>Greeting: {content.greeting}</p>
                  <p>Farewell: {content.farewell}</p>
                  <p>Welcome: {content.welcome}</p>
                </div>
              ) : (
                <p></p>
              )}
            </div>

          </div>
        </div>
      </nav>
    </div>

  );
};

export default Navbar;
