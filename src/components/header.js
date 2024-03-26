import React from 'react';

// Header-component which takes a prop-'title', this decides what headline is shown in the header.
const Header = () => {

    return (
        <header>
            {/* <div className='container'> */}
            {/* Load header-text from the value of the 'title' of the page by using 'aria-labelledby', assuming navigation-component includes page labels for this?*/}
            {/* <h1 aria-labelledby="pageTitle">{title}</h1> */}

            {/* Using the Navigation component */}

            {/* </div> */}


            {/* <!-- Header rubrik --> */}
            <h1 className="outfit-font">SqriptSquad</h1>
        </header>
    );
};

export default Header;
