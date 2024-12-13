import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";
import AuthUser from "../../components/AuthUser";

import LeftSideBarComponent from "../../components/LeftSideBarComponent";

const MyProfile = () => {

  const { user } = AuthUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFaceook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whtsapp, setWtsApp] = useState("");
  const [errors, setErrors] = useState({});
  // Fetch user data from the API and update state
  const defaultFetch = async () => {
    try {
      const userId = user.id;
      const response = await axios.get(`/auth/showProfileData`, {
        params: { userId: userId },  // or simply { userId } using shorthand
      });
      const userData = response.data;
      console.log("API response data:", userData.name); // Debugging: Check API response

      // Update state with fetched user data
      setName(userData.name || "");
      setWebsite(userData.website || "");
      setFaceook(userData.facebook || "");

      setTwitter(userData.twitter || "");
      setTelegram(userData.telegram || "");
      setWtsApp(userData.whtsapp || "");

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const formData = new FormData();
      formData.append("name", name);
      formData.append("website", website);
      formData.append("facebook", facebook);
      formData.append("twitter", twitter);
      formData.append("telegram", telegram);
      formData.append("whtsapp", whtsapp);
      const response = await axios.post("/auth/updateprofile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Has been successfully update",
      });
      //console.log(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire({
          icon: "error",
          title: "Validation Errors",
          html: Object.values(error.response.data.errors)
            .map((err) => `<div>${err.join("<br>")}</div>`)
            .join(""),
        });
        console.error("Validation errors:", error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleConfigName = (e) => {
    setName(e.target.value);
  };
  const handleConfigWebsite = (e) => {
    setWebsite(e.target.value);
  };
  const handleConfigfacebook = (e) => {
    setFaceook(e.target.value);
  };
  const handleConfigtwitter = (e) => {
    setTwitter(e.target.value);
  };

  const handleConfigtelegram = (e) => {
    setTelegram(e.target.value);
  };

  const handleConfigWhatsApp = (e) => {
    setWtsApp(e.target.value);
  };

  useEffect(() => {
    defaultFetch();
    if (!user) {
      navigate('/login'); // Redirect to the login page if `user` is null or undefined
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>

      {/* Start */}
      <GuestNavbar />
      <LeftSideBarComponent />
      <div className="main_section">
        {/*main section start here  */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-9">
              <div className="title_section">
                <Link onClick={() => navigate(-1)}><i className="fa-solid fa-chevron-left" /></Link>
                <h1 className="page_title">Edit your Personal details</h1>
              </div>
              {/* profile details section start here  */}

              <div className="container">
                <div className="row">
                  <div className="col-md-6 me-auto">
                    <div className="login_section align-items-start w-100">
                      <form className="w-100 me-auto mb-3" onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                          <label >Name</label>
                          <input type="text" placeholder="" className="form-control" value={name} onChange={handleConfigName} />
                          {errors.name && (
                        <div style={{ color: "red" }}>{errors.name[0]}</div>
                      )}


                        </div>
                        <div className="form-group mb-2">
                          <label >Website</label>
                          <input type="text" placeholder="" value={website} onChange={handleConfigWebsite} className="form-control" />
                        </div>

                        <div className="form-group mb-2">
                          <label >Facebook</label>
                          <input type="text" placeholder="" value={facebook} onChange={handleConfigfacebook} className="form-control" />
                        </div>

                        <div className="form-group mb-2">
                          <label >Twitter</label>
                          <input type="text" placeholder="" value={twitter} onChange={handleConfigtwitter} className="form-control" />
                        </div>

                        <div className="form-group mb-2">
                          <label >Telegram</label>
                          <input type="text" placeholder="" value={telegram} onChange={handleConfigtelegram} className="form-control" />
                        </div>

                        <div className="form-group mb-2">
                          <label >Whatsapp</label>
                          <input type="text" placeholder="" value={whtsapp} onChange={handleConfigWhatsApp} className="form-control" />
                        </div>

                        <button type="submit" className="btn btn_main  mb-3">Update</button>
                      </form>
                    </div>
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
      {/* END */}

      <Footer />
    </>
  );
};

export default MyProfile;
