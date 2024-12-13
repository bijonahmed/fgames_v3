import React, { useState, useEffect,useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";

import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import { LanguageContext } from "../context/LanguageContext";
import LeftSideBarComponent from "../components/LeftSideBarComponent";
const Login = () => {
  const { content } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { http, setToken } = AuthUser();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordlChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post("/auth/userLogin", { username, password });
      setToken(response.data.user, response.data.access_token);
      navigate("/dashboard"); // Adjust the navigation path as needed
    } catch (error) {
      const fieldErrors = error.response?.data.errors || {};
      setErrors({
          general: fieldErrors.account
              ? fieldErrors.account[0]
              : "Invalid username or password.",
          ...fieldErrors,
      });
  }
  };
 
  return (
    <div>
      <Helmet>
        {" "}
        <title> Login</title>
      </Helmet>
      <div>
        <GuestNavbar />
        <div className="main_content">
          <LeftSideBarComponent />

          <div className="main_section">
            {/* banner section start here  */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="login_section w-100">
                    <form onSubmit={handleSubmit} className="login_form mx-auto mb-3">
                      <Link to="/">
                        <img
                          src="/images/LOGO.png"
                          className="img-fluid login_logo"
                        />

                      </Link>
                      <center>{errors.account && <div style={{ color: 'red' }}>{errors.account[0]}</div>}</center>
                      <div className="form-group mb-2">
                        <label>{content.lvl_sing_up_username || "Username"}</label>
                        <input
                          type="text"
                          name="username"
                          placeholder="username"
                          className="form-control"  value={username} onChange={handleUsernameChange} 
                        />
                         {errors.username && (
                        <div style={{ color: "red" }}>{errors.username[0]}</div>
                      )}
                      </div>

                      <div className="form-group mb-2">
                        <label>{content.lvl_sing_up_password || "Password"} </label>
                        <div className="input_group_pass">
                          <input
                            type="password"
                            id="password"
                            placeholder="********"
                            className="form-control"
                             name="password"
                             value={password}  onChange={handlePasswordlChange}
                          />
                          <i className="fa-solid fa-eye" id="togglePassword" />
                          {errors.password && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.password[0]}
                        </div>
                      )}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end mb-3">
                        <Link to="/forget-password" className="text-end">
                          {content.lvl_forget_pass || "Password"}
                        </Link>
                      </div>

                      
                      <button type="submit" className="btn btn_main w-100 mb-3">
                      {content.level_sign_in || "Sign in"} 
                      </button>
                      <p className="text-center">
                        {content.lvl_new_here || "New here ?"}<Link to="/signup">{content.level_sign_up || "Sign up"}.</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
