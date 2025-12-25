import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, userData } =
    useContext(StoreContext);
  const nav = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Pre-fill form if userData has an address
  useEffect(() => {
    if (userData) {
      if (userData.address && Object.keys(userData.address).length > 0) {
        setData(userData.address);
      } else {
        // Fallback: fill email from account
        setData((prev) => ({ ...prev, email: userData.email || "" }));
      }
    }
  }, [userData]);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      origin: window.location.origin,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert(response.data.message || "Error placing order");
    }
  };
  useEffect(() => {
    if (!token) {
      nav("/cart");
    } else if (getTotalCartAmount() === 0) {
      nav("/");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            value={data.lastName}
            name="lastName"
            onChange={onChangeHandler}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email address"
        />
        <input
          required
          name="street"
          value={data.street}
          type="text"
          onChange={onChangeHandler}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            value={data.city}
            name="city"
            type="text"
            onChange={onChangeHandler}
            placeholder="City"
          />
          <input
            required
            value={data.state}
            name="state"
            type="text"
            onChange={onChangeHandler}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            value={data.zipcode}
            name="zipcode"
            type="text"
            onChange={onChangeHandler}
            placeholder="Zip code"
          />
          <input
            required
            value={data.country}
            name="country"
            type="text"
            onChange={onChangeHandler}
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          value={data.phone}
          type="text"
          onChange={onChangeHandler}
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
