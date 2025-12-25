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
        let settings = await settingsModel.findOne({});
        
        let adminProfileUrl = settings ? settings.adminProfile : "";

        if (req.file) {
            // Upload new profile image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "food-delivery/admin",
                resource_type: "image"
            });
            adminProfileUrl = result.secure_url;
            // Delete local file
            fs.unlinkSync(req.file.path);
        }

        if (!settings) {
            settings = new settingsModel({
                phone, email, facebook, twitter, linkedin, instagram, youtube, tiktok, telegram, address, aboutContent,
                adminProfile: adminProfileUrl
            });
        } else {
            settings.phone = phone || settings.phone;
            settings.email = email || settings.email;
            settings.facebook = facebook || settings.facebook;
            settings.twitter = twitter || settings.twitter;
            settings.linkedin = linkedin || settings.linkedin;
            settings.instagram = instagram || settings.instagram;
            settings.youtube = youtube || settings.youtube;
            settings.tiktok = tiktok || settings.tiktok;
            settings.telegram = telegram || settings.telegram;
            settings.address = address || settings.address;
            settings.aboutContent = aboutContent || settings.aboutContent;
            settings.adminProfile = adminProfileUrl;
        }

        await settings.save();
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
        res.json({ success: false, message: "Error updating settings" });
    }
};

export { getSettings, updateSettings };
