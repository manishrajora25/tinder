import React, { useEffect, useState, useContext } from "react";
import instance from "../AxiosConfig";
import { UserContext } from "../UserContext.jsx";

const Friends = () => {
  const { token } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const loadFriends = async () => {
      const res = await instance.get("/friends/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(res.data.friends);
    };
    loadFriends();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Your Friends</h2>

      {friends.map((f) => (
        <div key={f._id} className="p-3 border mt-2 rounded-md">
          {f.name}
        </div>
      ))}
    </div>
  );
};

export default Friends;
