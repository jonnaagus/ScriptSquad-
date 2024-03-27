import NavigationMenu from './Navbar';
import { Outlet } from "react-router-dom";
import Header from './header';
import Footer from './footer';
const Layout = ({ isLoggedIn, onLogout}) => {
    return (
        <div className="App">
            <Header />
            <NavigationMenu isLoggedIn={isLoggedIn} on Logout={onLogout} />
            <Outlet />
         <Footer />
        </div>
    )
}

export default Layout