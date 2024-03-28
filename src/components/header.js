import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import useAuth from '../hooks/useAuth';

// Header-component which takes a prop-'title', this decides what headline is shown in the header.
const Header = () => {
    const {auth} = useAuth();

    return (
        <header>
            {/* <!-- Header rubrik --> */}
            <div className="header-content">
                <div className="title">
                    <h1 className="outfit-font">SqriptSquad</h1>
                </div>
                <div className="user-info">
                    <p className="user">Inloggad som: {auth.userName}</p>
                    <Link to='/' onClick={() => localStorage.clear()} className="logout">Logga ut</Link>
                </div>
                
            </div>
        </header>
    );
};

export default Header;