import React, { useContext, useState, useEffect } from "react";
import "./ProductPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ProductPopup = ({ product, setShowPopup }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [currentImage, setCurrentImage] = useState(0);

  const images = Array.isArray(product.image) ? product.image : [product.image];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  if (!product) return null;

  return (
    <div className="product-popup">
      <div className="product-popup-container">
        <div className="product-popup-close" onClick={() => setShowPopup(false)}>
          <img src={assets.cross_icon} alt="Close" />
        </div>
        
        <div className="product-popup-content">
          <div className="product-popup-left">
            <div className="slider-wrapper">
              <img 
                src={images[currentImage].startsWith("http") ? images[currentImage] : url + "/images/" + images[currentImage]} 
                alt={product.name} 
                className="product-popup-image"
              />
              {images.length > 1 && (
                <div className="slider-dots">
                  {images.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`slider-dot ${idx === currentImage ? 'active' : ''}`}
                      onClick={() => setCurrentImage(idx)}
                    ></span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="product-popup-right">
            <div className="product-popup-header">
              <span className="product-popup-category">{product.category}</span>
              <h2 className="product-popup-title">{product.name}</h2>
              <div className="product-popup-rating">
                <img src={assets.rating_starts} alt="Stars" />
                <span>(4.5 Rating)</span>
              </div>
            </div>
            
            <p className="product-popup-desc">{product.description}</p>
            
            <div className="product-popup-footer">
              <span className="product-popup-price">${product.price}</span>
              
              <div className="product-popup-actions">
                {!cartItems[product._id] ? (
                  <button className="add-to-cart-btn" onClick={() => addToCart(product._id)}>
                    Add to Cart
                  </button>
                ) : (
                  <div className="product-popup-counter">
                    <img onClick={() => removeFromCart(product._id)} src={assets.remove_icon_red} alt="" />
                    <span>{cartItems[product._id]}</span>
                    <img onClick={() => addToCart(product._id)} src={assets.add_icon_green} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
