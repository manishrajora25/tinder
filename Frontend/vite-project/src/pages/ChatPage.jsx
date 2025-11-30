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





// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import Instance from "../AxiosConfig";

// // SOCKET
// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   withCredentials: true,
//   transports: ["websocket"],
// });

// export default function ChatPage() {
//   const { id: receiverId } = useParams();
//   const navigate = useNavigate();

//   const [senderId, setSenderId] = useState(null);
//   const [receiverUser, setReceiverUser] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOnline, setIsOnline] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [chatList, setChatList] = useState([]); // LEFT SIDEBAR CHAT LIST

//   // 1. Logged-in user
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

//   // 2. LOAD CHAT LIST (LEFT SIDEBAR)
//   useEffect(() => {
//     if (!senderId) return;

//     Instance.get(`/send/recent/${senderId}`)
//       .then((res) => setChatList(res.data.chats))
//       .catch((err) => console.log("Error loading recent chat list", err));
//   }, [senderId]);

//   // 3. Receiver user info
//   useEffect(() => {
//     if (!receiverId) return;

//     Instance.get(`/user/${receiverId}`)
//       .then((res) => setReceiverUser(res.data.user))
//       .catch((err) => console.log(err));
//   }, [receiverId]);

//   // 4. Join room + check online
//   useEffect(() => {
//     if (senderId && receiverId) {
//       setTimeout(() => {
//         socket.emit("join-room", { senderId, receiverId });
//         socket.emit("check-online", { receiverId });
//       }, 200);
//     }
//   }, [senderId, receiverId]);

//   // 5. Load chat history
//   useEffect(() => {
//     if (!senderId || !receiverId) return;

//     Instance.get(`/send/get/message/${senderId}/${receiverId}`)
//       .then((res) => setMessages(res.data.messages))
//       .catch(() => console.log("Error loading messages"));
//   }, [senderId, receiverId]);

//   // 6. SOCKET LISTENERS
//   useEffect(() => {
//     const handleReceiveMessage = (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       refreshChatList();
//     };

//     socket.on("receive_message", handleReceiveMessage);
//     socket.on("user-online", (id) => id === receiverId && setIsOnline(true));
//     socket.on("user-offline", (id) => id === receiverId && setIsOnline(false));
//     socket.on("typing", (data) => data.senderId === receiverId && setTyping(true));
//     socket.on("stop-typing", (data) => data.senderId === receiverId && setTyping(false));

//     return () => {
//       socket.off("receive_message", handleReceiveMessage);
//       socket.off("user-online");
//       socket.off("user-offline");
//       socket.off("typing");
//       socket.off("stop-typing");
//     };
//   }, [receiverId]);

//   // 7. REFRESH CHATLIST
//   const refreshChatList = () => {
//     if (!senderId) return;

//     Instance.get(`/send/recent/${senderId}`)
//       .then((res) => setChatList(res.data.chats))
//       .catch((err) => console.log("Error refreshing chat list", err));
//   };

//   // 8. Send Message
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const msgData = { senderId, receiverId, message: input };

//     socket.emit("send_message", msgData);
//     setInput("");

//     socket.emit("stop-typing", { senderId, receiverId });
//   };

//   // 9. Typing
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
//     <div className="flex h-screen">

//       {/* LEFT SIDEBAR */}
//       <div className="w-[300px] bg-white border-r overflow-y-auto">
//         <h2 className="p-4 text-lg font-semibold border-b">Chats</h2>

//         {chatList.map((c) => (
//           <div
//             key={c._id}
//             onClick={() => navigate(`/chat/${c._id}`)}
//             className="flex items-center gap-3 p-3 border-b hover:bg-gray-100 cursor-pointer"
//           >
//             <img
//               src={
//                 c.user?.image && c.user.image.trim() !== ""
//                   ? c.user.image
//                   : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               }
//               className="w-12 h-12 rounded-full object-cover"
//             />

//             <div>
//               <h3 className="font-semibold">{c.user?.name}</h3>
//               <p className="text-sm text-gray-600 truncate w-[180px]">
//                 {c.lastMessage}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT SIDE MAIN CHAT */}
//       <div className="flex flex-col flex-1">

//         {/* Header */}
//         <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow">
//           <img
//             src={
//               receiverUser?.image && receiverUser.image.trim() !== ""
//                 ? receiverUser.image
//                 : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//             }
//             className="w-12 h-12 rounded-full object-cover"
//           />

//           <div>
//             <h2 className="text-lg font-semibold">{receiverUser?.name}</h2>
//             <p className="text-sm">
//               {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
//             </p>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`p-3 my-2 rounded-xl max-w-[25%] break-words ${
//                 msg.senderId === senderId
//                   ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white ml-auto"
//                   : "bg-white border shadow"
//               }`}
//             >
//               {msg.message}
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="flex p-3 gap-2 bg-white shadow">
//           <input
//             className="border p-2 flex-1 rounded"
//             value={input}
//             onChange={handleTyping}
//             placeholder="Type a message..."
//           />
//           <button
//             className="bg-blue-600 text-white px-4 rounded"
//             onClick={sendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }



// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import Instance from "../AxiosConfig";
// import LeftPage from "./Left.jsx";


// // SOCKET CONNECTION
// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   withCredentials: true,
//   transports: ["websocket"],
// });

// export default function ChatPage() {
//   const { id: receiverId } = useParams();
//   const navigate = useNavigate();

//   const [senderId, setSenderId] = useState(null);
//   const [receiverUser, setReceiverUser] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOnline, setIsOnline] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [chatList, setChatList] = useState([]);

//   const [posts, setPosts] = useState([]);

//   const [onlineUsers, setOnlineUsers] = useState({});

//   // TYPING TIMEOUT REF
//   const typingTimeoutRef = useRef(null);

//   /* 1. Logged-in user */
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

//   /* 2. Load chat list */
//   useEffect(() => {
//     if (!senderId) return;

//     Instance.get(`/send/recent/${senderId}`)
//       .then((res) => setChatList(res.data.chats))
//       .catch((err) => console.log(err));
//   }, [senderId]);

//   /* 3. Load receiver info */
//   useEffect(() => {
//     if (!receiverId) return;

//     Instance.get(`/user/${receiverId}`)
//       .then((res) => setReceiverUser(res.data.user))
//       .catch((err) => console.log(err));
//   }, [receiverId]);

//   /* 4. Join chat room */
//   useEffect(() => {
//     if (!senderId || !receiverId) return;

//     socket.emit("join-room", { senderId, receiverId });
//     socket.emit("check-online", { receiverId });
//   }, [senderId, receiverId]);

//   /* 5. Load chat history */
//   useEffect(() => {
//     if (!senderId || !receiverId) return;

//     Instance.get(`/send/get/message/${senderId}/${receiverId}`)
//       .then((res) => setMessages(res.data.messages))
//       .catch(() => console.log("Error fetching messages"));
//   }, [senderId, receiverId]);

//   /* 6. SOCKET LISTENERS */
//   useEffect(() => {
//     // NEW MESSAGE RECEIVED
//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       refreshChatList();
//     });

//     // USER ONLINE/OFFLINE
//     socket.on("online-users", (users) => {
//       setOnlineUsers(users);
//     });

//     // UPDATE ONLINE STATUS
//     socket.on("user-online", (id) => id === receiverId && setIsOnline(true));
//     socket.on("user-offline", (id) => id === receiverId && setIsOnline(false));

//     // TYPING
//     socket.on("typing", (data) => {
//       if (data.senderId === receiverId) setTyping(true);
//     });

//     socket.on("stop-typing", (data) => {
//       if (data.senderId === receiverId) setTyping(false);
//     });

//     return () => {
//       socket.on("receive_message");
//       socket.on("online-users");
//       socket.on("user-online");
//       socket.on("user-offline");
//       socket.on("typing");
//       socket.on("stop-typing");
//     };
//   }, [receiverId]);

//   /* REFRESH CHAT LIST */
//   const refreshChatList = () => {
//     if (!senderId) return;

//     Instance.get(`/send/recent/${senderId}`)
//       .then((res) => setChatList(res.data.chats))
//       .catch((err) => console.log(err));
//   };

//   /* SEND MESSAGE */
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const msg = { senderId, receiverId, message: input };

//     socket.emit("send_message", msg);
//     setInput("");

//     socket.emit("stop-typing", { senderId, receiverId });
//   };

//   /* HANDLE TYPING */
//   const handleTyping = (e) => {
//     setInput(e.target.value);

//     socket.emit("typing", { senderId, receiverId });

//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//     typingTimeoutRef.current = setTimeout(() => {
//       socket.emit("stop-typing", { senderId, receiverId });
//     }, 700);
//   };



//   const fetchAllPosts = async () => {
//     try {
//       const res = await instance.get("/post/feed", { withCredentials: true });
//       if (res.data?.success) setPosts(res.data.posts);
//       else setPosts([]);
//     } catch (err) {
//       console.error("❌ Error fetching posts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchAllPosts();
//   }, []);



//   if (!senderId) return <div>Loading...</div>;

//   return (
// <div className="flex">
//   <LeftPage />

//   {/* MAIN WRAPPER */}
//   <div className="flex h-screen w-full md:ml-[26%]">

//     {/* LEFT SIDEBAR */}
//     <div className="
//         hidden md:block 
//         w-[260px] lg:w-[300px] 
//         bg-white border-r 
//         overflow-y-auto
//       "
//     >
//       <h2 className="p-4 text-lg font-semibold border-b">Chats</h2>

//       {chatList.map((chat) => (
//         <div
//           key={chat.userId}
//           onClick={() => navigate(`/ChatPage/${chat.userId}`)}
//           className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100"
//         >
//           <img
//             src={chat.image}
//             className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
//           />

