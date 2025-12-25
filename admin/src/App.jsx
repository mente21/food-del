import React from "react";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import AddCategory from "./pages/AddCategory/AddCategory";
import ListCategory from "./pages/ListCategory/ListCategory";
import Settings from "./pages/Settings/Settings";
import EditFood from "./pages/EditFood/EditFood";
import EditCategory from "./pages/EditCategory/EditCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DebugBanner from "./components/DebugBanner/DebugBanner";

const App = () => {
  const url = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
  return (
    <div>
      <ToastContainer />
      <DebugBanner url={url} />
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />

        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/add-category" element={<AddCategory url={url} />} />
          <Route path="/list-category" element={<ListCategory url={url} />} />
          <Route path="/settings" element={<Settings url={url} />} />
          <Route path="/edit-food/:id" element={<EditFood url={url} />} />
          <Route path="/edit-category/:id" element={<EditCategory url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
