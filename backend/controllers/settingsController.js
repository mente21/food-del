import settingsModel from "../models/settingsModel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Get all settings
const getSettings = async (req, res) => {
    try {
        let settings = await settingsModel.findOne({});
        if (!settings) {
            // Create default settings if none exist
            settings = await settingsModel.create({});
        }
        res.json({ success: true, data: settings });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching settings" });
    }
};

// Update settings
const updateSettings = async (req, res) => {
    try {
        const { phone, email, facebook, twitter, linkedin, instagram, youtube, tiktok, telegram, address, aboutContent } = req.body;
        
        let updateData = {
            phone, email, facebook, twitter, linkedin, instagram, youtube, tiktok, telegram, address, aboutContent
        };

        // Remove undefined fields so we don't overwrite existing data with nothing (if partial update)
        // However, form-data usually sends empty strings, so we might want to keep them if they are explicitly sent.
        // But for safety let's use the explicit assignment.

        if (req.file) {
            // Upload new profile image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "food-delivery/admin",
                resource_type: "image"
            });
            updateData.adminProfile = result.secure_url;
            
            // Delete local file
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        }

        const settings = await settingsModel.findOneAndUpdate(
            {}, 
            updateData, 
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ success: true, message: "Settings updated successfully", data: settings });
    } catch (error) {
        console.error("Update Settings Error:", error);
        if (req.file && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {
                console.error("Cleanup error:", e);
            }
        }
        res.json({ success: false, message: "Error updating settings: " + error.message });
    }
};

export { getSettings, updateSettings };
