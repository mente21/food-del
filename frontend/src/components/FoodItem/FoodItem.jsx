import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, item, setSelectedProduct }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  const displayImage = Array.isArray(image) ? image[0] : image;
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={(() => {
            const imgUrl = displayImage.startsWith("http") ? displayImage : url + "/images/" + displayImage;
            // Optimize Cloudinary URLs
            if (imgUrl.includes("cloudinary.com") && !imgUrl.includes("/f_auto,q_auto")) {
              return imgUrl.replace("/upload/", "/upload/f_auto,q_auto/");
            }
            return imgUrl;
          })()}
          alt=""
          loading="lazy"
          onClick={() => setSelectedProduct(item)}
        />

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white} // Assuming a white icon for initial add
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add More"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating" onClick={() => setSelectedProduct(item)}>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
