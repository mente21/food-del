import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Loginpopup from "./components/Loginpopup/Loginpopup"; // Ensure correct import path
import Verify from "./pages/verify/verify";
import MyOrders from "./pages/myOrders/myOrders";
const App = () => {
  // State to manage the visibility of the Login Popup
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* ISSUE FIX: You must pass the setShowLogin function 
        as a prop to the Loginpopup component so it can close itself.
      */}
      {showLogin ? <Loginpopup setShowLogin={setShowLogin} /> : <></>}

      <div className="App">
        {/* Navbar also receives setShowLogin to open the popup */}
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
