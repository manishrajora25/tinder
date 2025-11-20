// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import UserRoute from "./routes/userRoute.js";
// import profileRoute from "./routes/profileRouts.js";
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./server/server.js";
// import postRoute from "./routes/postRoute.js";
// import requestRoute from "./routes/requestRoute.js";
// import chatRoute from "./routes/chatRoute.js";

// import { createServer } from "http";
// import { Server } from "socket.io";
// import Message from "./models/Message.js";
// import jwt from "jsonwebtoken";

// dotenv.config();

// // EXPRESS APP
// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// // CORS
// const allowedOrigins = [
//   process.env.LOCAL_URL,
//   process.env.VERCEL_URL,
//   "http://localhost:5173",
//   "http://127.0.0.1:5500",
//   "http://localhost:5000",
//   "https://tinder-y763.onrender.com",
//   "https://tinder-1-qlqg.onrender.com",
// ];

// const localhostRegex = /^(http:\/\/localhost:\d+)$/;

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
//         return callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ROUTES
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/user", UserRoute);
// app.use("/profile", profileRoute);
// app.use("/post", postRoute);
// app.use("/request", requestRoute);
// app.use("/send", chatRoute);

// // HTTP + SOCKET SERVER
// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: {
//     origin: allowedOrigins,
//     credentials: true,
//   },
// });

// // ROOM ID CREATOR
// function getRoomId(user1, user2) {
//   if (!user1?._id || !user2?._id) {
//     console.log("❌ getRoomId: user1 or user2 missing");
//     return null;
//   }

//   const id1 = user1._id.toString();
//   const id2 = user2._id.toString();

//   return id1 < id2 ? id1 + id2 : id2 + id1;
// }

// io.on("connection", (socket) => {
//   console.log("socket connected:", socket.id);

//   // AUTHENTICATE SOCKET WITH JWT
//   socket.on("authenticate", ({ token }) => {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       socket.userId = decoded.id;
//       console.log("Socket Auth OK:", socket.userId);
//     } catch {
//       console.log("Socket Auth FAILED");
//     }
//   });

//   // JOIN ROOM
//   socket.on("join-room", ({ senderId, receiverId }) => {
//     if (!senderId || !receiverId) {
//       console.log("❌ join-room: senderId or receiverId missing");
//       return;
//     }

//     const roomId = getRoomId({ _id: senderId }, { _id: receiverId });

//     if (!roomId) return;

//     socket.join(roomId);
//     console.log("✅ Joined Room:", roomId);
//   });

//   // LEAVE ROOM
//   socket.on("leave-room", ({ senderId, receiverId }) => {
//     const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
//     socket.leave(roomId);
//   });

//   // SEND MESSAGE
//   socket.on("send_message", async (data) => {
//     try {
//       const roomId = getRoomId(
//         { _id: data.senderId },
//         { _id: data.receiverId }
//       );

//       if (!roomId) return;

//       const msgDoc = await Message.create({
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         message: data.message || "",
//         attachments: data.attachments || [],
//       });

//       io.to(roomId).emit("receive_message", {
//         _id: msgDoc._id,
//         senderId: msgDoc.senderId,
//         receiverId: msgDoc.receiverId,
//         message: msgDoc.message,
//         attachments: msgDoc.attachments,
//         createdAt: msgDoc.createdAt,
//         read: msgDoc.read,
//       });

//     } catch (err) {
//       console.error("Message Save Error:", err);
//       socket.emit("error_message", { message: "Message not saved" });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("socket disconnected:", socket.id);
//   });
// });

// // START SERVER
// httpServer.listen(port, () => {
//   console.log(`Server running at port ${port}`);
//   console.log(`Swagger Docs available at ${port}/api-docs`);
// });










// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import UserRoute from "./routes/userRoute.js";
// import profileRoute from "./routes/profileRouts.js";
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./server/server.js";
// import postRoute from "./routes/postRoute.js";
// import requestRoute from "./routes/requestRoute.js";
// import chatRoute from "./routes/chatRoute.js";

// import { createServer } from "http";
// import { Server } from "socket.io";
// import Message from "./models/Message.js";
// import jwt from "jsonwebtoken";





// dotenv.config();

