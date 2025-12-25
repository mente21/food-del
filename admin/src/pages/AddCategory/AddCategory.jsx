import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import "./AddCategory.css";

const AddCategory = ({ url }) => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);

    const response = await axios.post(`${url}/api/category/add`, formData);
    if (response.data.success) {
      setName("");
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add-category-page">
      <form className="flex-col" onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Category Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Category name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
            placeholder="e.g. Desserts, Burgers"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          ADD CATEGORY
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
