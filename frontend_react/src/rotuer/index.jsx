// src/Router.js
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Unused Pages

import Referral from "../pages/users/Referral.jsx";
import Bookmarks from "../pages/users/Bookmarks.jsx";
import PornModels from "../pages/PornModels.jsx";
//END 


//Frontend
import Index from "../pages/Index.jsx";
import Wallet from "../pages/Wallet.jsx";
import GameZone from "../pages/GameZone.jsx";
import PlayGame from "../pages/PlayGame.jsx";
import GameCategoryZone from "../pages/GameCategoryZone.jsx";
import Games from "../pages/GamesList.jsx";
import AllGames from "../pages/AllGames.jsx";
import Signup from "../pages/Signup.jsx";
import Forgetpassword from "../pages/Forgetpassword.jsx";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Deposit from "../pages/Deposit";
import UserLogin from "../pages/UserLogin.jsx";
import ChangePassword from "../pages/users/ChangePassword.jsx";
import BetHistory from "../pages/BetHistory.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import TermsAndConditions from "../pages/TermsAndConditions.jsx";
import Adultcategory from "../pages/Adultcategory.jsx";
import HosterProfile from "../pages/users/Profile.jsx";

//For Admin Panel 
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/users/Profile.jsx";
import MyProfile from "../pages/users/MyProfile.jsx";
import Transaction from "../pages/Transaction.jsx";
import Withdraw from "../pages/Withdraw.jsx";
import HosterList from "../pages/HosterList.jsx";
import WatchVideos from "../pages/WatchVideos.jsx";
import Videos from "../pages/VideosList.jsx";
import HosterDetails from "../pages/HosterDetails.jsx";
//import ProtectedRoute from "../components/ProtectedRoute";
//<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/hoster-profile:slug" element={<HosterProfile />} />
      <Route path="/adult-categorys/:slug" element={<Adultcategory />} />
      <Route path="/hoster-details/:slug" element={<HosterDetails />} />
      <Route path="/watch-videos/:slug" element={<WatchVideos />} />
      <Route path="/games-list/:slug" element={<Games />} />
      <Route path="/all-games" element={<AllGames />} />

      <Route path="/game-category-list/:slug" element={<GameCategoryZone />} />
      <Route path="/porn-models" element={<PornModels />} />
      <Route path="/games-zone/:slug" element={<GameZone />} />
      <Route path="/play-game/:slug" element={<PlayGame />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/transaction" element={<Transaction />} />
    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/bet-history" element={<BetHistory />} />
      <Route path="/hoster-list" element={<HosterList />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<Forgetpassword />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
 
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/hoster-profile" element={<HosterProfile />} />
      <Route path="/user/profile" element={<UserProfile />} />
      {/* <Route path="/users/change-password" element={<ChangePassword />} /> */}
      <Route path="/user/change-password" element={<ChangePassword />} />
      <Route path="/users/referral" element={<Referral />} />
      <Route path="/users/my-bookmarks" element={<Bookmarks />} />
      {/* //Admin Route */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
