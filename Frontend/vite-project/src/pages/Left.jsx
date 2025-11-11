import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../AxiosConfig.js"; // ✅ Axios instance for backend calls

export default function LeftPage() {
  const [profileImage, setProfileImage] = useState(""); // user post image
  const [user, setUser] = useState(null); // current logged user

  // ✅ Get current logged-in user
 // ✅ Get current logged-in user
const fetchUser = async () => {
  try {
    const res = await instance.get("/user/me", { withCredentials: true });
    if (res.data?.success) {
      setUser(res.data.user);
      console.log("🖼️ User posts:", res.data);
      fetchUserPosts(res.data.user._id); // ✅ ID pass karo yaha
    }
    
  } catch (err) {
    console.error("❌ User fetch error:", err);
  }
};


  // ✅ Fetch this user's posts to get first image
  const fetchUserPosts = async (Id) => {
    try {
      const res = await instance.get(`/post/user/${Id}`, {
        withCredentials: true,
      });
  
     
  
      if (res.data?.success && res.data.posts.length > 0) {
        const firstImage = res.data.posts[0].images?.[0];
        if (firstImage) {
          setProfileImage(firstImage);
        } else {
          console.log("⚠️ User has posts but no images");
        }
      } else {
        console.log("⚠️ No posts found for this user");
      }
    } catch (err) {
      console.error("❌ Post fetch error:", err);
    }
    console.log("🧠 Fetching posts for user:", Id);

  };
  

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Icon small reusable component
  const Icon = ({ children }) => (
    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-sm cursor-pointer hover:bg-white/30 transition">
      {children}
    </div>
  );

  // ✅ Card reusable component
  const Card = ({ title, subtitle, badge }) => (
    <div className="bg-white rounded-xl p-5 shadow-md w-full">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-800">{title}</div>
            {badge && (
              <div className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                {badge}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top header */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* ✅ Profile image from post */}
          <img
            src={
              profileImage
                ? profileImage
                : "https://placehold.co/64x64/white/cccccc.png?text=You"
            }
            alt="profile"
            className="w-10 h-10 rounded-full ring-2 ring-white object-cover"
          />

          <div className="flex-1 text-white font-semibold">
            {user ? user.name : "You"}
          </div>

          {/* Top navigation icons */}
          <div className="flex gap-3">
            <Link to="/post">
              <Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>
              </Icon>
            </Link>

            <Link to="/allposte">
              <Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 6l-4 8-3-3 4-8 3 3z" />
                </svg>
              </Icon>
            </Link>

            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h12v14H4zM20 6h-2v12h2z" />
              </svg>
            </Icon>

            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l7 4v6c0 5-3.9 9.7-7 10-3.1-.3-7-5-7-10V6l7-4z" />
              </svg>
            </Icon>
          </div>
        </div>
      </div>

      {/* Premium cards section */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        <Card
          title={
            <>
              <span className="inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" />
                </svg>
                <span className="font-medium">tinder</span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-white ml-2">
                  PLATINUM
                </span>
              </span>
            </>
          }
          subtitle="Level up every action you take on Tinder"
        />

        <Card
          title={
            <>
              <span className="inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" />
                </svg>
                <span className="font-medium">tinder</span>
                <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 ml-2">
                  GOLD
                </span>
              </span>
            </>
          }
          subtitle="See who likes you & more!"
        />

        <Card
          title={
            <>
              <span className="inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-pink-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21s-6-4.35-9-7c-2.5-2.3-3-5.5-1-7 2-1.5 5-1 8 2 3-3 6-3.5 8-2 2 1.5 1.5 4.7-1 7-3 2.65-9 7-9 7z" />
                </svg>
                <span className="font-medium">tinder</span>
                <span className="text-xs px-2 py-0.5 rounded bg-pink-100 text-pink-700 ml-2">
                  +
                </span>
              </span>
            </>
          }
          subtitle="Unlimited Likes & more!"
        />

        <Card
          title={<div className="font-medium text-pink-600">Upgrade your love life</div>}
          subtitle="Subscribe to Tinder for premium features"
        />

        {/* Small stats boxes */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-xs text-gray-500">remaining</div>
            <div className="mt-2 text-sm text-pink-500">Get more Boosts</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-xs text-gray-500">remaining</div>
            <div className="mt-2 text-sm text-sky-500">Get more Super</div>
          </div>
        </div>
      </div>
    </div>
  );
}
