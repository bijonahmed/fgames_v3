// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from './SidebarContext';

const Sidebar = () => {

  return (
    <div>
      <button className="btn_sidebar">
        Toggle Sidebar
      </button>
      <ul className="sidebar">
        <li>
          <button
            type="button"
            className="sidebar_link btn_submenu">
            <span>Profile</span>
            <i className="fa-regular fa-chevron-down" />
          </button>

            <ul className="sub-menu show">
              <li className="sub-menu_list">
                <Link to="/hoster-profile">User Profile</Link>
              </li>
              <li className="sub-menu_list">
                <Link to="/wallet">Wallet</Link>
              </li>
              <li className="sub-menu_list">
                <Link to="/deposit">Deposit</Link>
              </li>
              <li className="sub-menu_list">
                <Link to="/withdraw">Withdraw</Link>
              </li>
              <li className="sub-menu_list">
                <Link to="/bet-history">Bet History</Link>
              </li>
              <li className="sub-menu_list">
                <Link to="/transaction">Transaction</Link>
              </li>
            </ul>
         
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