// // EXPRESS APP
// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// // CORS
// const allowedOrigins = [
//   process.env.LOCAL_URL,
//   process.env.VERCEL_URL,
//   "http://localhost:5173",
//   "http://127.0.0.1:5500",
//   "http://localhost:5000",
//   "https://tinder-y763.onrender.com",
//   "https://tinder-1-qlqg.onrender.com",
// ];

// const localhostRegex = /^(http:\/\/localhost:\d+)$/;

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
//         return callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ROUTES
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/user", UserRoute);
// app.use("/profile", profileRoute);
// app.use("/post", postRoute);
// app.use("/request", requestRoute);
// app.use("/send", chatRoute);

// // HTTP + SOCKET SERVER
// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: {
//     origin: allowedOrigins,
//     credentials: true,
//   },
// });

// // 🔥 IMPORTANT: FIX - ADD ONLINE USERS STORE
// const onlineUsers = {};

// // ROOM ID CREATOR
// function getRoomId(user1, user2) {
//   if (!user1?._id || !user2?._id) {
//     console.log("❌ getRoomId: user1 or user2 missing");
//     return null;
//   }

//   const id1 = user1._id.toString();
//   const id2 = user2._id.toString();

//   return id1 < id2 ? id1 + id2 : id2 + id1;
// }

// // SOCKET CONNECTION — SINGLE BLOCK (MERGED)
// io.on("connection", (socket) => {
//   console.log("socket connected:", socket.id);

//   // AUTHENTICATE SOCKET WITH JWT
//   socket.on("authenticate", ({ token }) => {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       socket.userId = decoded.id;

//       // Mark user online
//       onlineUsers[socket.userId] = socket.id;

//       console.log("User Online:", socket.userId);

//       io.emit("user-online", socket.userId);
//     } catch {
//       console.log("Socket Auth FAILED");
//     }
//   });

//   // CHECK ONLINE STATUS
//   socket.on("check-online", ({ receiverId }) => {
//     if (onlineUsers[receiverId]) {
//       socket.emit("user-online", receiverId);
//     } else {
//       socket.emit("user-offline", receiverId);
//     }
//   });

//   // JOIN ROOM
//   socket.on("join-room", ({ senderId, receiverId }) => {
//     if (!senderId || !receiverId) return;

//     const roomId = getRoomId({ _id: senderId }, { _id: receiverId });

//     socket.join(roomId);
//     console.log("Joined Room:", roomId);
//   });

//   // LEAVE ROOM
//   socket.on("leave-room", ({ senderId, receiverId }) => {
//     const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
//     socket.leave(roomId);
//   });

//   // TYPING
//   socket.on("typing", ({ senderId, receiverId }) => {
//     const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
//     socket.to(roomId).emit("typing", { senderId });
//   });

//   socket.on("stop-typing", ({ senderId, receiverId }) => {
//     const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
//     socket.to(roomId).emit("stop-typing", { senderId });
//   });

//   // SEND MESSAGE
//   socket.on("send_message", async (data) => {
//     try {
//       const roomId = getRoomId(
//         { _id: data.senderId },
//         { _id: data.receiverId }
//       );

//       if (!roomId) return;

//       const msgDoc = await Message.create({
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         message: data.message || "",
//         attachments: data.attachments || [],
//       });

//       io.to(roomId).emit("receive_message", {
//         _id: msgDoc._id,
//         senderId: msgDoc.senderId,
//         receiverId: msgDoc.receiverId,
//         message: msgDoc.message,
//         attachments: msgDoc.attachments,
//         createdAt: msgDoc.createdAt,
//         read: msgDoc.read,
//       });
//     } catch (err) {
//       console.error("Message Save Error:", err);
//       socket.emit("error_message", { message: "Message not saved" });
//     }
//   });

//   // DISCONNECT
//   socket.on("disconnect", () => {
//     console.log("socket disconnected:", socket.id);

//     for (let userId in onlineUsers) {
//       if (onlineUsers[userId] === socket.id) {
//         delete onlineUsers[userId];
//         io.emit("user-offline", userId);
//         console.log("User Offline:", userId);
//         break;
//       }
//     }
//   });
// });

// // START SERVER
// httpServer.listen(port, () => {
//   console.log(`Server running at port ${port}`);
//   console.log(`Swagger Docs available at ${port}/api-docs`);
// });










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

import { createServer } from "http";
import { Server } from "socket.io";
import Message from "./models/Message.js";
import jwt from "jsonwebtoken";

dotenv.config();

// EXPRESS APP
const app = express();
const port = process.env.PORT || 5000;

