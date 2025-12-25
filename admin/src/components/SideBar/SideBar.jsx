import React from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/add-category" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Category</p>
        </NavLink>
        <NavLink to="/list-category" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Category</p>
        </NavLink>
        <NavLink to="/settings" className="sidebar-option">
          <p>Settings</p>
        </NavLink>
      </div>
    </div>
  );
};
// export default Sidebar would likely follow this component

export default SideBar;
