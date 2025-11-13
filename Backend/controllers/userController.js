// import User from "../models/user.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Login request:", email, password);

//     const user = await User.findOne({ email});
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid Credentials" });
//     }

//     const userToken = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.cookie("userToken", userToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "User Login Successfully",
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const logoutUser = async (req, res) => {
//   try {
//     res.clearCookie("userToken", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     });

//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     res.status(500).json({ error: "Logout failed" });
//   }
// };

import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password, 
      image: imageUrl,
      role: role === "admin" ? "admin" : "User",
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  // console.log("first");
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const userToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("userToken", userToken, {
        httpOnly: true,
        secure: true, // true if you're using HTTPS in production
        sameSite: "None",
        maxAge: 60 * 60 * 1000,
      })
      .send({
        message: "User Login Successfully",
        user: { id: user._id, email: user.email, role: user.role },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = req.user; // checkToken middleware se aata hai
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("❌ getMe error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
