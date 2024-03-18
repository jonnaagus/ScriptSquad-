import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = ({ isLoggedIn, onLogout }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/login">Home</Link></li>
                <li><Link to="/overview">Project Overview</Link></li>
                <li><Link to="/timereport">Time Report</Link></li>
                <li><Link to="/projects">Projects</Link></li>
            </ul>
                {isLoggedIn && (
                    <button onClick={onLogout}>Log out</button>
                )}
        </nav>
    )
}

export default NavigationMenu;