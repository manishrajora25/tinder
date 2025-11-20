// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client"; // FIX 1
// import Instance from "../AxiosConfig";

// // SOCKET
// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   withCredentials: true,
//   transports: ["websocket"],
// });

// export default function ChatPage() {
//   const { id: receiverId } = useParams();

//   const [senderId, setSenderId] = useState(null);
//   const [receiverUser, setReceiverUser] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOnline, setIsOnline] = useState(false);
//   const [typing, setTyping] = useState(false);

//   // 🟦 Logged-in User (Sender)
//   useEffect(() => {
//     Instance.get("/user/me")
//       .then((res) => {
//         setSenderId(res.data.user._id);

//         socket.emit("authenticate", {
//           token: res.data.token || localStorage.getItem("token"),
//         });
//       })
//       .catch(() => console.log("User not logged in"));
//   }, []);

//   // 🟩 Receiver User Info (Name + Image)
//   useEffect(() => {
//     if (!receiverId) return;

//     Instance.get(`/user/${receiverId}`)
//       .then((res) => {
//         setReceiverUser(res.data.user);
//       })
//       .catch((err) => console.log(err));
//   }, [receiverId]);

//   // 🟨 Join Room + Check Online
//   useEffect(() => {
//     if (senderId && receiverId) {
//       setTimeout(() => {
//         socket.emit("join-room", { senderId, receiverId });
//         socket.emit("check-online", { receiverId });
//       }, 300); // FIX 2
//     }
//   }, [senderId, receiverId]);

//   // 🟧 Load Chat History
//   useEffect(() => {
//     if (!senderId || !receiverId) return;

//     Instance.get(`/send/get/message/${senderId}/${receiverId}`)
//       .then((res) => setMessages(res.data.messages))
//       .catch(() => console.log("Error loading messages"));
//   }, [senderId, receiverId]);

//   // 🟥 SOCKET LISTENERS — Clean Version
//   useEffect(() => {
//     const handleReceiveMessage = (msg) => {
//       setMessages((prev) => [...prev, msg]); // FIX 3 no duplicates
//     };

//     const handleOnline = (id) => {
//       if (id === receiverId) setIsOnline(true);
//     };

//     const handleOffline = (id) => {
//       if (id === receiverId) setIsOnline(false);
//     };

//     const handleTyping = (data) => {
//       if (data.senderId === receiverId) setTyping(true);
//     };

//     const handleStopTyping = (data) => {
//       if (data.senderId === receiverId) setTyping(false);
//     };

//     socket.on("receive_message", handleReceiveMessage);
//     socket.on("user-online", handleOnline);
//     socket.on("user-offline", handleOffline);
//     socket.on("typing", handleTyping);
//     socket.on("stop-typing", handleStopTyping);

//     return () => {
//       socket.off("receive_message", handleReceiveMessage);
//       socket.off("user-online", handleOnline);
//       socket.off("user-offline", handleOffline);
//       socket.off("typing", handleTyping);
//       socket.off("stop-typing", handleStopTyping);
//     };
//   }, [receiverId]);

