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
    // <div className="sidebar_main">
    //   <div className="sidebar_main">
    //     <ul className="siderbar_items">
    //       {menuItems.map((item, index) => (
    //         <li key={index} className={`siderbar_item ${activeLink === item.path ? "active" : ""}`}>
    //           <Link
    //             to={item.path}
    //             className="sidebar_link"
    //             onClick={() => handleActiveLink(item.path)}>
    //             <span>{item.label}</span>
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>

    <div className="left_index">
        <div className="top_part">
          <div className="row">
            <div className="col-12 ms-auto">

              <div className="page_links">
                <h6>Pages</h6>
                <a href="index.html"><img src="/theme_fansgames/images/reels-60.png" /> Reels</a>
                <a href="livestream.html"><img src="/theme_fansgames/images/live-streaming.png" />Stream</a>
                <a href="ranking.html"><img src="/theme_fansgames/images/trophy.png" />Ranking</a>
                <a href="gamelist.html"><img src="/theme_fansgames/images/casino (1).png" />Games</a>
                <a href="wallet.html"><img src="/theme_fansgames/images/wallet.png" />Wallet</a>
                <a href="referal.html"><img src="/theme_fansgames/images/refferal-transformed-removebg-preview.png" />Reffer</a>
                <a href="affiliate.html"><img src="/theme_fansgames/images/affiliate-60.png" />Affiliate</a>
                <a href="deposite.html"><img src="/theme_fansgames/images/money-bag-green60.png" />Deposite</a>
                <a href="withdraw.html"><img src="/theme_fansgames/images/cash_in.png" />withdraw</a>
                <a href="video_gallery.html"><img src="/theme_fansgames/images/video-gallery-100.png" />Vidoe
                  Gallery</a>
                <a href="login.html"><img src="/theme_fansgames/images/user.png" />Login</a>
                <a href="register.html"><img src="/theme_fansgames/images/user.png" />Register</a>
                <h6>Social Links </h6>
                <div className="index_social">
                  <a href="https://www.facebook.com/Fansgame.online/"><img src="/theme_fansgames/images/facebook-100.png" className="img-fluid" /></a>
                  <a href="https://www.youtube.com/@FansGame.online"><img src="/theme_fansgames/images/youtube-100.png" /></a>
                  <a href="https://www.instagram.com/fansgame_official/"><img src="/theme_fansgames/images/instagram-100.png" /></a>
                  <a href="https://twitter.com/Fansgameonline"><img src="/theme_fansgames/images/twitter-circled-100.png" /></a>
                  <a href="https://www.pinterest.com/fansgame_official"><img src="/theme_fansgames/images/pinterest-100.png" /></a>
                  <a href="https://www.tiktok.com/@fansgame.online"><img src="/theme_fansgames/images/tiktok-100.png" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LeftSideBarComponent;
