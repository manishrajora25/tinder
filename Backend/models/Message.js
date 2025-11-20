import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, default: "" },
  // optionally support attachments or image urls
  attachments: [{ type: String }],
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Index to speed up queries for conversations
MessageSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });
MessageSchema.index({ receiverId: 1, read: 1 });

export default mongoose.model("Message", MessageSchema);
