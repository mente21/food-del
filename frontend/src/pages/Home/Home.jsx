import React, { useState, useContext } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownoad from "../../components/AppDownoad/AppDownoad";
import ProductPopup from "../../components/ProductPopup/ProductPopup";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isLoading, error } = useContext(StoreContext);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  if (error) {
    return (
      <div className="error-container" style={{ textAlign: "center", padding: "50px", color: "#666" }}>
         <h2>Oops! Something went wrong.</h2>
         <p>{error}</p>
         <button 
           onClick={() => window.location.reload()}
           style={{
             marginTop: "20px",
             padding: "10px 20px",
             background: "#ff6b35",
             color: "white",
             border: "none",
             borderRadius: "5px",
             cursor: "pointer"
           }}
         >
           Retry
         </button>
      </div>
    );
  }

  return (
    <div>
      {showPopup && <ProductPopup product={selectedProduct} setShowPopup={setShowPopup} />}
      <Header />
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} setSelectedProduct={handleProductClick} />
          <AppDownoad />
        </>
      )}
    </div>
  );
};
export default Home;
