import { useContext, useRef, useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

import logo from "../Assets/logo.png";
import cartIcon from "../Assets/cart_icon.png";
import navDropdown from "../Assets/nav-dropdown.png";
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop"); // State to keep track of the active menu item
    const menuRef = useRef(); // Ref for the dropdown menu

    const { getTotalCartItems } = useContext(ShopContext)

    // Function to toggle the visibility of the dropdown menu
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open");
    };

    return (
        <div className='navbar'>
            <Link to="/" className="nav-logo">
                <img src={logo} alt="logo" />
                <p>SHOPPER</p>
            </Link>
            {/* Button for toggling the dropdown menu */}
            <img className='nav-dropdown' onClick={dropdown_toggle} src={navDropdown} alt="" />
            {/* Dropdown menu */}
            <ul ref={menuRef} className="nav-menu">
                {/* Each menu item is a list item */}
                {/* Depending on the active menu, a horizontal line (hr) will be displayed */}
                <li onClick={() => { setMenu("shop") }}> <Link to="/">Shop</Link>  {menu === "shop" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("mens") }}><Link to="/mens">Men</Link> {menu === "mens" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("womens") }}><Link to="/womens">Women</Link> {menu === "womens" ? <hr /> : null}</li>
                <li onClick={() => { setMenu("kids") }}><Link to="/kids">Kids</Link> {menu === "kids" ? <hr /> : null}</li>
            </ul>
            {/* Login button and cart icon */}
            <div className="nav-login-cart">
                {
                    localStorage.getItem('auth-token') ?
                        <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button> :
                        <button><Link to="/login">Login</Link></button>
                }
                <Link to="/cart"><img src={cartIcon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div >
    );
};

export default Navbar;
