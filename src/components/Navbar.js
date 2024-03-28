import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const NavigationMenu = ({ isLoggedIn, onLogout }) => {
    return (
        <nav className="navigation-menu">
            <ul className="menu-list">
                <li className="menu-item"><Link to="/login">Hem</Link></li>
                <li className="menu-item"><Link to="/overview">Projektöversikt</Link></li>
                
                <li className="menu-item"><Link to="/calenderTimereport">Rapporterad tid</Link></li>
            </ul>
            {isLoggedIn && (
                <button className="logout-button" onClick={onLogout}>Log out</button>
            )}
        </nav>
    )
}

export default NavigationMenu;