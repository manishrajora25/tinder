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



export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMsg = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json({ success: true, newMsg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const getRecentChats = async (req, res) => {
  try {
    const userId = req.params.id;

    // ALL messages where user is sender OR receiver
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 });

    // Unique chat list (remove duplicates)
    const chatMap = {};

    for (let msg of messages) {
      const otherUser =
        msg.senderId.toString() === userId
          ? msg.receiverId.toString()
          : msg.senderId.toString();

      if (!chatMap[otherUser]) {
        chatMap[otherUser] = msg;
      }
    }

    const chatList = [];

    for (let otherUserId in chatMap) {
      const lastMsg = chatMap[otherUserId];

      const user = await User.findById(otherUserId).select("name image");

      chatList.push({
        userId: otherUserId,
        name: user?.name || "Unknown",
        image:
          user?.image?.trim() !== ""
            ? user.image
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        lastMessage: lastMsg.message,
        time: lastMsg.createdAt,
      });
    }

    res.status(200).json({ chats: chatList });
  } catch (err) {
    console.error("RECENT CHAT ERROR:", err);
    res.status(500).json({ message: "Server error in loading recent chats" });
  }
};
