import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const NavigationMenu = ({ isLoggedIn, onLogout }) => {
    return (
        <nav className="navigation-menu">
            <ul className="menu-list">
                <li className="menu-item"><Link to="/login">Home</Link></li>
                <li className="menu-item"><Link to="/overview">Project Overview</Link></li>
                <li className="menu-item"><Link to="/timereport">Time Report</Link></li>
            </ul>
            {isLoggedIn && (
                <button className="logout-button" onClick={onLogout}>Log out</button>
            )}
        </nav>
    )
}

export default NavigationMenu;