connectDB();

// CORS - express (keep your allowedOrigins check for REST)
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

// ROUTES
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user", UserRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);
app.use("/request", requestRoute);
app.use("/send", chatRoute);

// HTTP + SOCKET SERVER
const httpServer = createServer(app);

// NOTE: for simplicity and to avoid origin mismatch issues during development,
// we use origin: "*" for socket.io. In production you can change to a stricter value.
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// -------------------------
// ONLINE USERS STORE
// -------------------------
// Map of userId -> socketId
const onlineUsers = {};

// -------------------------
// ROOM ID CREATOR (robust)
// -------------------------
function getRoomId(user1, user2) {
  if (!user1 || !user2 || !user1._id || !user2._id) {
    // invalid input
    return null;
  }

  const id1 = user1._id.toString();
  const id2 = user2._id.toString();

  // deterministic order
  return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
}

// -------------------------
// SINGLE SOCKET CONNECTION BLOCK
// -------------------------
io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  // ---------- AUTHENTICATE ----------
  // client may send token after connecting:
  socket.on("authenticate", ({ token }) => {
    if (!token) {
      // no token -> unauthenticated socket (we still allow joining rooms if you pass ids)
      console.log("authenticate called without token");
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      // mark user online
      onlineUsers[socket.userId] = socket.id;
      console.log("Socket Auth OK, user:", socket.userId);

      // notify others that this user is online (you can also emit only to followers/friends)
      io.emit("user-online", socket.userId);
    } catch (err) {
      console.log("Socket auth failed:", err?.message || err);
    }
  });

  // ---------- CHECK ONLINE ----------
  // client asks: "is this receiverId online?"
  socket.on("check-online", ({ receiverId }) => {
    if (!receiverId) {
      socket.emit("user-offline", null);
      return;
    }
    if (onlineUsers[receiverId]) {
      socket.emit("user-online", receiverId);
    } else {
      socket.emit("user-offline", receiverId);
    }
  });

  // ---------- JOIN ROOM ----------
  // expects senderId and receiverId (strings)
  socket.on("join-room", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) {
      console.log("join-room: missing senderId or receiverId");
      return;
    }
    if (senderId === receiverId) {
      // joining room with self — still allow but keep note
      const roomSelf = `self_${senderId}`;
      socket.join(roomSelf);
      console.log(`Joined self room: ${roomSelf}`);
      return;
    }

    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    if (!roomId) {
      console.log("join-room: invalid roomId");
      return;
    }
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // ---------- LEAVE ROOM ----------
  socket.on("leave-room", ({ senderId, receiverId }) => {
    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    if (!roomId) return;
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  // ---------- TYPING / STOP TYPING ----------
  // These events emit to the other sockets in the room (not the sender)
  socket.on("typing", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return;
    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    if (!roomId) return;
    socket.to(roomId).emit("typing", { senderId, receiverId });
  });

  socket.on("stop-typing", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return;
    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    if (!roomId) return;
    socket.to(roomId).emit("stop-typing", { senderId, receiverId });
  });

  // ---------- SEND MESSAGE ----------
  // Data expected: { senderId, receiverId, message, attachments? }
  socket.on("send_message", async (data) => {
    try {
      const { senderId, receiverId } = data;
      if (!senderId || !receiverId) {
        socket.emit("error_message", { message: "Invalid sender or receiver" });
        return;
      }

      // prevent sending message to self (optional)
      if (senderId === receiverId) {
        socket.emit("error_message", { message: "Cannot send message to yourself" });
        return;
      }

      const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
      if (!roomId) {
        socket.emit("error_message", { message: "Invalid room" });
        return;
      }

      // safe default for attachments
      const attachments = Array.isArray(data.attachments) ? data.attachments : [];

      // Save message to DB
      const msgDoc = await Message.create({
        senderId,
        receiverId,
        message: data.message || "",
        attachments,
      });

      // emit saved message to room
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
      console.error("Message Save Error:", err);
      socket.emit("error_message", { message: "Message not saved" });
    }
  });

  // ---------- DISCONNECT ----------
  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);

    // Remove the user from onlineUsers (if present)
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        // Broadcast offline status
        io.emit("user-offline", userId);
        console.log("User Offline:", userId);
        break;
      }
    }
  });
});

// START SERVER
httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
  console.log(`Swagger Docs available at ${port}/api-docs`);
});
