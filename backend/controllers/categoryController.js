import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

// Add new category
const addCategory = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "Error: No image file uploaded." });
    }

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "food-delivery/categories",
            resource_type: "image"
        });

        const category = new categoryModel({
            name: req.body.name,
            image: result.secure_url
        });

        await category.save();

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        res.json({ success: true, message: "Category Added Successfully" });
    } catch (error) {
        console.error("Cloudinary/Database Error:", error);
        
        // Cleanup local file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {
                console.error("Cleanup error:", e);
            }
        }

        res.json({ success: false, message: "Error while adding category." });
    }
};

// List all categories
const listCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).sort({ _id: -1 });
        res.json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching categories" });
    }
};

// Remove category
const removeCategory = async (req, res) => {
    try {
        const categoryId = req.body.id;
        const category = await categoryModel.findById(categoryId);

        if (!category) {
            return res.json({ success: false, message: "Category not found." });
        }

        // Delete image from Cloudinary
        if (category.image.startsWith("http")) {
            const urlParts = category.image.split('/');
            const filenameWithExtension = urlParts[urlParts.length - 1];
            const filename = filenameWithExtension.split('.')[0];
            const folder = "food-delivery/categories";
            const publicId = `${folder}/${filename}`;
            await cloudinary.uploader.destroy(publicId);
        }

        await categoryModel.findByIdAndDelete(categoryId);
        res.json({ success: true, message: "Category Removed Successfully" });
    } catch (error) {
        console.error("Error while removing category:", error);
        res.json({ success: false, message: "Error while removing category" });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id, name } = req.body;
        const category = await categoryModel.findById(id);
        if (!category) return res.json({ success: false, message: "Category not found" });

        let imageUrl = category.image;

        if (req.file) {
            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "food-delivery/categories",
                resource_type: "image"
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);

            // Delete old image
            const urlParts = category.image.split('/');
            const filename = urlParts[urlParts.length - 1].split('.')[0];
            await cloudinary.uploader.destroy(`food-delivery/categories/${filename}`).catch(err => console.error(err));
        }

        await categoryModel.findByIdAndUpdate(id, { name, image: imageUrl });
        res.json({ success: true, message: "Category Updated Successfully" });
    } catch (error) {
        console.error(error);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.json({ success: false, message: "Error updating category" });
    }
};

export { addCategory, listCategories, removeCategory, updateCategory };
