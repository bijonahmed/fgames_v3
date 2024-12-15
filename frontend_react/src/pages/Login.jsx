import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import { LanguageContext } from "../context/LanguageContext";
import '../components/css/Login.css'; // Import your CSS file
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
      navigate("/"); // Adjust the navigation path as needed
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
        <title>Login</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 m-auto col-sm-12">
            <div className="login">
              <div className="log_title">
                <Link to="/"><img src="/theme_fansgames/images/fav_logo.jpg" className="img_fluid" /></Link>
                <h1>Welcome To <a href="#">FG</a></h1>
                <Link to="/" style={{ textDecoration: 'none' }}><center>Back to home</center></Link>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <center>{errors.account && <div style={{ color: 'red' }}>{errors.account[0]}</div>}</center>
                  <div>
                    <label> <label>{content.lvl_sing_up_username || "Username"}</label> </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      className="form-control" value={username} onChange={handleUsernameChange}
                    />
                    {errors.username && (<div style={{ color: "red" }}>{errors.username[0]}</div>)}
                  </div>
                  <div>
                    <label>{content.lvl_sing_up_password || "Password"} </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="********"
                      className="form-control"
                      name="password"
                      value={password} onChange={handlePasswordlChange}
                    />

                    {errors.password && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.password[0]}
                      </div>
                    )}
                    {/* <input type="checkbox" id="togglePassword" /><label>Show password</label> */}
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-12 ">
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/forget-password" className="text-end">
                      {content.lvl_forget_pass || "Password"}
                    </Link>
                    <Link to="/signup">{content.level_sign_up || "Sign up"}</Link>
                  </div>
                  <button type="submit" className="signin_btn">{content.level_sign_in || "Sign in"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
