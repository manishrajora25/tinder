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

const Requests = () => {
  const [user, setUser] = useState(null);         // logged user
  const [requests, setRequests] = useState([]);   // received requests
  const [loading, setLoading] = useState(true);

  // ============================
  // 1️⃣ Fetch logged in User
  // ============================
  const loadUser = async () => {
    try {
      const res = await instance.get("/user/me", {
        withCredentials: true,
      });

      console.log("User Loaded:", res.data.user);
      setUser(res.data.user);
    } catch (err) {
      console.log("User Load Error:", err);
    }
  };

  // ============================
  // 2️⃣ Fetch Received Requests
  // ============================
  const fetchRequests = async () => {
    try {
      const res = await instance.get("/request/received", {
        withCredentials: true,
      });

      console.log("Requests:", res.data.requests);
      setRequests(res.data.requests || []);
    } catch (error) {
      console.log("Request Fetch Error:", error);
    }
    setLoading(false);
  };

  // ============================
  // 3️⃣ Accept Request
  // ============================
  const handleAccept = async (id) => {
    try {
      const res = await instance.put(`/request/accept/${id}`);
      console.log("Request Accepted:", res.data);
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // 4️⃣ Reject Request
  // ============================
  const handleReject = async (id) => {
    try {
      const res = await instance.put(`/request/reject/${id}`);
      console.log("Reject Response:", res.data);
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // RUN ON PAGE LOAD
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
  src={req.sender?.image || "https://via.placeholder.com/80"}
  className="w-20 h-20 rounded-full object-cover"
/>

              <span className="font-semibold text-lg">
                {req.sender?.name || "Unknown User"}
              </span>
            </div>

            {/* ACCEPT / REJECT BUTTONS */}
            <div className="flex gap-2">
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
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Requests;
