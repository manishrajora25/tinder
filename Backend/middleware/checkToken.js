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






import jwt from "jsonwebtoken";
import User from "../models/user.js";  // <-- User model import karo
import 'dotenv/config';

const checkToken = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ message: "No Token Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user ko DB se nikal ke attach karo
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;  // ab req.user._id available hoga
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default checkToken;
