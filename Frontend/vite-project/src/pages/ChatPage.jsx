import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Instance from "../AxiosConfig";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
});

export default function ChatPage() {
  const { id: receiverId } = useParams();

  const [senderId, setSenderId] = useState(null);
  const [receiverUser, setReceiverUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isOnline, setIsOnline] = useState(false);
  const [typing, setTyping] = useState(false);

  const [receiverPostImage, setReceiverPostImage] = useState("");


  // Get Logged User ID
  useEffect(() => {
    Instance.get("/user/me")
      .then((res) => {
        setSenderId(res.data.user._id);
      })
      .catch(() => console.log("User not logged in"));
  }, []);

  // Fetch Receiver User Info (name, image)
  useEffect(() => {
    Instance.get(`/user/${receiverId}`)
      .then((res) => setReceiverUser(res.data.user))
      .catch((err) => console.log(err));
  }, [receiverId]);

  // Join Room
  useEffect(() => {
    if (senderId && receiverId) {
      socket.emit("join-room", { senderId, receiverId });

      // Check online status
      socket.emit("check-online", receiverId);
    }
  }, [senderId, receiverId]);

  // Load Previous Messages
  useEffect(() => {
    if (!senderId || !receiverId) return;

    Instance.get(`/send/get/message/${senderId}/${receiverId}`)
      .then((res) => setMessages(res.data.messages))
      .catch(() => console.log("Error loading messages"));
  }, [senderId, receiverId]);

  // Socket Events
  useEffect(() => {
    // Receive new messages
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Online/Offline
    socket.on("user-online", (id) => {
      if (id === receiverId) setIsOnline(true);
    });

    socket.on("user-offline", (id) => {
      if (id === receiverId) setIsOnline(false);
    });

    // Typing
    socket.on("typing", ({ senderId: id }) => {
      if (id === receiverId) setTyping(true);
    });

    socket.on("stop-typing", ({ senderId: id }) => {
      if (id === receiverId) setTyping(false);
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stop-typing");
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, [receiverId]);

  // Send Message
  const sendMessage = () => {
    if (!input.trim()) return;

    const msgData = {
      senderId,
      receiverId,
      message: input,
      time: new Date(),
    };

    socket.emit("send_message", msgData);
    setInput("");

    // STOP TYPING
    socket.emit("stop-typing", { senderId, receiverId });
  };

  // Typing event
  const handleTyping = (e) => {
    setInput(e.target.value);

    socket.emit("typing", { senderId, receiverId });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stop-typing", { senderId, receiverId });
    }, 1000);
  };

  

  if (!senderId) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-blue-600 text-white shadow">
      <img
  src={receiverUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
  className="w-12 h-12 rounded-full"
  alt="profile"
/>


        <div>
          <h2 className="text-lg font-semibold">{receiverUser?.name}</h2>
          <p className="text-sm">
            {typing
              ? "Typing..."
              : isOnline
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded max-w-[70%] ${
              msg.senderId === senderId
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white border shadow"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-3 gap-2 bg-white shadow">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={handleTyping}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>

    </div>
  );
}
