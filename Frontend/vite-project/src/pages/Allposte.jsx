
























// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import instance from "../AxiosConfig.js";
// import LeftPage from "./Left.jsx";
// import { X, Heart, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // ✅ Custom Arrow Components
// const NextArrow = ({ onClick }) => (
//   <button
//     className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-600 transition z-10"
//     onClick={onClick}
//   >
//     <ChevronRight size={22} />
//   </button>
// );

// const PrevArrow = ({ onClick }) => (
//   <button
//     className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-600 transition z-10"
//     onClick={onClick}
//   >
//     <ChevronLeft size={22} />
//   </button>
// );

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

//   // ✅ Outer Slider Settings (for posts)
//   const outerSettings = {
//     dots: false, // remove dots
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 8000,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     centerMode: true,
//     centerPadding: "0px",
//   };

//   // ✅ Inner Slider Settings (for multiple images in one post)
//   const innerSettings = {
//     dots: false,
//     infinite: true,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <LeftPage />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center px-4">
//         <h1 className="text-3xl font-bold mb-6 text-pink-600">
//           🌸 Explore All Posts
//         </h1>

//         {loading ? (
//           <div className="flex justify-center items-center h-80">
//             <p className="text-gray-500">Loading posts...</p>
//           </div>
//         ) : posts.length === 0 ? (
//           <div className="flex justify-center items-center h-60">
//             <p className="text-gray-500 text-lg">No posts available yet.</p>
//           </div>
//         ) : (
//           <div className="w-full md:w-[300px] lg:w-[400px] relative">
//             <Slider {...outerSettings}>
//               {posts.map((post) => (
//                 <div key={post._id} className="p-4">
//                   <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
//                     {/* 🖼️ Inner Carousel for images */}
//                     {post.images && post.images.length > 0 ? (
//                       <Slider {...innerSettings}>
//                         {post.images.map((img, index) => (
//                           <img
//                             key={index}
//                             src={img}
//                             alt={`post-img-${index}`}
//                             className="w-full h-96 object-cover"
//                           />
//                         ))}
//                       </Slider>
//                     ) : (
//                       <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
//                         <p className="text-gray-600">No Image</p>
//                       </div>
//                     )}

//                     {/* 📝 Post Details */}
//                     <div className="p-5 text-center">
//                       <h2 className="text-xl font-semibold text-gray-800">
//                         {post.title || "Untitled"}
//                       </h2>
//                       <p className="text-sm text-gray-600 mt-2">
//                         {post.description?.slice(0, 100)}
//                         {post.description?.length > 100 ? "..." : ""}
//                       </p>
//                       {post.userId && (
//                         <p className="text-xs text-gray-500 mt-2">
//                           👤 Posted by: {post.userId.name || "Anonymous"}
//                         </p>
//                       )}
//                     </div>

//                     {/* 🎯 Floating Action Buttons */}
//                     <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-5">
//                       <button className="bg-gray-200 p-3 rounded-full shadow-md hover:scale-110 transition">
//                         <X className="text-gray-600" size={22} />
//                       </button>
//                       <button className="bg-blue-100 p-3 rounded-full shadow-md hover:scale-110 transition">
//                         <Star className="text-blue-500" size={22} />
//                       </button>
//                       <button className="bg-green-100 p-3 rounded-full shadow-md hover:scale-110 transition">
//                         <Heart className="text-green-500" size={22} />
//                       </button>
//                       <button className="bg-purple-100 p-3 rounded-full shadow-md hover:scale-110 transition">
//                         <Check className="text-purple-500" size={22} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
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
import { X, Heart, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Outer Slider Arrows (main posts)
const OuterNextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-[-45px] transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-600 transition z-10"
    onClick={onClick}
  >
    <ChevronRight size={22} />
  </button>
);

const OuterPrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-[-45px] transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-600 transition z-10"
    onClick={onClick}
  >
    <ChevronLeft size={22} />
  </button>
);

// ✅ Inner Slider Arrows (images inside post)
const InnerNextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
    onClick={onClick}
  >
    <ChevronRight size={20} />
  </button>
);

const InnerPrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
    onClick={onClick}
  >
    <ChevronLeft size={20} />
  </button>
);

export const Allposte = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndexes, setImageIndexes] = useState({}); // Track image index for each post

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

  // ✅ Outer Slider (for posts)
  const outerSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    nextArrow: <OuterNextArrow />,
    prevArrow: <OuterPrevArrow />,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className="flex">
      <LeftPage />

      <div className="flex-1 flex flex-col items-center px-4">
        <h1 className="text-3xl font-bold mb-6 text-pink-600">
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
          <div className="w-full md:w-[280px] lg:w-[360px] relative">
            <Slider {...outerSettings}>
              {posts.map((post) => {
                const totalImages = post.images?.length || 0;

                // Inner slider settings (independent per post)
                const innerSettings = {
                  dots: false,
                  infinite: true,
                  arrows: true,
                  nextArrow: <InnerNextArrow />,
                  prevArrow: <InnerPrevArrow />,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  beforeChange: (oldIndex, newIndex) => {
                    setImageIndexes((prev) => ({
                      ...prev,
                      [post._id]: newIndex,
                    }));
                  },
                };

                return (
                  <div key={post._id} className="p-4">
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                      {/* 🖼️ Inner Carousel for images */}
                      <div className="relative ">
  {totalImages > 0 ? (
    <>
      <Slider {...innerSettings}>
        {post.images.map((img, index) => (
          <div key={index} className="relative">
            {/* 🖼️ Image */}
            <img
              src={img}
              alt={`post-img-${index}`}
              className="w-full h-110 object-cover rounded-2xl"
            />

            {/* 🌈 Gradient Overlay (Bottom Fade) */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent rounded-b-2xl"></div>

            {/* 👤 User Info Overlay (Tinder-style) */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm text-green-400 font-medium mb-1">
                ● Recently active
              </p>
              <h2 className="text-2xl font-bold">
                {post.userId?.name || "Unknown User"}{" "}
                <span className="text-xl font-medium">
                  {post.age || "20"}
                </span>
              </h2>
              <p className="text-sm text-gray-200 flex items-center gap-1">
                📍 {post.location || post.title || "Unknown location"}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      {/* 🔢 Image Counter */}
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
        {(imageIndexes[post._id] || 0) + 1} / {totalImages}
      </div>
    </>
  ) : (
    <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
      <p className="text-gray-600">No Image</p>
    </div>
  )}
</div>

                      {/* 📝 Post Details */}
                      <div className="p-5 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                        
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                        
                        </p>
                       
                        
                      </div>

                      {/* 🎯 Floating Buttons */}
                      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-5">
                        <button className="bg-gray-200 p-3 rounded-full shadow-md hover:scale-110 transition">
                          <X className="text-gray-600" size={22} />
                        </button>
                        <button className="bg-blue-100 p-3 rounded-full shadow-md hover:scale-110 transition">
                          <Star className="text-blue-500" size={22} />
                        </button>
                        <button className="bg-green-100 p-3 rounded-full shadow-md hover:scale-110 transition">
                          <Heart className="text-green-500" size={22} />
                        </button>
                        <button className="bg-purple-100 p-3 rounded-full shadow-md hover:scale-110 transition">
                          <Check className="text-purple-500" size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allposte;
