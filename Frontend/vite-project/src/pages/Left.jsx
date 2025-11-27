// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import instance from "../AxiosConfig.js"; // ✅ Axios instance for backend calls

// export default function LeftPage() {
//   const [profileImage, setProfileImage] = useState(""); // user post image
//   const [user, setUser] = useState(null); // current logged user

//   // ✅ Get current logged-in user
//  // ✅ Get current logged-in user
// const fetchUser = async () => {
//   try {
//     const res = await instance.get("/user/me", { withCredentials: true });
//     if (res.data?.success) {
//       setUser(res.data.user);
//       console.log("🖼️ User posts:", res.data);
//       fetchUserPosts(res.data.user._id); // ✅ ID pass karo yaha
//     }
    
//   } catch (err) {
//     console.error("❌ User fetch error:", err);
//   }
// };


//   // ✅ Fetch this user's posts to get first image
//   const fetchUserPosts = async (Id) => {
//     try {
//       const res = await instance.get(`/post/user/${Id}`, {
//         withCredentials: true,
//       });
  
     
  
//       if (res.data?.success && res.data.posts.length > 0) {
//         const firstImage = res.data.posts[0].images?.[0];
//         if (firstImage) {
//           setProfileImage(firstImage);
//         } else {
//           console.log("⚠️ User has posts but no images");
//         }
//       } else {
//         console.log("⚠️ No posts found for this user");
//       }
//     } catch (err) {
//       console.error("❌ Post fetch error:", err);
//     }
//     console.log("🧠 Fetching posts for user:", Id);

//   };
  

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // ✅ Icon small reusable component
//   const Icon = ({ children }) => (
//     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-sm cursor-pointer hover:bg-white/30 transition">
//       {children}
//     </div>
//   );

//   // ✅ Card reusable component
//   const Card = ({ title, subtitle, badge }) => (
//     <div className="bg-white rounded-xl p-5 shadow-md w-full">
//       <div className="flex items-start gap-4">
//         <div className="flex-1">
//           <div className="flex items-center justify-between">
//             <div className="font-semibold text-gray-800">{title}</div>
//             {badge && (
//               <div className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
//                 {badge}
//               </div>
//             )}
//           </div>
//           <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className=" bg-gray-100 fixed top-0">

//       {/* Top header */}
//       <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4">
//         <div className="max-w-md mx-auto flex items-center gap-3">
//           {/* ✅ Profile image from post */}
//           <Link to="/PostPage">
//           <img
//             src={
//               profileImage
//                 ? profileImage
//                 : "https://placehold.co/64x64/white/cccccc.png?text=You"
//             }
//             alt="profile"
//             className="w-10 h-10 rounded-full ring-2 ring-white object-cover"
//           />
//            </Link>

//           <div className="flex-1 text-white font-semibold">
//             {user ? user.name : "You"}
//           </div>

//           {/* Top navigation icons */}
//           <div className="flex gap-3">
//             <Link to="/request">
//               <Icon>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-white"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
//                 </svg>
//               </Icon>
//             </Link>

//             <Link to="/allposte">
//               <Icon>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-white"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 6l-4 8-3-3 4-8 3 3z" />
//                 </svg>
//               </Icon>
//             </Link>

//             <Icon>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5 text-white"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M4 4h12v14H4zM20 6h-2v12h2z" />
//               </svg>
//             </Icon>

//             <Icon>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5 text-white"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M12 2l7 4v6c0 5-3.9 9.7-7 10-3.1-.3-7-5-7-10V6l7-4z" />
//               </svg>
//             </Icon>
//           </div>
//         </div>
//       </div>

//       {/* Premium cards section */}
//       <div className="max-w-md mx-auto p-4 space-y-4">
//         <Card
//           title={
//             <>
//               <span className="inline-flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-gray-700"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" />
//                 </svg>
//                 <span className="font-medium">tinder</span>
//                 <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-white ml-2">
//                   PLATINUM
//                 </span>
//               </span>
//             </>
//           }
//           subtitle="Level up every action you take on Tinder"
//         />

//         <Card
//           title={
//             <>
//               <span className="inline-flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-yellow-500"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" />
//                 </svg>
//                 <span className="font-medium">tinder</span>
//                 <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 ml-2">
//                   GOLD
//                 </span>
//               </span>
//             </>
//           }
//           subtitle="See who likes you & more!"
//         />

