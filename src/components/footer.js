import React from 'react';

// Footer that dynamically generates the current year using the Date-object, and a copyright symbol;
function Footer({ onFooterClick }) {
  return (
    <footer>
        {/* <div className='container'> */}
        <address>&copy; {new Date().getFullYear()} SqriptSquad. Alla rättigheter förbehållna.</address>
        {/* </div> */}
    </footer>
  );
}

export default Footer;
