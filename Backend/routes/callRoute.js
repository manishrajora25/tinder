import express from "express";
import CallHistory from "../models/CallHistory.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

// ✅ AUTH MIDDLEWARE (same JWT as your project)
// const isAuth = (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.token ||
//       req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ success: false, message: "No token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// ✅ SAVE CALL HISTORY
router.post("/save", checkToken, async (req, res) => {
  try {
    const { caller, receiver, type, duration, status } = req.body;

    if (!caller || !receiver || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const call = await CallHistory.create({
      caller,
      receiver,
      type,
      duration,
      status,
    });

    res.json({
      success: true,
      message: "Call history saved",
      call,
    });
  } catch (err) {
    console.log("Call Save Error:", err);
    res.status(500).json({
      success: false,
      message: "Call history not saved",
    });
  }
});

// ✅ GET CALL HISTORY OF A USER
router.get("/:userId", checkToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const calls = await CallHistory.find({
      $or: [{ caller: userId }, { receiver: userId }],
    })
      .populate("caller", "name email image")
      .populate("receiver", "name email image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      calls,
    });
  } catch (err) {
    console.log("Call Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch call history",
    });
  }
});

export default router;
