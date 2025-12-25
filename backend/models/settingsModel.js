import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    phone: { type: String, default: "+1-212-456-7890" },
    email: { type: String, default: "contact@mentesdelivery.com" },
    facebook: { type: String, default: "#" },
    twitter: { type: String, default: "#" },
    linkedin: { type: String, default: "#" },
    instagram: { type: String, default: "#" },
    youtube: { type: String, default: "#" },
    tiktok: { type: String, default: "#" },
    telegram: { type: String, default: "#" },
    adminProfile: { type: String, default: "" },
    address: { type: String, default: "123 Foodie Street, Gourmet City" },
    aboutContent: { type: String, default: "Mente's Delivery is your favorite food delivery partner, providing fresh and delicious meals from top restaurants right to your doorstep." }
}, { timestamps: true });

const settingsModel = mongoose.models.settings || mongoose.model("settings", settingsSchema);

export default settingsModel;