//         <Card
//           title={
//             <>
//               <span className="inline-flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-pink-500"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 21s-6-4.35-9-7c-2.5-2.3-3-5.5-1-7 2-1.5 5-1 8 2 3-3 6-3.5 8-2 2 1.5 1.5 4.7-1 7-3 2.65-9 7-9 7z" />
//                 </svg>
//                 <span className="font-medium">tinder</span>
//                 <span className="text-xs px-2 py-0.5 rounded bg-pink-100 text-pink-700 ml-2">
//                   +
//                 </span>
//               </span>
//             </>
//           }
//           subtitle="Unlimited Likes & more!"
//         />

//         <Card
//           title={<div className="font-medium text-pink-600">Upgrade your love life</div>}
//           subtitle="Subscribe to Tinder for premium features"
//         />

//         {/* Small stats boxes */}
//         <div className="grid grid-cols-2 gap-3">
//           <div className="bg-white rounded-xl p-4 shadow-md text-center">
//             <div className="text-3xl font-bold">0</div>
//             <div className="text-xs text-gray-500">remaining</div>
//             <div className="mt-2 text-sm text-pink-500">Get more Boosts</div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-md text-center">
//             <div className="text-3xl font-bold">0</div>
//             <div className="text-xs text-gray-500">remaining</div>
//             <div className="mt-2 text-sm text-sky-500">Get more Super</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import instance from "../AxiosConfig.js"; // Axios instance

// export default function LeftPage() {
//   const [profileImage, setProfileImage] = useState("");
//   const [user, setUser] = useState(null);

//   // Get current logged-in user
//   const fetchUser = async () => {
//     try {
//       const res = await instance.get("/user/me", { withCredentials: true });
//       if (res.data?.success) {
//         setUser(res.data.user);
//         fetchUserPosts(res.data.user._id);
//       }
//     } catch (err) {
//       console.error("User fetch error:", err);
//     }
//   };

//   // Fetch posts for user
//   const fetchUserPosts = async (Id) => {
//     try {
//       const res = await instance.get(`/post/user/${Id}`, {
//         withCredentials: true,
//       });

//       if (res.data?.success && res.data.posts.length > 0) {
//         const firstImage = res.data.posts[0].images?.[0];
//         if (firstImage) setProfileImage(firstImage);
//       }
//     } catch (err) {
//       console.error("Post fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const Icon = ({ children }) => (
//     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
//       {children}
//     </div>
//   );

//   const Card = ({ title, subtitle, badge }) => (
//     <div className="bg-white rounded-xl p-5 shadow-sm border">
//       <div className="flex items-start gap-4">
//         <div className="flex-1">
//           <div className="flex items-center justify-between">
//             <div className="font-semibold text-gray-800">{title}</div>
//             {badge && (
//               <div className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
//                 {badge}
//               </div>
//             )}
//           </div>
//           <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed top-0 left-0 h-screen w-[280px] bg-white border-r border-gray-200 overflow-y-auto">

//       {/* ==== TOP USER SECTION (Instagram Style) ==== */}
//       <div className="p-4 border-b border-gray-200 bg-white">
//         <div className="flex items-center gap-3">

//           {/* Profile Image */}
//           <Link to="/PostPage">
//             <img
//               src={
//                 profileImage
//                   ? profileImage
//                   : "https://placehold.co/64x64/white/cccccc.png?text=You"
//               }
//               alt="profile"
//               className="w-12 h-12 rounded-full border object-cover"
//             />
//           </Link>

//           <div className="flex-1">
//             <div className="font-semibold text-gray-900">
//               {user ? user.name : "You"}
//             </div>
//             <p className="text-xs text-gray-500">My Account</p>
//           </div>
//         </div>
//       </div>

//       {/* ==== MENU (Instagram Style Vertical Menu) ==== */}
//       <div className="mt-4 px-4 space-y-4">

//         <Link to="/request" className="flex items-center gap-3 text-gray-700 hover:text-black">
//           <Icon>
//             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
//             </svg>
//           </Icon>
//           <span className="font-medium">Requests</span>
//         </Link>

//         <Link to="/allposte" className="flex items-center gap-3 text-gray-700 hover:text-black">
//           <Icon>
//             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 6l-4 8-3-3 4-8 3 3z" />
//             </svg>
//           </Icon>
//           <span className="font-medium">My Posts</span>
//         </Link>

//         <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
//           <Icon>
//             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M4 4h12v14H4zM20 6h-2v12h2z" />
//             </svg>
//           </Icon>
//           <span className="font-medium">Insights</span>
//         </div>

//         <div className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
//           <Icon>
//             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 2l7 4v6c0 5-3.9 9.7-7 10-3.1-.3-7-5-7-10V6l7-4z" />
//             </svg>
//           </Icon>
//           <span className="font-medium">Settings</span>
//         </div>

