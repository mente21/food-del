import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";

const NavBar = () => {
  const [adminProfile, setAdminProfile] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${url}/api/settings/get`);
        if (response.data.success) {
          setAdminProfile(response.data.data.adminProfile);
        }
      } catch (error) {
        console.log("Error fetching admin profile");
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={adminProfile || assets.profile_image} alt="" />
    </div>
  );
};

export default NavBar;
