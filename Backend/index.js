


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




// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

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


// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
//       return callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());


// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// app.use("/user", UserRoute);
// app.use("/profile", profileRoute);
// app.use("/post", postRoute);
// app.use("/request", requestRoute);


// app.listen(port, () => {
//   console.log(`Server running at ${port}`);
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
// import chatRoute from "./routes/chatRoute.js"

// // 🔥 NEW IMPORTS FOR CHAT SOCKET
// import { createServer } from "http";
// import { Server } from "socket.io";
// import Message from "./models/Message.js";
// import jwt from "jsonwebtoken";

// dotenv.config();

// // ---------------- EXPRESS APP ----------------
// const app = express();
// const port = process.env.PORT || 5000;

// // MONGODB CONNECT
// connectDB();

// // CORS SETTINGS
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

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
//       return callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

// app.use(cors(corsOptions));
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

// // ---------------- HTTP + SOCKET SERVER SETUP ----------------
// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: {
//     origin: allowedOrigins,
//     credentials: true,
//   },
// });

// // CREATE CHAT ROOM ID
// function getRoomId(user1, user2) {
//   if (!user1 || !user1._id || !user2 || !user2._id) {
//     console.log("❌ getRoomId: user1 or user2 missing");
//     return null;
//   }

//   const id1 = user1._id.toString();
//   const id2 = user2._id.toString();

//   return id1 < id2 ? id1 + id2 : id2 + id1;
// }


// // ---------------- SOCKET.IO LOGIC ----------------
// io.on("connection", (socket) => {
//   console.log("socket connected:", socket.id);

//   // Authenticate using token
//   socket.on("authenticate", async ({ token }) => {
//     try {
//       const payload = jwt.verify(token, process.env.JWT_SECRET);
//       socket.userId = payload.id;
//       console.log("Socket Auth OK:", socket.userId);
//     } catch (e) {
//       console.log("Socket Auth FAILED");
//     }
//   });

//   // Join Chat Room
//   socket.on("join-room", ({ senderId, receiverId }) => {
//     if (!senderId || !receiverId) {
//       console.log("❌ getRoomId: senderId or receiverId missing");
//       return;
//     }
  
//     const roomId = getRoomId(
//       { _id: senderId },
//       { _id: receiverId }
//     );
  
//     socket.join(roomId);
//     console.log("✅ Joined Room:", roomId);
//   });
  
  
  
//   // Leave Room
//   socket.on("leave_room", ({ senderId, receiverId }) => {
//     const room = getRoomId(senderId, receiverId);
//     socket.leave(room);
//   });

//   // MESSAGE SEND
//   socket.on("send_message", async (data) => {
//     try {
//       const msgDoc = await Message.create({
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         message: data.message || "",
//         attachments: data.attachments || [],
//       });

//       const room = getRoomId(data.senderId, data.receiverId);

//       io.to(room).emit("receive_message", {
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

//   // On Disconnect
//   socket.on("disconnect", () => {
//     console.log("socket disconnected:", socket.id);
//   });
// });

// // ---------------- START SERVER ----------------
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

// CORS
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

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// ROOM ID CREATOR
function getRoomId(user1, user2) {
  if (!user1?._id || !user2?._id) {
    console.log("❌ getRoomId: user1 or user2 missing");
    return null;
  }

  const id1 = user1._id.toString();
  const id2 = user2._id.toString();

  return id1 < id2 ? id1 + id2 : id2 + id1;
}

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  // AUTHENTICATE SOCKET WITH JWT
  socket.on("authenticate", ({ token }) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      console.log("Socket Auth OK:", socket.userId);
    } catch {
      console.log("Socket Auth FAILED");
    }
  });

  // JOIN ROOM
  socket.on("join-room", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) {
      console.log("❌ join-room: senderId or receiverId missing");
      return;
    }

    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });

    if (!roomId) return;

    socket.join(roomId);
    console.log("✅ Joined Room:", roomId);
  });

  // LEAVE ROOM
  socket.on("leave-room", ({ senderId, receiverId }) => {
    const roomId = getRoomId({ _id: senderId }, { _id: receiverId });
    socket.leave(roomId);
  });

  // SEND MESSAGE
  socket.on("send_message", async (data) => {
    try {
      const roomId = getRoomId(
        { _id: data.senderId },
        { _id: data.receiverId }
      );

      if (!roomId) return;

      const msgDoc = await Message.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
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
        read: msgDoc.read,
      });

    } catch (err) {
      console.error("Message Save Error:", err);
      socket.emit("error_message", { message: "Message not saved" });
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
  });
});

// START SERVER
httpServer.listen(port, () => {
  console.log(`Server running at port ${port}`);
  console.log(`Swagger Docs available at ${port}/api-docs`);
});
