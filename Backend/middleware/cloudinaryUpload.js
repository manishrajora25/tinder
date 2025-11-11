// import multer from "multer";
// import cloudinary from "../config/cloudinary.js";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "tinder_profiles",
//     allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;







// middleware/cloudinaryUpload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tinder_profiles",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif", "mp4", "pdf", "mp3"],

  },
});

const upload = multer({ storage });

export default upload;
