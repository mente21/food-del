import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Settings.css";
import { assets } from "../../assets/assets";

const Settings = ({ url }) => {
  const [adminProfileFile, setAdminProfileFile] = useState(false);
  const [data, setData] = useState({
    phone: "",
    email: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    telegram: "",
    address: "",
    aboutContent: "",
    adminProfile: ""
  });

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${url}/api/settings/get`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching settings");
    }
  };

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (adminProfileFile) {
      formData.append("image", adminProfileFile);
    }
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("facebook", data.facebook);
    formData.append("twitter", data.twitter);
    formData.append("linkedin", data.linkedin);
    formData.append("instagram", data.instagram);
    formData.append("youtube", data.youtube);
    formData.append("tiktok", data.tiktok);
    formData.append("telegram", data.telegram);
    formData.append("address", data.address);
    formData.append("aboutContent", data.aboutContent);

    try {
      const response = await axios.post(`${url}/api/settings/update`, formData);
      if (response.data.success) {
        toast.success("Settings updated successfully");
        setAdminProfileFile(false);
        fetchSettings();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="settings-page">
      <h2 className="page-title">Company Info & Settings</h2>
      <form className="flex-col" onSubmit={onsubmitHandler}>
        <div className="settings-section">
          <h3>Admin Settings</h3>
          <div className="add-img-upload flex-col">
            <p>Admin Profile Image</p>
            <label htmlFor="adminProfile">
              <img
                src={adminProfileFile ? URL.createObjectURL(adminProfileFile) : (data.adminProfile || assets.upload_area)}
                alt="profile"
                className="settings-logo-preview"
              />
            </label>
            <input
              onChange={(e) => setAdminProfileFile(e.target.files[0])}
              type="file"
              id="adminProfile"
              hidden
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Contact Information</h3>
          <div className="settings-grid">
            <div className="input-group">
              <p>Phone Number</p>
              <input onChange={onchangeHandler} value={data.phone} name="phone" type="text" placeholder="+1-212-456-7890" />
            </div>
            <div className="input-group">
              <p>Email Address</p>
              <input onChange={onchangeHandler} value={data.email} name="email" type="email" placeholder="contact@mentesdelivery.com" />
            </div>
          </div>
          <div className="input-group full-width">
            <p>Physical Address</p>
            <input onChange={onchangeHandler} value={data.address} name="address" type="text" placeholder="123 Foodie Street, Gourmet City" />
          </div>
        </div>

        <div className="settings-section">
          <h3>Social Media Links</h3>
          <div className="settings-grid">
            <div className="input-group">
              <p>Facebook URL</p>
              <input onChange={onchangeHandler} value={data.facebook} name="facebook" type="text" placeholder="https://facebook.com/mentes" />
            </div>
            <div className="input-group">
              <p>Twitter (X) URL</p>
              <input onChange={onchangeHandler} value={data.twitter} name="twitter" type="text" placeholder="https://twitter.com/mentes" />
            </div>
            <div className="input-group">
              <p>LinkedIn URL</p>
              <input onChange={onchangeHandler} value={data.linkedin} name="linkedin" type="text" placeholder="https://linkedin.com/company/mentes" />
            </div>
            <div className="input-group">
              <p>Instagram URL</p>
              <input onChange={onchangeHandler} value={data.instagram} name="instagram" type="text" placeholder="https://instagram.com/mentes" />
            </div>
            <div className="input-group">
              <p>YouTube URL</p>
              <input onChange={onchangeHandler} value={data.youtube} name="youtube" type="text" placeholder="https://youtube.com/@mentes" />
            </div>
            <div className="input-group">
              <p>TikTok URL</p>
              <input onChange={onchangeHandler} value={data.tiktok} name="tiktok" type="text" placeholder="https://tiktok.com/@mentes" />
            </div>
            <div className="input-group">
              <p>Telegram URL</p>
              <input onChange={onchangeHandler} value={data.telegram} name="telegram" type="text" placeholder="https://t.me/mentes" />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>About Company Content</h3>
          <div className="input-group full-width">
            <textarea
              onChange={onchangeHandler}
              value={data.aboutContent}
              name="aboutContent"
              rows="5"
              placeholder="Write a brief description of your company..."
            ></textarea>
          </div>
        </div>

        <button type="submit" className="add-btn save-btn">
          SAVE SETTINGS
        </button>
      </form>
    </div>
  );
};

export default Settings;
