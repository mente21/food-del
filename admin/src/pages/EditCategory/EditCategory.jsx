import React, { useState, useEffect } from "react";
import "../Add/Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const EditCategory = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const [name, setName] = useState("");
    const [existingImage, setExistingImage] = useState("");

    const fetchCategoryDetails = async () => {
        try {
            const response = await axios.get(`${url}/api/category/list`);
            if (response.data.success) {
                const category = response.data.data.find(cat => cat._id === id);
                if (category) {
                    setName(category.name);
                    setExistingImage(category.image);
                }
            }
        } catch (error) {
            toast.error("Error fetching category details");
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post(`${url}/api/category/update`, formData);
            if (response.data.success) {
                toast.success("Category updated successfully");
                navigate("/list-category");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error updating category");
        }
    };

    return (
        <div className="add-category add">
            <h2>Edit Category</h2>
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Category Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : existingImage || assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </div>
                <div className="add-category-name flex-col">
                    <p>Category Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" placeholder="Salad, Pasta, etc." required />
                </div>
                <button type="submit" className="add-btn">SAVE CHANGES</button>
            </form>
        </div>
    );
};

export default EditCategory;