//           <div className="flex-1">
//             <h4 className="font-semibold flex items-center gap-2">
//               {chat.name}
//               {onlineUsers[chat.userId] && (
//                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//               )}
//             </h4>
//             <p className="text-sm text-gray-500 truncate">
//               {chat.lastMessage}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* RIGHT CHAT AREA */}
//     <div className="flex flex-col flex-1">

//       {/* Header */}
//       <div className="
//           flex items-center gap-3 p-3 
//           bg-gradient-to-r from-pink-500 to-orange-400 
//           text-white
//         "
//       >
//         <img
//           src={
//             receiverUser.image ||
//             "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//           }
//           className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
//         />
//         <div>
//           <h2 className="text-base lg:text-lg font-semibold">{receiverUser.name}</h2>
//           <p className="text-sm">
//             {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
//           </p>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-3 my-2 rounded-xl max-w-[75%] md:max-w-[40%] ${
//               msg.senderId === senderId
//                 ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white ml-auto"
//                 : "bg-white border shadow"
//             }`}
//           >
//             {msg.message}
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex p-2 sm:p-3 gap-2 bg-white shadow">
//         <input
//           className="border p-2 flex-1 rounded text-sm sm:text-base"
//           value={input}
//           onChange={handleTyping}
//           placeholder="Type a message..."
//         />
//         <button
//           className="bg-blue-600 text-white px-3 sm:px-4 rounded text-sm sm:text-base"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>

//     </div>
//   </div>
// </div>

//   );
// }









// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import Instance from "../AxiosConfig";
// import LeftPage from "./Left.jsx";

// // SOCKET CONNECTION
// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   withCredentials: true,
//   transports: ["websocket"],
// });

// export default function ChatPage() {
//   const { id: receiverId } = useParams();
//   const navigate = useNavigate();

//   const [senderId, setSenderId] = useState(null);
//   const [receiverUser, setReceiverUser] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOnline, setIsOnline] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [chatList, setChatList] = useState([]);

//   const [posts, setPosts] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState({});

//   const typingTimeoutRef = useRef(null);

//   /* 1. Logged-in user */
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

//   /* 2. Load chat list */
//   useEffect(() => {
//     if (!senderId) return;

//     Instance.get(`/send/recent/${senderId}`)
//       .then((res) => setChatList(res.data.chats))
//       .catch((err) => console.log(err));
//   }, [senderId]);

//   /* 3. Load receiver info */
//   useEffect(() => {
//     if (!receiverId) return;

//     Instance.get(`/user/${receiverId}`)
//       .then((res) => setReceiverUser(res.data.user))
//       .catch((err) => console.log(err));
//   }, [receiverId]);

//   /* 4. Join chat room */
//   useEffect(() => {
//     if (!senderId || !receiverId) return;

//     socket.emit("join-room", { senderId, receiverId });
//     socket.emit("check-online", { receiverId });
//   }, [senderId, receiverId]);

//   /* 5. Load chat history */
//   useEffect(() => {
//     if (!senderId || !receiverId) return;

//     Instance.get(`/send/get/message/${senderId}/${receiverId}`)
//       .then((res) => setMessages(res.data.messages))
//       .catch(() => console.log("Error fetching messages"));
//   }, [senderId, receiverId]);

//   /* 6. SOCKET LISTENERS */
//   useEffect(() => {
//     socket.on("receive_message", (msg) => {
//       // Check message belongs to the currently opened chat
//       const isCurrentChat =
//         (msg.senderId === receiverId && msg.receiverId === senderId) ||
//         (msg.senderId === senderId && msg.receiverId === receiverId);
    
//       if (!isCurrentChat) {
//         // Update chat list only
//         refreshChatList();
//         return; // ❌ Do NOT add message in wrong chat window
//       }
    
//       // Add message only for the correct chat
//       setMessages((prev) => [...prev, msg]);
//       refreshChatList();
//     });
    

//     socket.on("online-users", (users) => setOnlineUsers(users));

//     socket.on("user-online", (id) => id === receiverId && setIsOnline(true));
//     socket.on("user-offline", (id) => id === receiverId && setIsOnline(false));

//     socket.on("typing", (data) => {
//       if (data.senderId === receiverId) setTyping(true);
//     });

//     socket.on("stop-typing", (data) => {
//       if (data.senderId === receiverId) setTyping(false);
//     });

//     return () => {
//       socket.off("receive_message");
//       socket.off("online-users");
//       socket.off("user-online");
//       socket.off("user-offline");
//       socket.off("typing");
//       socket.off("stop-typing");
//     };
//   }, [receiverId]);

//   /* REFRESH CHAT LIST */
//   const refreshChatList = () => {
//     if (!senderId) return;

//     Instance.get(`/send/recent/${senderId}`)
//       .then((res) => setChatList(res.data.chats))
//       .catch((err) => console.log(err));
//   };

//   /* SEND MESSAGE */
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const msg = { senderId, receiverId, message: input };

//     socket.emit("send_message", msg);
//     setInput("");

//     socket.emit("stop-typing", { senderId, receiverId });
//   };

//   /* HANDLE TYPING */
//   const handleTyping = (e) => {
//     setInput(e.target.value);

