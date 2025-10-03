// import mongoose from "mongoose";

// const profileSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     bio: { type: String, trim: true },
//     age: { type: Number, required: true },
//     gender: { type: String, enum: ["male", "female", "other"], required: true },
//     interests: [{ type: String }],
//     image: { type: String }, // Cloudinary URL
//   },
//   { timestamps: true }
// );

// const Profile = mongoose.model("Profile", profileSchema);
// export default Profile;





import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bio: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  interests: { type: [String], default: [] },
  image: { type: String }, // Cloudinary URL
  attributes: { type: Array, default: [] }, // extra dynamic fields
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
