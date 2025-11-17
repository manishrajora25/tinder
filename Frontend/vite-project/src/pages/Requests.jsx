
// import React, { useEffect, useState } from "react";
// import instance from "../AxiosConfig";
// import LeftPage from "./Left.jsx";
// import { useNavigate } from "react-router-dom";

// const Requests = () => {
//   const [user, setUser] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   // ============================
//   // Load Logged User
//   // ============================
//   const loadUser = async () => {
//     try {
//       const res = await instance.get("/user/me");
//       setUser(res.data.user);
//     } catch (err) {
//       console.log("User Load Error:", err);
//     }
//   };

//   // ============================
//   // Fetch Friend Requests
//   // ============================
//   const fetchRequests = async () => {
//     try {
//       const res = await instance.get("/request/received");
//       setRequests(res.data.requests || []);
//     } catch (error) {
//       console.log("Request Fetch Error:", error);
//     }
//     setLoading(false);
//   };

//   // ============================
//   // Accept Request
//   // ============================
//   const handleAccept = async (id) => {
//     try {
//       await instance.put(`/request/accept/${id}`);

//       setRequests((prev) =>
//         prev.map((r) =>
//           r._id === id ? { ...r, status: "accepted" } : r
//         )
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ============================
//   // Reject Request
//   // ============================
//   const handleReject = async (id) => {
//     try {
//       await instance.put(`/request/reject/${id}`);

//       setRequests((prev) =>
//         prev.map((r) =>
//           r._id === id ? { ...r, status: "rejected" } : r
//         )
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ============================
//   // OPEN CHAT
//   // ============================
//   const goToChat = (friendId) => {
//     navigate(`/chat/${friendId}`);
//   };

//   // ============================
//   // ON PAGE LOAD
//   // ============================
//   useEffect(() => {
//     const init = async () => {
//       await loadUser();
//       await fetchRequests();
//     };
//     init();
//   }, []);

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="flex">
//       <LeftPage />

//       <div className="p-4 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Incoming Friend Requests</h2>

//         {requests.length === 0 ? (
//           <p className="text-gray-600">No incoming requests</p>
//         ) : (
//           requests.map((req) => (
//             <div
//               key={req._id}
//               className="flex items-center justify-between bg-white shadow p-3 rounded-md mb-3 border"
//             >
//               {/* USER IMAGE + NAME */}
//               <div className="flex items-center gap-3">
//               <img
//             src={req.sender.image || "/default.png"}
//             alt="user"
//             className="w-16 h-16 rounded-full object-cover border"
//           />
//                 <span className="font-semibold text-lg">
//                   {req.sender?.name || "Unknown User"}
//                 </span>
//               </div>

//               {/* BUTTONS */}
//               <div className="flex gap-2">

//                 {req.status === "pending" && (
//                   <>
//                     <button
//                       onClick={() => handleAccept(req._id)}
//                       className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
//                     >
//                       Accept
//                     </button>

//                     <button
//                       onClick={() => handleReject(req._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {req.status === "accepted" && (
//                   <button
//                     onClick={() => goToChat(req.sender?._id)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
//                   >
//                     Message
//                   </button>
//                 )}

//                 {req.status === "rejected" && (
//                   <span className="text-red-600 font-semibold">Rejected</span>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Requests;
















import React, { useEffect, useState } from "react";
import instance from "../AxiosConfig";
import LeftPage from "./Left.jsx";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]); // NEW
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ============================
  // Load Logged User
  // ============================
  const loadUser = async () => {
    try {
      const res = await instance.get("/user/me");
      setUser(res.data.user);
    } catch (err) {
      console.log("User Load Error:", err);
    }
  };

  // ============================
  // Fetch Friend Requests
  // ============================
  const fetchRequests = async () => {
    try {
      const res = await instance.get("/request/received");
      setRequests(res.data.requests || []);
    } catch (error) {
      console.log("Request Fetch Error:", error);
    }
  };

  // ============================
  // Fetch Sent Requests (for notification)
  // ============================
  const fetchSentRequests = async () => {
    try {
      const res = await instance.get("/request/sent"); // backend me endpoint hona chahiye
      setSentRequests(res.data.requests || []);
    } catch (error) {
      console.log("Sent Request Fetch Error:", error);
    }
  };

  // ============================
  // Accept Request
  // ============================
  const handleAccept = async (id) => {
    try {
      await instance.put(`/request/accept/${id}`);

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "accepted" } : r
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // Reject Request
  // ============================
  const handleReject = async (id) => {
    try {
      await instance.put(`/request/reject/${id}`);

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "rejected" } : r
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // OPEN CHAT
  // ============================
  const goToChat = (friendId) => {
    navigate(`/chat/${friendId}`);
  };

  // ============================
  // ON PAGE LOAD
  // ============================
  useEffect(() => {
    const init = async () => {
      await loadUser();
      await fetchRequests();
      await fetchSentRequests(); // fetch sent requests initially
      setLoading(false);
    };
    init();
  }, []);

  // ============================
  // POLLING FOR SENT REQUEST STATUS CHANGE
  // ============================
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await instance.get("/request/sent");
        const latestSent = res.data.requests || [];

        // Check for status change
        latestSent.forEach((req) => {
          const prevReq = sentRequests.find(r => r._id === req._id);
          if (prevReq && prevReq.status !== req.status) {
            alert(`Your request to ${req.receiver?.name} was ${req.status}`);
          }
        });

        setSentRequests(latestSent);
      } catch (err) {
        console.log(err);
      }
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [sentRequests]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex">
      <LeftPage />

      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Incoming Friend Requests</h2>

        {requests.length === 0 ? (
          <p className="text-gray-600">No incoming requests</p>
        ) : (
          requests.map((req) => (
            <div
              key={req._id}
              className="flex items-center justify-between bg-white shadow p-3 rounded-md mb-3 border"
            >
              <div className="flex items-center gap-3">
                <img
                  src={req.sender.image || "/default.png"}
                  alt="user"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <span className="font-semibold text-lg">
                  {req.sender?.name || "Unknown User"}
                </span>
              </div>

              <div className="flex gap-2">
                {req.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {req.status === "accepted" && (
                  <button
                    onClick={() => goToChat(req.sender?._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    Message
                  </button>
                )}

                {req.status === "rejected" && (
                  <span className="text-red-600 font-semibold">Rejected</span>
                )}
              </div>
            </div>
          ))
        )}

        {/* SENT REQUESTS SECTION OPTIONAL */}
        <h2 className="text-2xl font-bold my-4">Sent Requests</h2>
        {sentRequests.length === 0 ? (
          <p className="text-gray-600">No sent requests</p>
        ) : (
          sentRequests.map((req) => (
            <div key={req._id} className="flex items-center justify-between bg-white shadow p-3 rounded-md mb-3 border">
              <div className="flex items-center gap-3">
                <img
                  src={req.receiver.image || "/default.png"}
                  alt="user"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <span className="font-semibold text-lg">
                  {req.receiver?.name || "Unknown User"}
                </span>
              </div>
              <div>
                {req.status === "pending" && (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                )}
                {req.status === "accepted" && (
                  <span className="text-green-600 font-semibold">Accepted your requested</span>
                )}
                {req.status === "rejected" && (
                  <span className="text-red-600 font-semibold">Rejected your requested</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;