//     socket.emit("typing", { senderId, receiverId });

//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//     typingTimeoutRef.current = setTimeout(() => {
//       socket.emit("stop-typing", { senderId, receiverId });
//     }, 700);
//   };

//   // ⬇⬇⬇ NEW FUNCTION YOU ADDED (WITHOUT CHANGING ANY CODE) ⬇⬇⬇
//   const fetchAllPosts = async () => {
//     try {
//       const res = await Instance.get("/post/feed", { withCredentials: true });
//       if (res.data?.success) setPosts(res.data.posts);
      
//       else setPosts([]);
//       console.log("data",res);
//     } catch (err) {
//       console.error("❌ Error fetching posts:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAllPosts();
//   }, []);

//   // 👉 Function to find first post image of a user  
//   const getUserFirstPostImage = (userId) => {
//     const userPosts = posts.filter((p) => p.userId?._id === userId);
  
//     if (userPosts.length === 0) return null;
  
//     const firstPost = userPosts[0];
  
//     if (firstPost.images?.length > 0) {
//       return firstPost.images[0];
//     }
  
//     return null;
//   };
  

//   if (!senderId) return <div>Loading...</div>;

//   return (
//     <div className="flex">
//       <LeftPage />

//       <div className="flex h-screen w-full md:ml-[26%]">
//         {/* LEFT SIDEBAR */}
//         <div className="hidden md:block w-[260px] lg:w-[300px] bg-white border-r overflow-y-auto">
//           <h2 className="p-4 text-lg font-semibold border-b">All Chats</h2>

//           {chatList.map((chat) => {
//             const postImage = getUserFirstPostImage(chat.userId);

//             return (
//               <div
//                 key={chat.userId}
//                 onClick={() => navigate(`/ChatPage/${chat.userId}`)}
//                 className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100"
//               >
//                 <img
//                   src={
//                     postImage ||
//                     chat.image ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
//                 />

//                 <div className="flex-1">
//                   <h4 className="font-semibold flex items-center gap-2">
//                     {chat.name}
//                     {onlineUsers[chat.userId] && (
//                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                     )}
//                   </h4>
//                   <div className="flex items-center justify-between">
//   <p className="text-sm text-gray-500 truncate flex-1">
//     {chat.lastMessage}
//   </p>

//   {chat.unreadCount > 0 && (
//     <span className="w-2 h-2 bg-blue-600 rounded-full ml-2"></span>
//   )}
// </div>

//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* RIGHT CHAT AREA */}
//         <div className="flex flex-col flex-1">
//           <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white">
//             <img
//               src={
//                 receiverUser.image ||
//                 getUserFirstPostImage(receiverUser._id) ||
//                 "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               }
//               className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
//             />
//             <div>
//               <h2 className="text-base lg:text-lg font-semibold">
//                 {receiverUser.name}
//               </h2>
//               <p className="text-sm">
//                 {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
//               </p>
//             </div>


// {/* CALL BUTTONS */}
// <div className="ml-auto flex gap-3">
//   <button
//     onClick={() => startCall("audio")}
//     className="bg-green-600 px-3 py-1 rounded text-white text-sm cursor-pointer"
//   >
//     📞 Call
//   </button>

//   <button
//     onClick={() => startCall("video")}
//     className="bg-purple-600 px-3 py-1 rounded text-white text-sm cursor-pointer"
//   >
//     📹 Video
//   </button>
// </div>




//           </div>

//           <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`p-3 my-2 rounded-xl max-w-[75%] md:max-w-[40%] ${
//                   msg.senderId === senderId
//                     ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white ml-auto"
//                     : "bg-white border shadow"
//                 }`}
//               >
//                 {msg.message}
//               </div>
//             ))}
//           </div>

//           <div className="flex p-2 sm:p-3 gap-2 bg-white shadow">
//             <input
//               className="border p-2 flex-1 rounded text-sm sm:text-base"
//               value={input}
//               onChange={handleTyping}
//               placeholder="Type a message..."
//             />
//             <button
//               className="bg-blue-600 text-white px-3 sm:px-4 rounded text-sm sm:text-base"
//               onClick={sendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Instance from "../AxiosConfig";
import LeftPage from "./Left.jsx";

