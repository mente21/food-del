import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownoad from "../../components/AppDownoad/AppDownoad";
import ProductPopup from "../../components/ProductPopup/ProductPopup";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  return (
    <div>
      {showPopup && <ProductPopup product={selectedProduct} setShowPopup={setShowPopup} />}
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} setSelectedProduct={handleProductClick} />
      <AppDownoad />
    </div>
  );
};
export default Home;
