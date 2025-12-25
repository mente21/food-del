import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, setSelectedProduct }) => {
  const { food_list } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter list based on category
  const filteredList = food_list.filter(item => category === "All" || category === item.category);

  // Reset to page 1 whenever category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {currentItems.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            item={item}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => {
              setCurrentPage(prev => prev - 1);
              document.getElementById('food-display').scrollIntoView();
            }}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              className={currentPage === i + 1 ? "active" : ""} 
              onClick={() => {
                setCurrentPage(i + 1);
                document.getElementById('food-display').scrollIntoView();
              }}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              document.getElementById('food-display').scrollIntoView();
            }}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