// SOCKET CONNECTION
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
  const [chatList, setChatList] = useState([]);

  const [posts, setPosts] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});

  const typingTimeoutRef = useRef(null);

  // ================== CALL STATES ==================
  const [callType, setCallType] = useState(null); // "audio" | "video"
  const [incomingCall, setIncomingCall] = useState(null); // data from caller
  const [callActive, setCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const timerRef = useRef(null);


  const [callingText, setCallingText] = useState("");
  const [senderUser, setSenderUser] = useState(null);



const ringAudioRef = useRef(
  typeof Audio !== "undefined" ? new Audio("/ring.mp3") : null
);
 // public/ring.mp3


  const [cameraOn, setCameraOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [facingMode, setFacingMode] = useState("user"); // user | environment
  



  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await Instance.get("/user/me", { withCredentials: true });
  
        const id = res.data.user._id;
        const token = res.data.token || localStorage.getItem("token");
  
        console.log("🔥 USER ME SUCCESS:", id);
  
        setSenderId(id);
        setSenderUser(res.data.user);  
  
        socket.emit("authenticate", {
          token,
          userId: id,
        });
  
        console.log("✅ AUTH SENT FROM FRONTEND:", id);
      } catch (err) {
        console.log("❌ USER ME FAILED:", err?.response?.data || err);
      }
    };
  
    initAuth();
  }, []);
  
  



  useEffect(() => {
    socket.on("connect", () => {
      const token = localStorage.getItem("token");
  
      if (token && senderId) {
        socket.emit("authenticate", {
          token,
          userId: senderId,
        });
  
        console.log("🔁 REAUTH AFTER RECONNECT:", senderId);
      }
    });
  
    return () => {
      socket.off("connect");
    };
  }, [senderId]);
  



  // ================== TIMER EFFECT ==================
  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallSeconds(0);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [callActive]);

  // ================== USER LOGIN ==================
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await Instance.get("/user/me");
        const id = res.data.user._id;
  
        setSenderId(id);
  
        // ⚠️ VERY IMPORTANT: userId + token both send karo
        socket.emit("authenticate", {
          token: res.data.token || localStorage.getItem("token"),
          userId: id,
        });
  
        console.log("✅ AUTH SENT FROM FRONTEND:", id);
      } catch (err) {
        console.log("User not logged in");
      }
    };
  
    initAuth();
  }, []);
  

  // ================== CHAT LIST ==================
  useEffect(() => {
    if (!senderId) return;

    Instance.get(`/send/recent/${senderId}`)
      .then((res) => setChatList(res.data.chats))
      .catch((err) => console.log(err));
  }, [senderId]);

  // ================== RECEIVER INFO ==================
  useEffect(() => {
    if (!receiverId) return;

    Instance.get(`/user/${receiverId}`)
      .then((res) => setReceiverUser(res.data.user))
      .catch((err) => console.log(err));
  }, [receiverId]);

  // ================== JOIN ROOM ==================
  useEffect(() => {
    if (!senderId || !receiverId) return;

    socket.emit("join-room", { senderId, receiverId });
    socket.emit("check-online", { receiverId });
  }, [senderId, receiverId]);

  // ================== CHAT HISTORY ==================
  useEffect(() => {
    if (!senderId || !receiverId) return;

    Instance.get(`/send/get/message/${senderId}/${receiverId}`)
      .then((res) => setMessages(res.data.messages))
      .catch(() => console.log("Error fetching messages"));
  }, [senderId, receiverId]);

  // ================== SOCKET LISTENERS (CHAT) ==================
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      const isCurrentChat =
        (msg.senderId === receiverId && msg.receiverId === senderId) ||
        (msg.senderId === senderId && msg.receiverId === receiverId);

      if (!isCurrentChat) {
        refreshChatList();
        return;
      }

      setMessages((prev) => [...prev, msg]);
      refreshChatList();
    });

    socket.on("online-users", (users) => setOnlineUsers(users));

    socket.on("user-online", (id) => id === receiverId && setIsOnline(true));
    socket.on("user-offline", (id) => id === receiverId && setIsOnline(false));

    socket.on("typing", (data) => {
      if (data.senderId === receiverId) setTyping(true);
    });

    socket.on("stop-typing", (data) => {
      if (data.senderId === receiverId) setTyping(false);
    });

    return () => {
      socket.off("receive_message");
      socket.off("online-users");
      socket.off("user-online");
      socket.off("user-offline");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [receiverId, senderId]);



  
  // ================== SOCKET LISTENERS (CALL) ==================
  useEffect(() => {
    socket.on("incoming-call", (data) => {
      console.log("📞 INCOMING CALL DATA:", data); 
      // ring sound
      if (ringAudioRef.current) {
        ringAudioRef.current.loop = true;
        ringAudioRef.current.currentTime = 0;
        ringAudioRef.current.muted = false;
      
        ringAudioRef.current
          .play()
          .then(() => console.log("🔊 Ring playing"))
          .catch(() => console.log("🔕 Autoplay blocked by browser"));
      }
      
      setIncomingCall(data);
      setCallType(data.type);
      setCallActive(false); // active tabhi jab attend kare
    });

    socket.on("call-accepted", async (data) => {
      if (!peerRef.current) return;
      await peerRef.current.setRemoteDescription(data.answer);
      setCallActive(true);
      if (ringAudioRef.current) {
        ringAudioRef.current.pause();
        ringAudioRef.current.currentTime = 0;
      }
    });

    socket.on("webrtc-ice", (data) => {
      if (!peerRef.current) return;
      peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

 // ✅ USER OFFLINE
 socket.on("call-failed", (data) => {
  if (data.reason === "offline") {
    alert("❌ User is offline");
    setCallType(null);
    setCallActive(false);
  }
});


    socket.on("call-ended", () => {
      cleanupStreamsAndPeer();
      setCallType(null);
      setIncomingCall(null);
      setCallActive(false);
      alert("📴 Call Ended");
    });
  
    return () => {
      socket.off("incoming-call");
      socket.off("call-accepted");
      socket.off("webrtc-ice");
      socket.off("call-failed");   
      socket.off("call-ended"); // ✅ cleanup zaroori
    };
  }, []);

  /* REFRESH CHAT LIST */
  const refreshChatList = () => {
    if (!senderId) return;

    Instance.get(`/send/recent/${senderId}`)
      .then((res) => setChatList(res.data.chats))
      .catch((err) => console.log(err));
  };

  /* SEND MESSAGE */
  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = { senderId, receiverId, message: input };

    socket.emit("send_message", msg);
    setInput("");

    socket.emit("stop-typing", { senderId, receiverId });
  };

  /* HANDLE TYPING */
  const handleTyping = (e) => {
    setInput(e.target.value);

    socket.emit("typing", { senderId, receiverId });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { senderId, receiverId });
    }, 700);
  };

  // FETCH ALL POSTS (no change)
  const fetchAllPosts = async () => {
    try {
      const res = await Instance.get("/post/feed", { withCredentials: true });
      if (res.data?.success) setPosts(res.data.posts);
      else setPosts([]);
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // 👉 Function to find first post image of a user
  const getUserFirstPostImage = (userId) => {
    const userPosts = posts.filter((p) => p.userId?._id === userId);

    if (userPosts.length === 0) return null;

    const firstPost = userPosts[0];

    if (firstPost.images?.length > 0) {
      return firstPost.images[0];
    }

    return null;
  };

  // ================== CALL HELPERS ==================

  // Call history save (assumes /call/save backend – optional)
  const saveCallHistory = async (status, durationOverride) => {
    try {
      if (!senderId || !receiverId) return;

      await Instance.post("/call/save", {
        caller: senderId,
        receiver: receiverId,
        type: callType || "audio",
        duration:
          typeof durationOverride === "number" ? durationOverride : callSeconds,
        status, // "completed" | "missed"
      });
    } catch (err) {
      console.log("Call history save error:", err?.response?.data || err);
    }
  };

  const cleanupStreamsAndPeer = () => {
    if (peerRef.current) {
      peerRef.current.ontrack = null;
      peerRef.current.onicecandidate = null;
      peerRef.current.close();
      peerRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (ringAudioRef.current) {
      ringAudioRef.current.pause();
      ringAudioRef.current.currentTime = 0;
    }
  };

 // START CALL ✅ FIXED
const startCall = async (type) => {


  if (!senderId || !receiverId) return;


  // ❌ Receiver offline hai to call mat lagao



  // ✅ STOP OLD STREAM IF EXISTS (VERY IMPORTANT)
  if (localStreamRef.current) {
    localStreamRef.current.getTracks().forEach(track => track.stop());
    localStreamRef.current = null;
  }

  if (peerRef.current) {
    peerRef.current.close();
    peerRef.current = null;
  }

  setCallType(type);
  setIncomingCall(null);

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: type === "video",
  });

  localStreamRef.current = stream;
  if (localVideoRef.current) {
    localVideoRef.current.srcObject = stream;
  }

  peerRef.current = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  stream.getTracks().forEach((track) =>
    peerRef.current.addTrack(track, stream)
  );

  peerRef.current.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit("webrtc-ice", {
        to: receiverId,
        candidate: e.candidate,
      });
    }
  };

  peerRef.current.ontrack = (e) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = e.streams[0];
    }
  };

  const offer = await peerRef.current.createOffer();
  await peerRef.current.setLocalDescription(offer);

 



  // socket.emit("call-user", {
  //   to: receiverId,
  //   from: senderId,
  //   type,
  //   offer,
  
  //   callerName: senderUser?.name || "Unknown",
  //   callerImage: senderUser?.image || ""
  // });
  
  
  socket.emit("call-user", {
    to: receiverId,
    from: senderId,
    type,
    offer,
  
    callerName: senderUser?.name || "User",
    callerImage: senderUser?.image 
      ? senderUser.image.startsWith("http")
        ? senderUser.image
        : import.meta.env.VITE_BACKEND_URL + senderUser.image
      : ""
  });
  
  
  setCallActive(true);
  setCallingText("Calling by " + receiverUser?.name);
};






