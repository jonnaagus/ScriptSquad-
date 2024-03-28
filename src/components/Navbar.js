import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const NavigationMenu = ({ isLoggedIn, onLogout }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/login">Home</Link></li>
                <li><Link to="/overview">Project Overview</Link></li>
                <li><Link to="/timereport">Time Report</Link></li>
                <li><Link to="/calenderTimereport">Reported Time</Link></li>
            </ul>
            {isLoggedIn && (
                <button className="logout-button" onClick={onLogout}>Log out</button>
            )}
        </nav>
    )
}

export default NavigationMenu;