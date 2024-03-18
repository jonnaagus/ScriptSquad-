import React from 'react';
import Navigation from './navigation'; // Assuming for now that the navigation-component exists in a file named navigation.js

// Header-component which takes a prop-'title', this decides what headline is shown in the header.
const Header = ({ title }) => {
    return (
        <header>
        <div className='container'>
        {/* Load header-text from the value of the 'title' of the page by using 'aria-labelledby', assuming navigation-component includes page labels for this?*/}
        <h1 aria-labelledby="pageTitle">{title}</h1>

        {/* Using the Navigation component */}
        <Navigation />
        </div>
        </header>
    );
};

export default Header;
