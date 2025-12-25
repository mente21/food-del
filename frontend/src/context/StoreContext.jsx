import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodlist] = useState([]);
  const [menu_list, setMenulist] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add global loading state
  const [error, setError] = useState(null); // Add global error state

  const [settings, setSettings] = useState({
    phone: "+1-212-456-7890",
    email: "contact@mentesdelivery.com",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    address: "123 Foodie Street, Gourmet City",
    aboutContent: "Mente's Delivery is your favorite food delivery partner."
  });

  const addToCart = async (itemId) => {
    // ... (rest of addToCart)
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodlist(response.data.data);
      } else {
        console.error("Failed to fetch food list:", response.data.message);
        setError("Failed to load food items. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      setError("Network error: Unable to connect to backend. Please check your connection.");
    }
  };

  const fetchMenuList = async () => {
    try {
      const response = await axios.get(url + "/api/category/list");
      if (response.data.success) {
        // Map backend category data to the format expected by ExploreMenu
        const backendMenu = response.data.data.map(cat => ({
          menu_name: cat.name,
          menu_image: cat.image
        }));
        setMenulist(backendMenu);
      } else {
         console.error("Failed to fetch menu list:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching menu categories:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get(url + "/api/settings/get");
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(url + "/api/user/get", {
        headers: { token },
      });
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const loadCardData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { token },
      });
      if (response.data && response.data.cartData) {
         setCartItems(response.data.cartData);
      }
    } catch (error) {
       console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function LoadData() {
      setIsLoading(true);
      setError(null); // Reset error on reload
      try {
        // Parallelize independent fetch requests
        const commonPromises = [
          fetchFoodList(),
          fetchMenuList(),
          fetchSettings()
        ];

        // Add user-specific data loading if a token exists
        const token = localStorage.getItem("token");
        if (token) {
          setToken(token);
          commonPromises.push(loadCardData(token));
          commonPromises.push(fetchUserData(token));
        }

        // Execute all requests concurrently
        await Promise.all(commonPromises);
      } catch (error) {
        console.error("Error loading initial data:", error);
        setError("An unexpected error occurred while loading data.");
      } finally {
        setIsLoading(false);
      }
    }
    LoadData();
  }, []);

  const contextValue = {
    food_list,
    menu_list,
    settings,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    url,
    token,
    setToken,
    userData,
    fetchUserData,
    isLoading, // Export isLoading
    error,     // Export error
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
