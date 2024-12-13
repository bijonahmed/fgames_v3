import React, { useState, useEffect, useContext } from "react";
import axios from "/config/axiosConfig";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import $ from "jquery"; // Import jQuery

const LeftSideBarComponent = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleActiveLink = (path) => {
    setActiveLink(path);
  };

  const { content } = useContext(LanguageContext);

  const menuItems = [

    { path: "/games-list/spribe", label: content.lvl_left_game_1 || "Spribe" },
    { path: "/games-list/pg", label: content.lvl_left_game_2 || "PG" },
    { path: "/games-list/jili", label: content.lvl_left_game_3 || "JILI" },
    { path: "/games-list/pp_max", label: content.lvl_left_game_4 || "PP MAX" },
    { path: "/games-list/omg_mini", label: content.lvl_left_game_5 || "OMG MINI" },
    { path: "/games-list/mini_game", label: content.lvl_left_game_6 || "Mini Game" },
    { path: "/games-list/omg_crypto", label: content.lvl_left_game_7 || "OMG CRYPTO" },
    { path: "/games-list/hacksaw", label: content.lvl_left_game_8 || "Hacksaw" },
    { path: "/games-list/pp", label: content.lvl_left_game_9 || "PP" },
    { path: "/all-games", label: content.lvl_left_game_all || "ALL Games" },

 
    { path: "/videos", label: content.lvl_left_sidebar_video || "Videos" },
    { path: "/porn-models", label: content.lvl_left_sidebar_model || "Model" },
    { path: "/hoster-list", label: content.lvl_left_sidebar_star || "Star" },
    { path: "/my-profile", label: content.lvl_left_uprofile || "User Profile" },
    { path: "/wallet", label: content.lvl_left_wallet || "Wallet" },
    { path: "/deposit", label: content.lvl_left_deposit || "Deposit" },
    { path: "/withdraw", label: content.lvl_left_withdraw || "Withdraw" },
    { path: "/bet-history", label: content.lvl_left_bethistory || "Bet History" },
    { path: "/transaction", label: content.lvl_left_transaction || "Transaction" },
  ];


  useEffect(() => {

  }, []); // Dependency array includes slug and currentPage

  return (
    <div className="sidebar_main">
      <div className="sidebar_main">
        <ul className="siderbar_items">
          {menuItems.map((item, index) => (
            <li key={index} className={`siderbar_item ${activeLink === item.path ? "active" : ""}`}>
              <Link
                to={item.path}
                className="sidebar_link"
                onClick={() => handleActiveLink(item.path)}>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBarComponent;