//   // 🟦 Send Message
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const msgData = {
//       senderId,
//       receiverId,
//       message: input,
//     };

//     socket.emit("send_message", msgData);

//     setInput("");
//     socket.emit("stop-typing", { senderId, receiverId });
//   };

//   // 🟪 Typing Handler
//   const handleTyping = (e) => {
//     setInput(e.target.value);

//     socket.emit("typing", { senderId, receiverId });

//     clearTimeout(window.typingTimeout);
//     window.typingTimeout = setTimeout(() => {
//       socket.emit("stop-typing", { senderId, receiverId });
//     }, 700);
//   };

//   if (!senderId) return <div>Loading...</div>;

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div className="flex items-center gap-3 p-3 bg-blue-600 text-white shadow">

//         {/* FIXED IMAGE DISPLAY */}
//         <img
//           src={
//             receiverUser?.image && receiverUser.image.trim() !== ""
//               ? receiverUser.image
//               : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//           }
//           className="w-12 h-12 rounded-full object-cover"
//           onError={(e) => {
//             e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
//           }}
//         />

//         <div>
//           <h2 className="text-lg font-semibold">{receiverUser?.name}</h2>
//           <p className="text-sm">
//             {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
//           </p>
//         </div>

//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-3 my-2 rounded-xl max-w-[75%] break-words ${
//               msg.senderId === senderId
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-white border shadow"
//             }`}
//           >
//             {msg.message}
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex p-3 gap-2 bg-white shadow">
//         <input
//           className="border p-2 flex-1 rounded"
//           value={input}
//           onChange={handleTyping}
//           placeholder="Type a message..."
//         />
//         <button
//           className="bg-blue-600 text-white px-4 rounded"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Instance from "../AxiosConfig";

// SOCKET
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

export default function ChatPage() {
  const { id: receiverId } = useParams();
  const navigate = useNavigate();

  const [senderId, setSenderId] = useState(null);
  const [receiverUser, setReceiverUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [typing, setTyping] = useState(false);
  const [chatList, setChatList] = useState([]); // LEFT SIDEBAR CHAT LIST

  // 1. Logged-in user
  useEffect(() => {
    Instance.get("/user/me")
      .then((res) => {
        setSenderId(res.data.user._id);

        socket.emit("authenticate", {
          token: res.data.token || localStorage.getItem("token"),
        });
      })
      .catch(() => console.log("User not logged in"));
  }, []);

  // 2. LOAD CHAT LIST (LEFT SIDEBAR)
  useEffect(() => {
    if (!senderId) return;

    Instance.get(`/send/recent/${senderId}`)
      .then((res) => setChatList(res.data.chats))
      .catch((err) => console.log("Error loading recent chat list", err));
  }, [senderId]);

  // 3. Receiver user info
  useEffect(() => {
    if (!receiverId) return;

    Instance.get(`/user/${receiverId}`)
      .then((res) => setReceiverUser(res.data.user))
      .catch((err) => console.log(err));
  }, [receiverId]);

  // 4. Join room + check online
  useEffect(() => {
    if (senderId && receiverId) {
      setTimeout(() => {
        socket.emit("join-room", { senderId, receiverId });
        socket.emit("check-online", { receiverId });
      }, 200);
    }
  }, [senderId, receiverId]);

  // 5. Load chat history
  useEffect(() => {
    if (!senderId || !receiverId) return;

    Instance.get(`/send/get/message/${senderId}/${receiverId}`)
      .then((res) => setMessages(res.data.messages))
      .catch(() => console.log("Error loading messages"));
  }, [senderId, receiverId]);

  // 6. SOCKET LISTENERS
  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      refreshChatList();
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("user-online", (id) => id === receiverId && setIsOnline(true));
    socket.on("user-offline", (id) => id === receiverId && setIsOnline(false));
    socket.on("typing", (data) => data.senderId === receiverId && setTyping(true));
    socket.on("stop-typing", (data) => data.senderId === receiverId && setTyping(false));

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user-online");
      socket.off("user-offline");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [receiverId]);

  // 7. REFRESH CHATLIST
  const refreshChatList = () => {
    if (!senderId) return;

    Instance.get(`/send/recent/${senderId}`)
      .then((res) => setChatList(res.data.chats))
      .catch((err) => console.log("Error refreshing chat list", err));
  };

  // 8. Send Message
  const sendMessage = () => {
    if (!input.trim()) return;

    const msgData = { senderId, receiverId, message: input };

    socket.emit("send_message", msgData);
    setInput("");

    socket.emit("stop-typing", { senderId, receiverId });
  };

  // 9. Typing
  const handleTyping = (e) => {
    setInput(e.target.value);

    socket.emit("typing", { senderId, receiverId });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stop-typing", { senderId, receiverId });
    }, 700);
  };

  if (!senderId) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">

      {/* LEFT SIDEBAR */}
      <div className="w-[300px] bg-white border-r overflow-y-auto">
        <h2 className="p-4 text-lg font-semibold border-b">Chats</h2>

        {chatList.map((c) => (
          <div
            key={c._id}
            onClick={() => navigate(`/chat/${c._id}`)}
            className="flex items-center gap-3 p-3 border-b hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={
                c.user?.image && c.user.image.trim() !== ""
                  ? c.user.image
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold">{c.user?.name}</h3>
              <p className="text-sm text-gray-600 truncate w-[180px]">
                {c.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE MAIN CHAT */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow">
          <img
            src={
              receiverUser?.image && receiverUser.image.trim() !== ""
                ? receiverUser.image
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h2 className="text-lg font-semibold">{receiverUser?.name}</h2>
            <p className="text-sm">
              {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 my-2 rounded-xl max-w-[75%] break-words ${
                msg.senderId === senderId
                  ? "bg-gradient-to-r from-pink-500 to-blue-400 text-white ml-auto"
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

    </div>
  );
}
