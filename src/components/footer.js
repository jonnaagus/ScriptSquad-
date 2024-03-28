import React from 'react';
import '../styles/footer.css';

// Footer that dynamically generates the current year using the Date-object, and a copyright symbol;
function Footer({ onFooterClick }) {
  return (
    <footer className="footer-container">
        {/* <div className='container'> */}
        <address>&copy; {new Date().getFullYear()} SqriptSquad. Alla rättigheter förbehållna.</address>
        {/* </div> */}
    </footer>
  );
}

export default Footer;