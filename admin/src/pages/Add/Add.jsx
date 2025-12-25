import React, { useState } from "react";
import "./Add.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
const Add = ({ url }) => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/list`);
      if (response.data.success) {
        setCategories(response.data.data);
        if (response.data.data.length > 0 && !data.category) {
          setData(prev => ({ ...prev, category: response.data.data[0].name }));
        }
      }
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if (images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    const formData = new FormData();
    images.forEach(img => {
      formData.append("image", img);
    });
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: categories.length > 0 ? categories[0].name : "",
        });
        setImages([]);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding food item");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Images (Max 5)</p>
          <label htmlFor="image">
            <div className="multi-image-preview">
              {images.length > 0 ? (
                images.map((img, idx) => (
                  <img key={idx} src={URL.createObjectURL(img)} alt="" />
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
            required
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
          ADD
        </button>
      </form>
    </div>
  );
};
// export default Add would likely follow this component
export default Add;
