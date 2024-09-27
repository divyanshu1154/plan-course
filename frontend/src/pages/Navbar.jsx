import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const handleToggle = () => {
        setIsMobile(!isMobile);
    };

    return (
        <nav className="navbar">
            {/* <div className="navbar-logo">Logo</div> */}
            <img src="logo-no-background.png" alt="logo" className="logo-image" />
            <ul className={isMobile ? "navbar-links active" : "navbar-links"}>
                <li><NavLink to="/" onClick={() => setIsMobile(false)}>Home</NavLink></li>
                <li><NavLink to="/signin" onClick={() => setIsMobile(false)}>Sign In</NavLink></li>
                <li><NavLink to="/profile" onClick={() => setIsMobile(false)}>User</NavLink></li>
            </ul>
            <div className="navbar-toggle" id="mobile-menu" onClick={handleToggle}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
