import NavigationMenu from './Navbar';
import { Outlet } from "react-router-dom";

const Layout = ({ isLoggedIn, onLogout}) => {
    return (
        <div className="App">
            <NavigationMenu isLoggedIn={isLoggedIn} on Logout={onLogout} />
            <Outlet />
        </div>
    )
}

export default Layout