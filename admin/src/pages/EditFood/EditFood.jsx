import React, { useState, useEffect } from "react";
import "../Add/Add.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const EditFood = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const fetchFoodDetails = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const food = response.data.data.find(item => item._id === id);
        if (food) {
          setData({
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category
          });
          // Existing images as strings, not Files. We just display them.
          setImages(food.image);
        }
      }
    } catch (error) {
      toast.error("Error fetching food details");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/list`);
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchFoodDetails();
    fetchCategories();
  }, [id]);

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    
    // Only append images if new ones are selected (Files)
    if (images.length > 0 && images[0] instanceof File) {
      images.forEach(img => {
        formData.append("image", img);
      });
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData);
      if (response.data.success) {
        toast.success("Food updated successfully");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating food");
    }
  };

  return (
    <div className="add">
      <h2>Edit Food Item</h2>
      <form className="flex-col" onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Images (Max 5)</p>
          <label htmlFor="image">
            <div className="multi-image-preview">
              {images.length > 0 ? (
                images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img instanceof File ? URL.createObjectURL(img) : img} 
                    alt="" 
                  />
                ))
              ) : (
                <img src={assets.upload_area} alt="" />
              )}
            </div>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            hidden
            multiple
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onchangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onchangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onchangeHandler} name="category" value={data.category}>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onchangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
};

export default EditFood;
