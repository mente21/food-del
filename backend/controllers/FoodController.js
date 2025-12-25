import foodModel from "../models/FoodModel.js";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

//add food item

const addFood = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.json({
      success: false,
      message: "Error: No image files uploaded.",
    });
  }

  try {
    // Upload multiple images to Cloudinary
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "food-delivery",
        resource_type: "image"
      });
      images.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    const food = new foodModel({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: images, 
      description: req.body.description,
    });

    await food.save();
    res.json({ success: true, message: "Food Item Added Successfully" });
  } catch (error) {
    console.error("Cloudinary/Database Error:", error);
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    res.json({ success: false, message: "Error while adding food item." });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({}).sort({ _id: -1 });
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const foodId = req.body._id || req.body.id;
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.json({ success: false, message: "Food item not found." });
    }

    // Delete all images from Cloudinary
    for (const imgUrl of food.image) {
      if (imgUrl.startsWith("http")) {
        const urlParts = imgUrl.split('/');
        const filename = urlParts[urlParts.length - 1].split('.')[0];
        const folder = urlParts[urlParts.length - 2];
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId).catch(err => console.error("Cloudinary delete error:", err));
      }
    }

    await foodModel.findByIdAndDelete(foodId);
    res.json({ success: true, message: "Food Item Removed Successfully" });
  } catch (error) {
    console.error("Error while removing food item:", error);
    res.json({ success: false, message: "Error while removing food item" });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;
    let images = [];
    
    const existingFood = await foodModel.findById(id);
    if (!existingFood) return res.json({ success: false, message: "Food not found" });

    if (req.files && req.files.length > 0) {
      // Upload new images
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "food-delivery",
          resource_type: "image"
        });
        images.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
      // Delete old images from Cloudinary
      for (const imgUrl of existingFood.image) {
        if (imgUrl.startsWith("http")) {
          const urlParts = imgUrl.split('/');
          const filename = urlParts[urlParts.length - 1].split('.')[0];
          const folder = urlParts[urlParts.length - 2];
          await cloudinary.uploader.destroy(`${folder}/${filename}`).catch(err => console.error(err));
        }
      }
    } else {
      images = existingFood.image;
    }

    await foodModel.findByIdAndUpdate(id, {
      name, description, price, category, image: images
    });

    res.json({ success: true, message: "Food Item Updated Successfully" });
  } catch (error) {
    console.error(error);
    if (req.files) {
      req.files.forEach(file => { if (fs.existsSync(file.path)) fs.unlinkSync(file.path); });
    }
    res.json({ success: false, message: "Error updating food item" });
  }
};

export { addFood, listFood, removeFood, updateFood };
