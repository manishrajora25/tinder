import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender or Receiver missing" });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })
      .sort({ createdAt: 1 }) // old → new
      .lean();

    return res.status(200).json({ messages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
