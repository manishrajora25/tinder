import React, { useEffect, useState } from "react";
import instance from "../AxiosConfig";
import LeftPage from "./Left.jsx";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [userPostImages, setUserPostImages] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load User
  const loadUser = async () => {
    try {
      const res = await instance.get("/user/me");
      setUser(res.data.user);
    } catch (err) {
      console.log("User Load Error:", err);
    }
  };

  // Fetch Post Image of User
  const fetchUserImage = async (userId) => {
    if (!userId || userPostImages[userId]) return;

    try {
      const res = await instance.get(`/post/user/${userId}`);

      if (res.data?.posts?.length > 0) {
        const firstImg = res.data.posts[0].images?.[0];

        setUserPostImages((prev) => ({
          ...prev,
          [userId]: firstImg,
        }));
      }
    } catch (error) {
      console.log("User Post Image Error:", error);
    }
  };

  // Fetch Received Requests
  const fetchRequests = async () => {
    try {
      const res = await instance.get("/request/received");
      setRequests(res.data.requests || []);

      res.data.requests.forEach((req) => {
        if (req?.sender?._id) fetchUserImage(req.sender._id);
      });
    } catch (error) {
      console.log("Request Fetch Error:", error);
    }
  };

  // Fetch Sent Requests
  const fetchSentRequests = async () => {
    try {
      const res = await instance.get("/request/sent");
      setSentRequests(res.data.requests || []);

      res.data.requests.forEach((req) => {
        if (req?.receiver?._id) fetchUserImage(req.receiver._id);
      });
    } catch (error) {
      console.log("Sent Request Fetch Error:", error);
    }
  };

  // Accept Request
  const handleAccept = async (id) => {
    try {
      await instance.put(`/request/accept/${id}`);

      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "accepted" } : r))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Reject Request
  const handleReject = async (id) => {
    try {
      await instance.put(`/request/reject/${id}`);

      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "rejected" } : r))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Go to Chat Page
  const goToChat = (id) => {
    navigate(`/ChatPage/${id}`);
  };

  // Initial Load
  useEffect(() => {
    const init = async () => {
      await loadUser();
      await fetchRequests();
      await fetchSentRequests();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex">
      <LeftPage />

      <div className="p-4 max-w-2xl mx-auto ml-[45%]">

        <h2 className="text-2xl font-bold mb-4">Notifications</h2>

        {/* ======================= Incoming Requests ======================= */}
        {requests.length === 0 ? (
          <p className="text-gray-600">No incoming requests</p>
        ) : (
          requests.map((req) => {
            const sender = req?.sender;
            if (!sender) return null;

            const createdAt = new Date(req.createdAt);
            const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const date = createdAt.toLocaleDateString();

            return (
              <div
                key={req?._id}
                className="flex items-center justify-between bg-white shadow p-4 rounded-xl mb-4 border"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      userPostImages[sender?._id] ||
                      sender?.image ||
                      "/default.png"
                    }
                    alt="user"
                    className="w-16 h-16 rounded-full object-cover border shadow"
                  />

                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {sender?.name || "Unknown User"}
                    </h2>

                    <p className="text-gray-600 text-sm">sent you a friend request</p>

                    <div className="text-gray-400 text-xs mt-1">
                      {date} — {time}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {req?.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(req?._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(req?._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* {req?.status === "accepted" && (
                    <button
                      onClick={() => goToChat(sender?._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                    >
                      Message
                    </button>
                  )} */}



{req.status === "accepted" && (
  <div className="flex items-center gap-2">
    <span className="text-green-600 font-semibold">Accepted</span>

    <button
      onClick={() => goToChat(sender?._id)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
    >
      Message
    </button>
  </div>
)}





                  {req?.status === "rejected" && (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  )}
                </div>
              </div>
            );
          })
        )}

        <hr className="my-6" />

        {/* ======================= Sent Requests ======================= */}
        {sentRequests.length === 0 ? (
          <p className="text-gray-600">No sent requests</p>
        ) : (
          sentRequests.map((req) => {
            const receiver = req?.receiver;
            if (!receiver) return null; 

            const createdAt = new Date(req.createdAt);
            const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const date = createdAt.toLocaleDateString();

            return (
              <div
                key={req?._id}
                className="flex items-center justify-between bg-white shadow p-4 rounded-xl mb-4 border"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      userPostImages[receiver?._id] ||
                      receiver?.image ||
                      "/default.png"
                    }
                    alt="user"
                    className="w-16 h-16 rounded-full object-cover border shadow"
                  />

                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {receiver?.name || "Unknown User"}
                    </h2>

                    <p className="text-gray-600 text-sm">You sent a request</p>

                    <div className="text-gray-400 text-xs mt-1">
                      {date} — {time}
                    </div>
                  </div>
                </div>

                <div>
                  {req?.status === "pending" && (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                {req?.status === "accepted" && (
  <div className="flex items-center gap-2">
    <span className="text-green-600 font-semibold">Accepted</span>

    <button
      onClick={() => goToChat(req?.receiver?._id)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
    >
      Message
    </button>
  </div>
)}

                  {req?.status === "rejected" && (
                    <span className="text-red-600 font-semibold">Rejected</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Requests;
