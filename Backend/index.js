// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import UserRoute from "./routes/userRoute.js";
// import profileRoute from "./routes/profileRouts.js"; // corrected
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./server/server.js"; // small s


// dotenv.config();

// const app = express();
// const port = process.env.PORT;

// const allowedOrigins = [
//   process.env.DEPLOYED_FRONTEND_URL,
//   process.env.LOCAL_URL,
//   process.env.VERCEL_URL,
//   "http://localhost:5173", 
//   "http://127.0.0.1:5500",
//   "https://e-commerce-tau-beige-19.vercel.app/"
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

// // Routes
// app.use("/profile", profileRoute);
// app.use("/user", UserRoute);

// // Connect DB & start server
// connectDB();
// app.listen(port, () => {
//   console.log(`Server running at port ${port}`);
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

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  process.env.LOCAL_URL,
  process.env.VERCEL_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5500",
  "http://localhost:5000"
];

const localhostRegex = /^(http:\/\/localhost:\d+)$/;


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/user", UserRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);


app.listen(port, () => {
  console.log(`Server running at ${port}`);
  console.log(`Swagger Docs available at ${port}/api-docs`);
});