// ACCEPT CALL ✅ FIXED
// ✅ ACCEPT CALL — FINAL 100% SAFE VERSION
const acceptCall = async () => {
  if (!incomingCall) return;

  try {
    // STOP old stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }

    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // STOP ring
    if (ringAudioRef.current) {
      ringAudioRef.current.pause();
      ringAudioRef.current.currentTime = 0;
    }

    // TRY video/mic
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: callType === "video",
      });
    } catch (err) {
      console.warn("❌ Video device busy! Retrying with AUDIO only...");
      // FALLBACK to audio only
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      // notify UI
      setCameraOn(false);
    }

    localStreamRef.current = stream;
    if (localVideoRef.current && callType === "video") {
      localVideoRef.current.srcObject = stream;
    }

    // CREATE peer
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach(track => {
      peerRef.current.addTrack(track, stream);
    });

    peerRef.current.ontrack = e => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    peerRef.current.onicecandidate = e => {
      if (e.candidate) {
        socket.emit("webrtc-ice", {
          to: incomingCall.from,
          candidate: e.candidate,
        });
      }
    };

    await peerRef.current.setRemoteDescription(incomingCall.offer);

    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);

    socket.emit("accept-call", {
      to: incomingCall.from,
      answer,
    });

    setCallActive(true);
    setIncomingCall(null);

  } catch (err) {
    console.error("❌ FINAL ACCEPT CALL ERROR:", err);

    alert(
      "Camera/Mic is blocked by your device. Please:\n\n" +
      "1. Close WhatsApp, Instagram, Snapchat\n" +
      "2. Close previous Chrome tabs\n" +
      "3. Restart your browser\n\nThen try again."
    );
  }
};



