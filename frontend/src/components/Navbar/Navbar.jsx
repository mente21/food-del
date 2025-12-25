import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const dropdownRef = useRef(null);

  const { getTotalCartAmount, getTotalCartItems, setToken, token, settings } = useContext(StoreContext);
  const nav = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileDropdown(false);
    nav("/");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
        {token && (
          <Link
            to="/myorders"
            onClick={() => setMenu("orders")}
            className={menu === "orders" ? "active" : ""}
          >
            orders
          </Link>
        )}
      </ul>
      <div className="navbar-right">
        <div className={`navbar-search-container ${showSearch ? 'active' : ''}`}>
          <input 
            type="text" 
            placeholder="Search favorites..." 
            value={searchQuery}
            onChange={handleSearch}
            className={showSearch ? 'show' : ''}
          />
          <img 
            src={assets.search_icon} 
            alt="search" 
            onClick={() => setShowSearch(!showSearch)} 
          />
        </div>
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartItems() > 0 && <span className="cart-badge">{getTotalCartItems()}</span>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="profile" 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />
            <ul className={`nav-profile-dropdown ${showProfileDropdown ? 'show' : ''}`}>
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
