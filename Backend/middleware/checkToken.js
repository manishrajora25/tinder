// import jwt from "jsonwebtoken";
// import 'dotenv/config';

// const checkToken = (req, res, next) => {
//   console.log(" hekwjw manish")
//   try {
//     const token = req.cookies.userToken;
//     if (!token) return res.status(401).json({ message: "No Token Found" });
//   // console.log(token)
//       const decoded = jwt.verify(token, process.env.jWT_SECRET);
//       req.user = decoded;
//       // req.role = decoded;
//       console.log( decoded)
//       next();
//     } catch (err) {
//       res.status(401).json({ message: "Invalid Token" });
//     }
//   };

// export default checkToken;






// import jwt from "jsonwebtoken";
// import User from "../models/user.js";  // <-- User model import karo
// import 'dotenv/config';

// const checkToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.userToken;
//     if (!token) {
//       return res.status(401).json({ message: "No Token Found" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // user ko DB se nikal ke attach karo
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user;  // ab req.user._id available hoga
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };

// export default checkToken;









import jwt from "jsonwebtoken";
import User from "../models/user.js";
import "dotenv/config.js";

const checkToken = async (req, res, next) => {
  try {
    // ✅ 1. Get token from cookie OR Authorization header
    const token =
      req.cookies?.userToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // ✅ 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 3. Find user in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ 4. Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default checkToken;