//       </div>

//       {/* ==== PREMIUM CARDS SECTION (Same as your old code, only cleaner style) ==== */}
//       <div className="p-4 mt-4 space-y-4">

//         <Card
//           title={
//             <span className="inline-flex items-center gap-2">
//               <svg className="w-5 h-5 text-gray-700" fill="currentColor">
//                 <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" />
//               </svg>
//               <span className="font-medium">tinder</span>
//               <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-white ml-2">
//                 PLATINUM
//               </span>
//             </span>
//           }
//           subtitle="Level up every action you take on Tinder"
//         />

//         <Card
//           title={
//             <span className="inline-flex items-center gap-2">
//               <svg className="w-5 h-5 text-yellow-500" fill="currentColor">
//                 <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" />
//               </svg>
//               <span className="font-medium">tinder</span>
//               <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 ml-2">
//                 GOLD
//               </span>
//             </span>
//           }
//           subtitle="See who likes you & more!"
//         />

//         <Card
//           title={
//             <span className="inline-flex items-center gap-2">
//               <svg className="w-5 h-5 text-pink-500" fill="currentColor">
//                 <path d="M12 21s-6-4.35-9-7c-2.5-2.3-3-5.5-1-7 2-1.5 5-1 8 2 3-3 6-3.5 8-2 2 1.5 1.5 4.7-1 7-3 2.65-9 7-9 7z" />
//               </svg>
//               <span className="font-medium">tinder</span>
//               <span className="text-xs px-2 py-0.5 rounded bg-pink-100 text-pink-700 ml-2">
//                 +
//               </span>
//             </span>
//           }
//           subtitle="Unlimited Likes & more!"
//         />

//         <Card
//           title={<div className="font-medium text-pink-600">Upgrade your love life</div>}
//           subtitle="Subscribe to Tinder for premium features"
//         />

//         {/* small stats */}
//         <div className="grid grid-cols-2 gap-3">
//           <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
//             <div className="text-3xl font-bold">0</div>
//             <div className="text-xs text-gray-500">remaining</div>
//             <div className="mt-2 text-sm text-pink-500">Get more Boosts</div>
//           </div>

//           <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
//             <div className="text-3xl font-bold">0</div>
//             <div className="text-xs text-gray-500">remaining</div>
//             <div className="mt-2 text-sm text-sky-500">Get more Super</div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }












import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../AxiosConfig.js"; // Axios instance

