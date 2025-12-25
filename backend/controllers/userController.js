import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login user (No changes needed, but included for completeness)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "Login successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

//register user (Updated)
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // ✅ CRITICAL FIX: Ensure all required fields are present before continuing.
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide a name, email, and password.",
        });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    // This check is now safe because 'password' is guaranteed to exist.
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    // Log the error for server-side debugging
    console.log("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const { password, ...userData } = user._doc;
    res.json({ success: true, data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser, getUser };
