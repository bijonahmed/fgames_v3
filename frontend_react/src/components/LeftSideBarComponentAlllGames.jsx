import React, { useState, useEffect, useContext } from "react";
import axios from "/config/axiosConfig";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Combine imports from react-router-dom
import { LanguageContext } from "../context/LanguageContext";
import AuthUser from "./AuthUser";
import $ from "jquery"; // Import jQuery

const LeftSideBarComponentAlllGames = () => {

  const navigate = useNavigate(); // Move useNavigate inside the component

  const { token, logout } = AuthUser();


  const logoutUser = async () => {
    if (token) {
      await logout();
      navigate('/login');
    }
  };


  const { content } = useContext(LanguageContext);


  const menuItems = token
    ? [
      { path: "/#", label: "AG", icon: "/theme_fansgames/images/live-streaming.png" },
      { path: "#", label: "cq9", icon: "/theme_fansgames/images/trophy.png" },
      { path: "/#", label: "DB2", icon: "/theme_fansgames/images/casino (1).png" },
      { path: "/all-game-list", label: "All Game List", icon: "/theme_fansgames/images/casino (1).png" },
      { path: "wallet.html", label: "Wallet", icon: "/theme_fansgames/images/wallet.png" },
      { path: "referal.html", label: "Refer", icon: "/theme_fansgames/images/refferal-transformed-removebg-preview.png" },
      { path: "affiliate.html", label: "Affiliate", icon: "/theme_fansgames/images/affiliate-60.png" },
      { path: "deposite.html", label: "Deposite", icon: "/theme_fansgames/images/money-bag-green60.png" },
      { path: "withdraw.html", label: "Withdraw", icon: "/theme_fansgames/images/cash_in.png" },
      { path: "video_gallery.html", label: "Video Gallery", icon: "/theme_fansgames/images/video-gallery-100.png" },
      { path: "#", label: "Logout", icon: "/theme_fansgames/images/user.png", onClick: logoutUser },
    ]
    : [
      { path: "/#", label: "AG", icon: "/theme_fansgames/images/live-streaming.png" },
      { path: "#", label: "cq9 ", icon: "/theme_fansgames/images/trophy.png" },
      { path: "/#", label: "DB2", icon: "/theme_fansgames/images/casino (1).png" },
      { path: "/all-game-list", label: "DB7", icon: "/theme_fansgames/images/casino (1).png" },
      { path: "wallet.html", label: "FC", icon: "/theme_fansgames/images/wallet.png" },
      { path: "referal.html", label: "FG", icon: "/theme_fansgames/images/refferal-transformed-removebg-preview.png" },
      { path: "affiliate.html", label: "JDB", icon: "/theme_fansgames/images/affiliate-60.png" },
      { path: "deposite.html", label: "Joker", icon: "/theme_fansgames/images/money-bag-green60.png" },
      { path: "withdraw.html", label: "KM", icon: "/theme_fansgames/images/cash_in.png" },
      { path: "video_gallery.html", label: "LEG", icon: "/theme_fansgames/images/video-gallery-100.png" },
     

    ];
 


  useEffect(() => {

  }, []); // Dependency array includes slug and currentPage

  return (
    <div className="left_index">
      <div className="top_part">
        <div className="row">
          <div className="col-12 ms-auto">
            <div className="page_links">
              <h6>Popular Gaming Platform</h6>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault(); // Prevent default navigation for items with actions
                      item.onClick(); // Execute the associated method
                    }
                  }}
                >
                  <img src={item.icon} alt={item.label} /> {item.label}
                </Link>
              ))}
             
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LeftSideBarComponentAlllGames;
