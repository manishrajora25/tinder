// import React, { useEffect, useState } from "react";
// import axios from "../AxiosConfig";
// import Instance from "../AxiosConfig";


// const Requests = () => {
//   const [requests, setRequests] = useState([]);

//   // Fetch all requests
//   const fetchRequests = async () => {
//     try {
//       const res = await Instance.get("/request/received");
//       setRequests(res.data.requests);
//       console.log(res);
      
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // Accept request
//   const handleAccept = async (id) => {
//     try {
//       const res = await Instance.put(`/request/accept/${id}`);
//       console.log("Request Accepted:", res.data);
  
//       fetchRequests(); // reload list
//     } catch (error) {
//       console.log("Accept Error:", error.response?.data || error);
//     }
//   };
  

//   // Reject request
//   const handleReject = async (id) => {
//     try {
//       const res = await Instance.put(`/request/reject/${id}`);
//       console.log("Reject Response:", res.data);
//       fetchRequests(); 
//     } catch (error) {
//       console.log("Reject Error:", error.response?.data || error);
//     }
//   };
  

//   return (
//     <div className="p-4 max-w-xl mx-auto">

//       <h2 className="text-xl font-semibold mb-4">Requests</h2>

//       {requests.length === 0 && (
//         <p className="text-gray-500">No requests found.</p>
//       )}

//       {requests.map((req) => (
//         <div
//           key={req._id}
//           className="p-3 mb-4 border rounded-lg shadow-sm bg-white flex items-center gap-4"
//         >
//           {/* IMAGE */}
//           <img
//             src={req.sender.image || "/default.png"}
//             alt="user"
//             className="w-16 h-16 rounded-full object-cover border"
//           />

//           {/* DETAILS */}
//           <div className="flex-1">
//             <p className="font-semibold">{req.sender.name}</p>
//             <p className="text-sm text-gray-600">{req.sender.email}</p>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex flex-col gap-2">
//             <button
//               onClick={() => handleAccept(req._id)}
//               className="px-3 py-1 bg-green-500 text-white rounded"
//             >
//               Accept
//             </button>

//             <button
//               onClick={() => handleReject(req._id)}
//               className="px-3 py-1 bg-red-500 text-white rounded"
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
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
    setLoading(false);
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
    };
    init();
  }, []);

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
              {/* USER IMAGE + NAME */}
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

              {/* BUTTONS */}
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
      </div>
    </div>
  );
};

export default Requests;
