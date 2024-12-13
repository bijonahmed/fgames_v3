import React from 'react'
import { Link } from "react-router-dom";
export default function MiniSidebar() {
    return (
        <div><div className="mini_sidebar">
            <ul className="siderbar_items">
                <li className="siderbar_item">
                    <Link to="/wallet" className="sidebar_link">
                        <span>Balance</span>
                    </Link>
                </li>
                <li className="siderbar_item">
                    <Link to="/deposit" className="sidebar_link">
                        <span>Deposit</span>
                    </Link>
                </li>
                <li className="siderbar_item">
                    <Link to="/withdraw" className="sidebar_link">
                        <span>Withdraw</span>
                    </Link>
                </li>
                <li className="siderbar_item">
                    <Link to="/transaction" className="sidebar_link">
                        <span>Transaction</span>
                    </Link>
                </li>
                <li className="siderbar_item">
                    <Link to="/bet-history" className="sidebar_link">
                        <span>Bet History</span>
                    </Link>
                </li>
                <li className="siderbar_item">
                    <Link to="/security" className="sidebar_link">
                        <span>Security</span>
                    </Link>
                </li>
            </ul>
        </div></div>
    )
}
