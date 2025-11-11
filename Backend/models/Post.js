// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String, // Image URL or local path
//     required: true,
//   },
// }, { timestamps: true });

// export default mongoose.model("Post", postSchema);



import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 9,
        message: "A post must have between 1 and 9 images"
      },
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
