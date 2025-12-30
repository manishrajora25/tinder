import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoute from "./routes/userRoute.js";
import profileRoute from "./routes/profileRouts.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./server/server.js";
import postRoute from "./routes/postRoute.js";
import requestRoute from "./routes/requestRoute.js";
import chatRoute from "./routes/chatRoute.js";
import callRoute from "./routes/callRoute.js";


import { createServer } from "http";
import { Server } from "socket.io";
import Message from "./models/Message.js";
import jwt from "jsonwebtoken";




dotenv.config();

// EXPRESS APP
const app = express();
const port = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  process.env.LOCAL_URL,
  process.env.VERCEL_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5500",
  "http://localhost:5000",
  "https://tinder-y763.onrender.com",
  "https://tinder-1-qlqg.onrender.com",
];

const localhostRegex = /^(http:\/\/localhost:\d+)$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
        return callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------- ROUTES ----------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user", UserRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);
app.use("/request", requestRoute);
app.use("/send", chatRoute);
app.use("/call", callRoute);


// ---------- HTTP + SOCKET SERVER ----------
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// ---------- ONLINE USERS STORE ----------
const onlineUsers = {}; // userId -> socketId

// ---------- ROOM ID CREATOR ----------
function getRoomId(user1, user2) {
  if (!user1 || !user2 || !user1._id || !user2._id) return null;

  const id1 = user1._id.toString();
  const id2 = user2._id.toString();

  return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
}

// ===================================================
// ✅✅✅ SINGLE SOCKET CONNECTION (FINAL)
// ===================================================
io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);

  // ---------- AUTH ----------
  socket.on("authenticate", ({ token, userId }) => {
    try {
      let id = userId;
  
      // fallback to token
      if (!id && token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        id = decoded.id;
      }
  
      if (!id) {
        console.log("❌ AUTH FAILED: No userId and no token");
        return;
      }
  
      socket.userId = id;
      onlineUsers[id] = socket.id;
  
      console.log("✅ Socket Auth:", id, "->", socket.id);
      io.emit("user-online", id);
    } catch (err) {
      console.log("❌ Socket auth failed:", err.message);
    }
  });
  

  // ---------- CHECK ONLINE ----------
  socket.on("check-online", ({ receiverId }) => {
    const isOnline = !!onlineUsers[receiverId];
  
    console.log(
      "🔍 CHECK ONLINE:",
      receiverId,
      "->",
      isOnline ? "ONLINE" : "OFFLINE"
    );
  
    // ✅ Sender ko status bhejo
    socket.emit(isOnline ? "user-online" : "user-offline", receiverId);
  });
  
  // ---------- JOIN ROOM ----------
  socket.on("join-room", ({ senderId, receiverId }) => {
    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    if (roomId) socket.join(roomId);
  });

  // ---------- TYPING ----------
  socket.on("typing", ({ senderId, receiverId }) => {
    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    if (roomId) socket.to(roomId).emit("typing", { senderId });
  });

  socket.on("stop-typing", ({ senderId, receiverId }) => {
    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    if (roomId) socket.to(roomId).emit("stop-typing", { senderId });
  });

  // ---------- SEND MESSAGE ----------
  socket.on("send_message", async (data) => {
    try {
      const { senderId, receiverId } = data;

      if (!senderId || !receiverId) return;

      const roomId = getRoomId({ _id: senderId }, { _id: receiverId });

      const msgDoc = await Message.create({
        senderId,
        receiverId,
        message: data.message || "",
        attachments: data.attachments || [],
      });

      io.to(roomId).emit("receive_message", {
        _id: msgDoc._id,
        senderId: msgDoc.senderId,
        receiverId: msgDoc.receiverId,
        message: msgDoc.message,
        attachments: msgDoc.attachments,
        createdAt: msgDoc.createdAt,
        read: msgDoc.read ?? false,
      });
    } catch (err) {
      console.log("❌ Message save error:", err.message);
    }
  });

  // ===================================================
  // ✅✅✅ CALL EVENTS (FIXED & WORKING)
  // ===================================================

  // socket.on("call-user", (data) => {
  //   console.log("📞 CALL FROM:", data.from, "TO:", data.to);
  
  //   const receiverSocketId = onlineUsers[data.to];
  //   console.log("🎯 RECEIVER SOCKET:", receiverSocketId);
  
  //   if (receiverSocketId) {
  //     io.to(receiverSocketId).emit("incoming-call", data);
  //     console.log("✅ INCOMING CALL SENT");
  //   } else {
  //     console.log("❌ RECEIVER OFFLINE OR NOT AUTHENTICATED");
  //   }
  // });
  

  socket.on("call-user", (data) => {
    const receiverSocketId = onlineUsers[data.to];
  
    console.log("📞 CALL FROM:", data.from, "TO:", data.to);
    console.log("🎯 RECEIVER SOCKET:", receiverSocketId);
  
    if (!receiverSocketId) {
      socket.emit("call-failed", {
        reason: "offline",
      });
      return;
    }
  
    io.to(receiverSocketId).emit("incoming-call", data);
  });
  

  socket.on("accept-call", (data) => {
    const callerSocketId = onlineUsers[data.to];
    if (callerSocketId) {
      io.to(callerSocketId).emit("call-accepted", data);
    }
  });

  socket.on("webrtc-ice", (data) => {
    const targetSocketId = onlineUsers[data.to];
    if (targetSocketId) {
      io.to(targetSocketId).emit("webrtc-ice", data);
    }
  });


  socket.on("end-call", ({ to }) => {
    const targetSocket = onlineUsers[to];
    if (targetSocket) {
      io.to(targetSocket).emit("call-ended");
    }
  });


   // ---------- DISCONNECT ----------

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        io.emit("user-offline", userId);
        console.log("🔴 User Offline:", userId);
        break;
      }
    }
  });

});






// ---------- START SERVER ----------
httpServer.listen(port, () => {
  console.log(`✅ Server running at port ${port}`);
  console.log(`✅ Swagger Docs available at ${port}/api-docs`);
});
