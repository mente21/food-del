import React, { useContext } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Footer = () => {
  const { settings } = useContext(StoreContext);

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" className="footer-logo" />
          <p>{settings.aboutContent}</p>
          <div className="footer-social-icons">
            <a href={settings.facebook || "#"} target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="facebook" />
            </a>
            <a href={settings.twitter || "#"} target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="twitter" />
            </a>
            <a href={settings.linkedin || "#"} target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="linkedin" />
            </a>
            <a href={settings.instagram || "#"} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="instagram" />
            </a>
            <a href={settings.youtube || "#"} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="youtube" />
            </a>
            <a href={settings.tiktok || "#"} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="tiktok" />
            </a>
            <a href={settings.telegram || "#"} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="telegram" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
            {settings.address && <li>{settings.address}</li>}
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © {new Date().getFullYear()} Mente's Delivery. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
