import { createContext, useEffect, useState } from "react";
import instance from "./AxiosConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // 🟢 Logged-in user
  const [loading, setLoading] = useState(true);  // 🟡 Checking cookies token

  // 🔥 Auto Login using cookies token
  const fetchUser = async () => {
    try {
      const res = await instance.get("/user/me", {
        withCredentials: true,  // 👉 Token send automatically
      });

      setUser(res.data.user || null);
    } catch (error) {
      setUser(null);
      console.log("Auto login error:", error);
    } finally {
      setLoading(false); // 👉 Now requests.jsx can run
    }
  };

  // 🔥 Run only once on page load
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
