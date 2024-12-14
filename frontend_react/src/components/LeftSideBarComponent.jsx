import React, { useState, useEffect, useContext } from "react";
import axios from "/config/axiosConfig";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Combine imports from react-router-dom
import { LanguageContext } from "../context/LanguageContext";
import AuthUser from "../components/AuthUser";
import $ from "jquery"; // Import jQuery

const LeftSideBarComponent = () => {

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
      { path: "index.html", label: "Reels", icon: "/theme_fansgames/images/reels-60.png" },
      { path: "livestream.html", label: "Stream", icon: "/theme_fansgames/images/live-streaming.png" },
      { path: "ranking.html", label: "Ranking", icon: "/theme_fansgames/images/trophy.png" },
      { path: "gamelist.html", label: "Games", icon: "/theme_fansgames/images/casino (1).png" },
      { path: "wallet.html", label: "Wallet", icon: "/theme_fansgames/images/wallet.png" },
      { path: "referal.html", label: "Refer", icon: "/theme_fansgames/images/refferal-transformed-removebg-preview.png" },
      { path: "affiliate.html", label: "Affiliate", icon: "/theme_fansgames/images/affiliate-60.png" },
      { path: "deposite.html", label: "Deposite", icon: "/theme_fansgames/images/money-bag-green60.png" },
      { path: "withdraw.html", label: "Withdraw", icon: "/theme_fansgames/images/cash_in.png" },
      { path: "video_gallery.html", label: "Video Gallery", icon: "/theme_fansgames/images/video-gallery-100.png" },
      { path: "#", label: "Logout", icon: "/theme_fansgames/images/user.png", onClick: logoutUser },
    ]
    : [
      { path: "index.html", label: "Reels", icon: "/theme_fansgames/images/reels-60.png" },
      { path: "livestream.html", label: "Stream", icon: "/theme_fansgames/images/live-streaming.png" },
      { path: "ranking.html", label: "Ranking", icon: "/theme_fansgames/images/trophy.png" },
      { path: "gamelist.html", label: "Games", icon: "/theme_fansgames/images/casino (1).png" },
      { path: "wallet.html", label: "Wallet", icon: "/theme_fansgames/images/wallet.png" },
      { path: "referal.html", label: "Refer", icon: "/theme_fansgames/images/refferal-transformed-removebg-preview.png" },
      { path: "affiliate.html", label: "Affiliate", icon: "/theme_fansgames/images/affiliate-60.png" },
      { path: "deposite.html", label: "Deposite", icon: "/theme_fansgames/images/money-bag-green60.png" },
      { path: "withdraw.html", label: "Withdraw", icon: "/theme_fansgames/images/cash_in.png" },
      { path: "video_gallery.html", label: "Video Gallery", icon: "/theme_fansgames/images/video-gallery-100.png" },
      { path: "login.html", label: "Login", icon: "/theme_fansgames/images/user.png" },
      { path: "register.html", label: "Register", icon: "/theme_fansgames/images/user.png" },
    ];
  const socialLinks = [
    { href: "https://www.facebook.com/Fansgame.online/", icon: "/theme_fansgames/images/facebook-100.png" },
    { href: "https://www.youtube.com/@FansGame.online", icon: "/theme_fansgames/images/youtube-100.png" },
    { href: "https://www.instagram.com/fansgame_official/", icon: "/theme_fansgames/images/instagram-100.png" },
    { href: "https://twitter.com/Fansgameonline", icon: "/theme_fansgames/images/twitter-circled-100.png" },
    { href: "https://www.pinterest.com/fansgame_official", icon: "/theme_fansgames/images/pinterest-100.png" },
    { href: "https://www.tiktok.com/@fansgame.online", icon: "/theme_fansgames/images/tiktok-100.png" },
  ];


  useEffect(() => {

  }, []); // Dependency array includes slug and currentPage

  return (
    <div className="left_index">
    <div className="top_part">
      <div className="row">
        <div className="col-12 ms-auto">
          <div className="page_links">
            <h6>Pages</h6>
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault(); // Prevent default navigation for items with actions
                    item.onClick(); // Execute the associated method
                  }
                }}
              >
                <img src={item.icon} alt={item.label} /> {item.label}
              </a>
            ))}
            <h6>Social Links</h6>
            <div className="index_social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={link.icon}
                    className="img-fluid"
                    alt="social icon"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default LeftSideBarComponent;