const rejectIncomingCall = async () => {
  if (ringAudioRef.current) {
    ringAudioRef.current.pause();
    ringAudioRef.current.currentTime = 0;
  }

  await saveCallHistory("missed", 0);

  // ✅ CALLER KO BATAO KI CALL REJECT HO GAYI
  if (incomingCall?.from) {
    socket.emit("end-call", { to: incomingCall.from });
  }

  cleanupStreamsAndPeer();
  setIncomingCall(null);
  setCallType(null);
  setCallActive(false);
};



  // cleanupStreamsAndPeer();
  // setCallType(null);
  // setIncomingCall(null);
  // setCallActive(false);
  // alert("📴 Call Ended");

  // END CALL
  // const endCall = async () => {
  //   await saveCallHistory("completed");
  //   cleanupStreamsAndPeer();
  //   setCallType(null);
  //   setIncomingCall(null);
  //   setCallActive(false);
  //   setIsMuted(false);
  // };

  const endCall = async () => {
    await saveCallHistory("completed");
  
    socket.emit("end-call", {
      to: incomingCall?.from || receiverId,
    });
  
    cleanupStreamsAndPeer();
    setCallType(null);
    setIncomingCall(null);
    setCallActive(false);
    setIsMuted(false);
  };
  

  // MUTE / UNMUTE
  const toggleMute = () => {
    if (!localStreamRef.current) return;

    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };





  // 📷 CAMERA ON / OFF
const toggleCamera = () => {
  if (!localStreamRef.current) return;

  const videoTrack = localStreamRef.current.getVideoTracks()[0];
  if (!videoTrack) return;

  videoTrack.enabled = !videoTrack.enabled;
  setCameraOn(videoTrack.enabled);
};

// 🔈 SPEAKER ON / OFF
const toggleSpeaker = () => {
  if (!remoteVideoRef.current) return;

  remoteVideoRef.current.muted = speakerOn;
  setSpeakerOn(!speakerOn);
};

// 🔄 CAMERA FLIP (Front / Back)
const flipCamera = async () => {
  if (!localStreamRef.current || !peerRef.current) return;

  const oldStream = localStreamRef.current;
  oldStream.getTracks().forEach((t) => t.stop());

  const newFacingMode = facingMode === "user" ? "environment" : "user";

  const newStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { facingMode: newFacingMode },
  });

  localStreamRef.current = newStream;
  localVideoRef.current.srcObject = newStream;

  const senders = peerRef.current.getSenders();
  const videoSender = senders.find((s) => s.track?.kind === "video");

  if (videoSender) {
    videoSender.replaceTrack(newStream.getVideoTracks()[0]);
  }

  setFacingMode(newFacingMode);
};

