// // import User from "../models/user.js";
// // import jwt from "jsonwebtoken";

// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// // };

// // // @desc Register user
// // export const registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     const userExists = await User.findOne({  email });
// //     if (userExists) return res.status(400).json({ message: "User already exists" });

// //     const user = await User.create({ name, email, password });
// //     res.status(201).json({
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       token: generateToken(user._id),
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // @desc Login user
// // export const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     console.log(email, password);

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (!isPasswordValid) {
// //       return res.status(401).json({ message: "Invalid Credentials" });
// //     }

// //     const userToken = jwt.sign(
// //       {
// //         id: user._id,
// //         email: user.email,
// //         role: user.role,
// //       },
// //       process.env.jWT_SECRET,
// //       { expiresIn: "1h" }
// //     );

// //     res
// //       .cookie("userToken", userToken, {
// //         httpOnly: true,
// //         secure: true, // true if you're using HTTPS in production
// //         sameSite: "None",
// //         maxAge: 60 * 60 * 1000, // ✅ 1 hour in milliseconds
// //       })
// //       .send({
// //         message: "User Login Successfully",
// //         user: {
// //           id: user._id,
// //           email: user.email,
// //           role: user.role,
// //         },
// //       });
// //   } catch (err) {
// //     console.error("Login error:", err.message);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };







// import User from "../models/user.js";
// import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, password });

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
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };





import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request:", email, password);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const userToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET, // ✅ fixed (correct env name)
      { expiresIn: "1h" }
    );

    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None", // ✅ local par Lax use karo
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "User Login Successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
