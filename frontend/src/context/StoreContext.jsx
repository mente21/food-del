import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodlist] = useState([]);
  const [menu_list, setMenulist] = useState([]);
  const [userData, setUserData] = useState(null);
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
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        // FIX: Add a check to ensure itemInfo is NOT undefined
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          // Optional: Log an error if a product is missing for debugging
          console.error(`Product with ID ${item} not found in food_list.`);
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
    const response = await axios.get(url + "/api/food/list");
    setFoodlist(response.data.data);
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
    const response = await axios.get(url + "/api/cart/get", {
      headers: { token },
    });
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function LoadData() {
      await fetchFoodList();
      await fetchMenuList();
      await fetchSettings();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
        await fetchUserData(localStorage.getItem("token"));
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
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