// 🎥 FULLSCREEN TOGGLE
const toggleFullscreen = () => {
  if (!remoteVideoRef.current) return;

  if (!document.fullscreenElement) {
    remoteVideoRef.current.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};





  if (!senderId) return <div>Loading...</div>;

  return (
    <div className="flex">
      <LeftPage />

      <div className="flex h-screen w-full md:ml-[26%]">
        {/* LEFT SIDEBAR */}
        <div className="hidden md:block w-[260px] lg:w-[300px] bg-white border-r overflow-y-auto">
          <h2 className="p-4 text-lg font-semibold border-b">All Chats</h2>

          {chatList.map((chat) => {
            const postImage = getUserFirstPostImage(chat.userId);

            return (
              <div
                key={chat.userId}
                onClick={() => navigate(`/ChatPage/${chat.userId}`)}
                className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={
                    postImage ||
                    chat.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                />

                <div className="flex-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    {chat.name}
                    {onlineUsers[chat.userId] && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate flex-1">
                      {chat.lastMessage}
                    </p>

                    {chat.unreadCount > 0 && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full ml-2"></span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT CHAT AREA */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white">
            <img
              src={
                receiverUser.image ||
                getUserFirstPostImage(receiverUser._id) ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
            />
            <div>
              <h2 className="text-base lg:text-lg font-semibold">
                {receiverUser.name}
              </h2>
              <p className="text-sm">
                {typing ? "Typing..." : isOnline ? "Online" : "Offline"}
              </p>
            </div>

            {/* CALL BUTTONS */}
            <div className="ml-auto flex items-center gap-2">
              {/* {callActive && (
                <span className="text-xs mr-2">
                  ⏱ {Math.floor(callSeconds / 60)}:
                  {String(callSeconds % 60).padStart(2, "0")}
                </span>
              )} */}

              <button
                onClick={() => startCall("audio")}
                className="bg-green-600 px-3 py-1 rounded text-white text-sm cursor-pointer"
              >
                📞 Call
              </button>

              <button
                onClick={() => startCall("video")}
                className="bg-purple-600 px-3 py-1 rounded text-white text-sm cursor-pointer"
              >
                📹 Video
              </button>

              {/* {callActive && (
                <>
                  <button
                    onClick={toggleMute}
                    className="bg-yellow-500 px-3 py-1 rounded text-white text-sm cursor-pointer"
                  >
                    {isMuted ? "🔊 Unmute" : "🔇 Mute"}
                  </button>
                  <button
                    onClick={endCall}
                    className="bg-red-600 px-3 py-1 rounded text-white text-sm cursor-pointer"
                  >
                    ❌ End
                  </button>
                </>
              )} */}
            </div>
          </div>

          <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 my-2 rounded-xl max-w-[75%] md:max-w-[40%] ${
                  msg.senderId === senderId
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white ml-auto"
                    : "bg-white border shadow"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          <div className="flex p-2 sm:p-3 gap-2 bg-white shadow">
            <input
              className="border p-2 flex-1 rounded text-sm sm:text-base"
              value={input}
              onChange={handleTyping}
              placeholder="Type a message..."
            />
            <button
              className="bg-blue-600 text-white px-3 sm:px-4 rounded text-sm sm:text-base"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* ============ INCOMING CALL POPUP ============ */}
      {incomingCall && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded text-center w-[90%] max-w-sm">
          {/* <h3 className="font-bold mb-3">
  {incomingCall?.callerName || "User"} is calling you...
</h3> */}

<div className="">


<img
  src={
    incomingCall?.callerImage && incomingCall.callerImage !== ""
      ? incomingCall.callerImage
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  onError={(e) => {
    e.target.src =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  }}
  className="w-20 h-20 mx-auto rounded-full mb-3 object-cover"
/>




<h3 className="font-bold mb-3">
  Incoming {callType} Call from {incomingCall?.callerName || "User"}
</h3>




 {/* <h3 className="font-bold mb-3">
              Incoming {callType} Call from {receiverUser?.name || "User"}
            </h3>  */}
</div>


            <div className="flex gap-4 justify-center">
              <button
                onClick={acceptCall}
                className="bg-green-600 px-4 py-2 text-white rounded"
              >
                ✅ Attend
              </button>
              <button
                onClick={rejectIncomingCall}
                className="bg-red-600 px-4 py-2 text-white rounded"
              >
                ❌ Unattend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ VIDEO / AUDIO UI ============ */}
      {callType && (
  <div className="fixed bottom-3 right-3 w-80 bg-black rounded-xl overflow-hidden z-50 shadow-2xl">
{callActive && (
  <p className="text-xs text-white ml-3">{callingText}</p>
)}

    {/* REMOTE VIDEO */}
    <video
      ref={remoteVideoRef}
      autoPlay
      className="w-full h-52 object-cover"
    />

    {/* LOCAL PREVIEW */}
    <video
      ref={localVideoRef}
      autoPlay
      muted
      className="absolute bottom-16 right-2 w-24 h-24 object-cover border-2 border-white rounded-lg"
    />

    {/* CONTROL BAR */}
    <div className="flex items-center justify-between px-3 py-2 bg-black/80 text-white">

      {/* TIMER */}
      <span className="text-sm">
        ⏱ {Math.floor(callSeconds / 60)}:
        {String(callSeconds % 60).padStart(2, "0")}
      </span>

      {/* ALL CONTROLS */}
      <div className="flex gap-2 flex-wrap">

        <button onClick={toggleMute} className="bg-yellow-500 px-2 py-1 rounded-full text-xs">
          {isMuted ? "🔊" : "🔇"}
        </button>

        <button onClick={toggleCamera} className="bg-indigo-600 px-2 py-1 rounded-full text-xs">
          {cameraOn ? "📷" : "🚫"}
        </button>

        <button onClick={toggleSpeaker} className="bg-green-600 px-2 py-1 rounded-full text-xs">
          {speakerOn ? "🔈" : "🔇"}
        </button>

        <button onClick={flipCamera} className="bg-blue-600 px-2 py-1 rounded-full text-xs">
          🔄
        </button>

        <button onClick={toggleFullscreen} className="bg-gray-600 px-2 py-1 rounded-full text-xs">
          🎥
        </button>

        <button onClick={endCall} className="bg-red-600 px-2 py-1 rounded-full text-xs">
          ❌
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
