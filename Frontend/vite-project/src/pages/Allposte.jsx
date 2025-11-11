// import React, { useEffect, useState } from "react";
// import instance from "../AxiosConfig.js";
// import LeftPage from "./Left.jsx";

// export const Allposte = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch all posts
//   const fetchAllPosts = async () => {
//     try {
//       const res = await instance.get("/post/all", { withCredentials: true });
//       if (res.data?.success) {
//         setPosts(res.data.posts);
//       } else {
//         setPosts([]);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching posts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllPosts();
//   }, []);

//   return (

//     <div className="flex items-center">
//     <div className="flex">
//     <LeftPage />
//     <div className="flex-1"></div>
//   </div>
//       <div className="min-h-screen bg-gray-100 py-8 px-6">
//         <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
//           🌸 All Posts
//         </h1>

//         {loading ? (
//           <div className="flex justify-center items-center h-60">
//             <p className="text-gray-500">Loading posts...</p>
//           </div>
//         ) : posts.length === 0 ? (
//           <div className="flex justify-center items-center h-60">
//             <p className="text-gray-500 text-lg">No posts available yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {posts.map((post) => (
//               <div
//                 key={post._id}
//                 className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
//               >
//                 {/* Images */}
//                 {post.images && post.images.length > 0 && (
//                   <img
//                     src={post.images[0]} // show first image
//                     alt="post"
//                     className="w-full h-52 object-cover"
//                   />
//                 )}

//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                     {post.title}
//                   </h2>
//                   <p className="text-sm text-gray-600 mb-3">
//                     {post.description?.slice(0, 100)}
//                     {post.description?.length > 100 ? "..." : ""}
//                   </p>

//                   {post.userId && (
//                     <p className="text-xs text-gray-500">
//                       👤 Posted by: {post.userId.name || "Anonymous"}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Allposte;






import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import instance from "../AxiosConfig.js";
import LeftPage from "./Left.jsx";

export const Allposte = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all posts
  const fetchAllPosts = async () => {
    try {
      const res = await instance.get("/post/all", { withCredentials: true });
      if (res.data?.success) {
        setPosts(res.data.posts);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // ✅ Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="flex items-center">
      {/* Left Sidebar */}
      <div className="flex">
        <LeftPage />
        <div className="flex-1"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-[30%] md:w-[25%] lg:w-[20%]">

        <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
          🌸 Explore All Posts
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-80">
            <p className="text-gray-500">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-gray-500 text-lg">No posts available yet.</p>
          </div>
        ) : (
          <div className="w-[40%] flex justify-center">
            <div className="w-[40%] md:w-[250px] lg:w-[350px]">
              <Slider {...settings}>
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="flex justify-center items-center p-2"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full hover:shadow-2xl transition">
                      {/* 🖼️ Post Image */}
                      {post.images && post.images.length > 0 ? (
                        <img
                          src={post.images[0]}
                          alt="post"
                          className="w-full h-80 object-cover"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gray-300 flex items-center justify-center">
                          <p className="text-gray-600">No Image</p>
                        </div>
                      )}

                      {/* 📝 Post Content */}
                      <div className="p-4 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {post.title || "Untitled"}
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                          {post.description?.slice(0, 100)}
                          {post.description?.length > 100 ? "..." : ""}
                        </p>
                        {post.userId && (
                          <p className="text-xs text-gray-500 mt-2">
                            👤 Posted by: {post.userId.name || "Anonymous"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allposte;