export default function LeftPage() {
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState(null);

  // Get current logged-in user
  const fetchUser = async () => {
    try {
      const res = await instance.get("/user/me", { withCredentials: true });
      if (res.data?.success) {
        setUser(res.data.user);
        fetchUserPosts(res.data.user._id);
      }
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  const fetchUserPosts = async (Id) => {
    try {
      const res = await instance.get(`/post/user/${Id}`, {
        withCredentials: true,
      });

      if (res.data?.success && res.data.posts.length > 0) {
        const firstImage = res.data.posts[0].images?.[0];
        if (firstImage) setProfileImage(firstImage);
      }
    } catch (err) {
      console.error("Post fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔥 Advanced Fancy Icon Wrapper
  const Icon = ({ children }) => (
    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                    flex items-center justify-center cursor-pointer 
                    transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-lg hover:shadow-pink-300">
      {children}
    </div>
  );


  // const Icon = ({ children }) => (
  //   <div className="group w-10 h-10 rounded-xl bg-white/40 backdrop-blur-sm 
  //   flex items-center justify-center cursor-pointer border border-white/50 
  //   transition-all duration-300 
  //   hover:bg-white/70 hover:scale-110
  //   hover:shadow-[0_0_12px_#ff8a65]">
  //     {children}
  //   </div>
  // );
  

  // 🔥 Glassmorphism Premium Card
  const Card = ({ title, subtitle, badge }) => (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 shadow-md hover:shadow-xl 
                    border border-pink-100 hover:border-pink-300 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-900">{title}</div>
            {badge && (
              <div className="text-xs px-2 py-1 rounded-md bg-gray-800/80 text-white shadow">
                {badge}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );

  return (
<div className="fixed top-0 left-0 h-screen w-[280px]
bg-gradient-to-b from-[#ffecd2] via-[#fcb69f] to-[#ffffff]
border-r border-gray-200 overflow-y-auto backdrop-blur-md">


      {/* ==== TOP USER SECTION ==== */}
      <div className="p-4 border-b border-gray-200 bg-white/60 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">

          <Link to="/PostPage">
            <img
              src={
                profileImage
                  ? profileImage
                  : "https://placehold.co/64x64/white/cccccc.png?text=You"
              }
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-pink-400 shadow-md 
                         hover:scale-105 hover:shadow-pink-300 transition-all duration-300 object-cover"
            />
          </Link>

          <div className="flex-1">
            <div className="font-bold text-gray-900 text-lg tracking-wide">
              {user ? user.name : "You"}
            </div>
            <p className="text-xs text-pink-500">My Account</p>
          </div>
        </div>
      </div>

      {/* ==== MENU ==== */}
      <div className="mt-4 px-4 space-y-5">

        <Link
          to="/request"
          className="flex items-center gap-3 group text-gray-700 transition-all duration-300 hover:text-pink-600"
        >
          <Icon>
            <svg className="w-6 h-6 group-hover:scale-125 transition-all duration-300" 
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </Icon>
          <span className="font-semibold group-hover:tracking-wide transition-all duration-300">
            Requests
          </span>
        </Link>

        <Link
          to="/allposte"
          className="flex items-center gap-3 group text-gray-700 transition-all duration-300 hover:text-purple-600"
        >
          <Icon>
            <svg className="w-6 h-6 group-hover:scale-125 transition-all duration-300" 
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 6l-4 8-3-3 4-8 3 3z" />
            </svg>
          </Icon>
          <span className="font-semibold group-hover:tracking-wide transition-all duration-300">
            My Posts
          </span>
        </Link>

        <div className="flex items-center gap-3 group text-gray-700 hover:text-indigo-600 cursor-pointer">
          <Icon>
            <svg className="w-6 h-6 group-hover:rotate-12 transition-all duration-300"
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h12v14H4zM20 6h-2v12h2z" />
            </svg>
          </Icon>
          <span className="font-semibold group-hover:tracking-wide transition-all duration-300">
            Insights
          </span>
        </div>

        <div className="flex items-center gap-3 group text-gray-700 hover:text-pink-600 cursor-pointer">
          <Icon>
            <svg className="w-6 h-6 group-hover:rotate-12 transition-all duration-300"
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l7 4v6c0 5-3.9 9.7-7 10-3.1-.3-7-5-7-10V6l7-4z" />
            </svg>
          </Icon>
          <span className="font-semibold group-hover:tracking-wide transition-all duration-300">
            Settings
          </span>
        </div>

      </div>

      {/* ==== PREMIUM CARDS ==== */}
      <div className="p-4 mt-5 space-y-4">

        {/* PLATINUM */}
        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" fill="currentColor">
                <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8 12 2z" />
              </svg>
              <span className="font-medium">tinder</span>
              <span className="text-xs px-2 py-0.5 rounded bg-gradient-to-r from-gray-700 to-black text-white ml-2 shadow">
                PLATINUM
              </span>
            </span>
          }
          subtitle="Level up every action you take on Tinder"
        />

        {/* GOLD */}
        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor">
                <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 
                       1-6L3 8.5 9 8 12 2z" />
              </svg>
              <span className="font-medium">tinder</span>
              <span className="text-xs px-2 py-0.5 rounded bg-yellow-300 text-gray-900 ml-2 shadow">
                GOLD
              </span>
            </span>
          }
          subtitle="See who likes you & more!"
        />

        {/* PINK+ */}
        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor">
                <path d="M12 21s-6-4.35-9-7c-2.5-2.3-3-5.5-1-7 
                       2-1.5 5-1 8 2 3-3 6-3.5 8-2 2 1.5 
                       1.5 4.7-1 7-3 2.65-9 7-9 7z" />
              </svg>
              <span className="font-medium">tinder</span>
              <span className="text-xs px-2 py-0.5 rounded bg-pink-300 text-white ml-2 shadow">
                +
              </span>
            </span>
          }
          subtitle="Unlimited Likes & more!"
        />

        {/* Upgrade */}
        <Card
          title={<div className="font-medium text-pink-700">Upgrade your love life</div>}
          subtitle="Subscribe to Tinder for premium features"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-lg 
                          border hover:border-pink-300 transition-all duration-300 text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-xs text-gray-600">remaining</div>
            <div className="mt-2 text-sm text-pink-500">Get more Boosts</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-lg 
                          border hover:border-purple-300 transition-all duration-300 text-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-xs text-gray-600">remaining</div>
            <div className="mt-2 text-sm text-indigo-500">Get more Super</div>
          </div>
        </div>

      </div>
    </div>
  );
}
