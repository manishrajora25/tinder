
// import React, { useState, useEffect } from "react";
// import instance from "../AxiosConfig.js";
// import LeftPage from "./Left.jsx";



// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// const PostPage = () => {
//   const [mode, setMode] = useState("edit"); // edit / preview
//   const [images, setImages] = useState([]); // preview URLs
//   const [files, setFiles] = useState([]); // upload files
//   const [posts, setPosts] = useState([]); // backend posts
//   const [editId, setEditId] = useState(null); // for updating
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   });

//   // ✅ Add new images
//   const handleAddImage = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const totalImages = images.length + selectedFiles.length;

//     if (totalImages > 9) {
//       alert("You can upload a maximum of 9 images.");
//       return;
//     }

//     const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
//     setImages((prev) => [...prev, ...newPreviews]);
//     setFiles((prev) => [...prev, ...selectedFiles]);
//   };

//   // ✅ Remove image
//   const handleRemoveImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   // ✅ Input handle
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Fetch only current user's posts
//   const fetchPosts = async () => {
//     try {
//       const res = await instance.get("/post/my", { withCredentials: true });
//       if (res.data?.success) setPosts(res.data.posts);
//       else setPosts([]);
//       console.log("✅ My posts fetched successfully!");
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//     }
//   };

//   // ✅ Submit or Update
//   const handleSubmit = async () => {
//     if (files.length < 2 && !editId) {
//       alert("Please upload at least 2 images.");
//       return;
//     }

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     files.forEach((file) => data.append("images", file));

//     try {
//       if (editId) {
//         await instance.put(`/post/update/${editId}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         });
//         alert("✅ Post updated successfully!");
//         console.log("Post updated successfully!");
//       } else {
//         await instance.post("/post/add", data, {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         });
//         alert("✅ Post uploaded successfully!");
//       }

//       // Reset everything
//       setFormData({ title: "", description: "" });
//       setFiles([]);
//       setImages([]);
//       setEditId(null);
//       setMode("preview");
//       fetchPosts();
//     } catch (err) {
//       console.error("❌ Upload error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "❌ Failed to upload post");
//     }
//   };

//   // ✅ Edit mode trigger
//   const handleEdit = (post) => {
//     setMode("edit");
//     setEditId(post._id);
//     setFormData({ title: post.title, description: post.description });
//     setImages(post.images || []);
//     setFiles([]);
//   };

//   // ✅ Fetch posts on preview mode
//   useEffect(() => {
//     if (mode === "preview") fetchPosts();
//   }, [mode]);



//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
  


//   return (
//     <div className="flex items-center">
//       <div className="flex">
//         <LeftPage />
//         <div className="flex-1"></div>
//       </div>

//       <div className="min-h-screen flex justify-center bg-gray-100 p-4  ml-[45%]">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm">
//           {/* Tabs */}
//           <div className="flex border-b">
//             <button
//               className={`flex-1 py-3 text-center font-semibold ${
//                 mode === "edit"
//                   ? "text-pink-600 border-b-2 border-pink-600"
//                   : "text-gray-500"
//               }`}
//               onClick={() => {
//                 setMode("edit");
//                 setEditId(null);
//                 setFormData({ title: "", description: "" });
//                 setImages([]);
//                 setFiles([]);
//               }}
//             >
//               {editId ? "Update" : "Edit"}
//             </button>
//             <button
//               className={`flex-1 py-3 text-center font-semibold ${
//                 mode === "preview"
//                   ? "text-pink-600 border-b-2 border-pink-600"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setMode("preview")}
//             >
//               Preview
//             </button>
//           </div>

//           {/* -------- EDIT MODE -------- */}
//           {mode === "edit" ? (
//             <div className="p-4">
//               <h2 className="font-bold mb-3 text-gray-700">
//                 {editId ? "UPDATE POST" : "CREATE POST"}
//               </h2>

//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Post title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full border rounded-md p-2 mb-3"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Post description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full border rounded-md p-2 mb-4"
//                 rows="3"
//               />

//               <h3 className="font-bold mb-3 text-gray-700">UPLOAD IMAGES</h3>
//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 {images.map((img, i) => (
//                   <div key={i} className="relative group">
//                     <img
//                       src={img}
//                       alt="preview"
//                       className="w-full h-24 object-cover rounded-md border"
//                     />
//                     <button
//                       className="absolute top-1 right-1 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-0 transition"
//                       onClick={() => handleRemoveImage(i)}
//                     >
//                       ❌
//                     </button>
//                   </div>
//                 ))}

//                 {images.length < 9 && (
//                   <label className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
//                     <span className="text-pink-500 text-2xl">+</span>
//                     <input
//                       type="file"
//                       name="images"
//                       multiple
//                       onChange={handleAddImage}
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold"
//               >
//                 {editId ? "Update Post" : "Upload Post"}
//               </button>
//             </div>
//           ) : (
//             /* -------- PREVIEW MODE -------- */
//            /* -------- PREVIEW MODE -------- */
// <div className="relative p-4">
//   {posts.length > 0 ? (
//     <div className="space-y-5">
//       {posts.map((post) => (
//         <div
//           key={post._id}
//           className="border rounded-xl shadow-sm p-3 bg-gray-50 relative"
//         >
//           {/* ==== IMAGE SLIDER ==== */}
//           <Slider {...sliderSettings}>
//             {post.images?.map((img, i) => (
//               <div key={i}>
//                 <img
//                   src={img}
//                   alt="preview"
//                   className="w-full h-64 object-cover rounded-xl border"
//                 />
//               </div>
//             ))}
//           </Slider>

//           {/* ==== TEXT ==== */}
//           <h1 className="text-lg font-bold text-gray-800 mt-3">
//             {post.title}
//           </h1>
//           <p className="text-sm text-gray-600 mt-1">
//             {post.description}
//           </p>

//           {/* ==== EDIT BUTTON ==== */}
//           <button
//             onClick={() => handleEdit(post)}
//             className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full hover:bg-pink-600"
//           >
//             Edit
//           </button>

//           {/* ==== USER INFO ==== */}
//           {post.userId && (
//             <p className="text-xs text-gray-500 mt-2">
//               Posted by: {post.userId.name || "Unknown"}
//             </p>
//           )}
//         </div>
//       ))}
//     </div>
//   ) : (
//     <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
//       No posts found for your account.
//     </div>
//   )}
// </div>

//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostPage;







// PostPage.jsx
import React, { useState, useEffect, useRef } from "react";
import instance from "../AxiosConfig.js";
import LeftPage from "./Left.jsx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ---------------- CUSTOM ARROWS ----------------
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-20 hover:bg-gray-100"
  >
     🡢
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-20 hover:bg-gray-100"
  >
   🡠 
  </div>
);

const PostPage = () => {
  const [mode, setMode] = useState("edit");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false); // 🔥 NEW: Button Loading State

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const objectUrlsRef = useRef(new Set());

  const fetchPosts = async () => {
    try {
      const res = await instance.get("/post/my", { withCredentials: true });
      const myPosts = res.data?.posts || [];
      setPosts(myPosts);

      setMode(myPosts.length > 0 ? "preview" : "edit");
      return myPosts;
    } catch (err) {
      console.error("❌ Fetch error:", err);
      return [];
    }
  };

  useEffect(() => {
    fetchPosts();
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);

  // ------------ ADD IMAGE ------------
  const handleAddImage = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    if (images.length + selectedFiles.length > 9) {
      alert("You can upload a maximum of 9 images.");
      return;
    }

    const newPreviews = selectedFiles.map((file) => {
      const url = URL.createObjectURL(file);
      objectUrlsRef.current.add(url);
      return url;
    });

    setImages((prev) => [...prev, ...newPreviews]);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // ------------ REMOVE IMAGE ------------
  const handleRemoveImage = (index) => {
    const removed = images[index];
    if (objectUrlsRef.current.has(removed)) {
      URL.revokeObjectURL(removed);
      objectUrlsRef.current.delete(removed);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ------------ INPUT CHANGE ------------
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ------------ SUBMIT ------------
  const handleSubmit = async () => {
    if (!editId && files.length < 2) {
      alert("Please upload at least 2 images.");
      return;
    }

    try {
      setLoading(true); // 🔥 Start Loading

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      files.forEach((f) => data.append("images", f));

      if (editId) {
        await instance.put(`/post/update/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      } else {
        await instance.post("/post/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      }

      alert("✔ Post saved!");

      setFormData({ title: "", description: "" });
      setFiles([]);
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
      setImages([]);
      setEditId(null);

      await fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving post");
    } finally {
      setLoading(false); // 🔥 Stop loading
    }
  };

  // ------------ EDIT POST ------------
  const handleEdit = (post) => {
    setMode("edit");
    setEditId(post._id);

    setFormData({
      title: post.title,
      description: post.description,
    });

    setImages(post.images || []);
    setFiles([]);
  };

  // ------------ SLIDER SETTINGS ------------
  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        <LeftPage />
        <div className="flex-1" />
      </div>

      <div className="min-h-screen flex justify-center bg-gray-100 p-4 ml-[45%]">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm">
          {/* ---------- TABS ---------- */}
          <div className="flex border-b">
          <button
  disabled={posts.length > 0}   // ❌ Disable button if posts exist
  className={`flex-1 py-3 text-center font-semibold ${
    posts.length > 0
      ? "text-gray-400 cursor-not-allowed" // ❌ disabled styling
      : mode === "edit"
      ? "text-pink-600 border-b-2 border-pink-600"
      : "text-gray-500"
  }`}
  onClick={() => {
    if (posts.length > 0) return; // ❌ DO NOTHING
    setMode("edit");
    setEditId(null);
    setFormData({ title: "", description: "" });

    objectUrlsRef.current.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    });
    objectUrlsRef.current.clear();
    setImages([]);
    setFiles([]);
  }}
>
  {editId ? "Update" : "Create"}
</button>


            <button
              className={`flex-1 py-3 text-center font-semibold ${
                mode === "preview"
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setMode("preview");
                fetchPosts();
              }}
            >
              Preview
            </button>
          </div>

          {/* ---------- EDIT MODE ---------- */}
          {mode === "edit" ? (
            <div className="p-4">
              <h2 className="font-bold mb-3 text-gray-700">
                {editId ? "UPDATE POST" : "CREATE POST"}
              </h2>

              <input
                type="text"
                name="title"
                placeholder="Post title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mb-3"
              />

              <textarea
                name="description"
                placeholder="Post description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mb-4"
                rows="3"
              />

              <h3 className="font-bold mb-3 text-gray-700">UPLOAD IMAGES</h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition"
                    >
                      ❌
                    </button>
                  </div>
                ))}

                {images.length < 9 && (
                  <label className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                    <span className="text-pink-500 text-2xl">+</span>
                    <input
                      type="file"
                      name="images"
                      multiple
                      onChange={handleAddImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* ---------- BUTTON WITH LOADING ---------- */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-2 rounded-full font-semibold text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                {loading
                  ? "Uploading..."
                  : editId
                  ? "Update Post"
                  : "Upload Post"}
              </button>
            </div>
          ) : (
            // ---------- PREVIEW MODE ----------
            <div className="p-4">
              {posts.length > 0 ? (
                <div className="space-y-5">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="border rounded-xl shadow-sm p-3 bg-gray-50 relative"
                    >
                      <Slider {...sliderSettings}>
                        {post.images?.map((img, i) => (
                          <div key={i}>
                            <img
                              src={img}
                              className="w-full h-64 object-cover rounded-xl border"
                            />
                          </div>
                        ))}
                      </Slider>

                      <h1 className="text-lg font-bold text-gray-800 mt-3">
                        {post.title}
                      </h1>
                      <p className="text-sm text-gray-600 mt-1">
                        {post.description}
                      </p>

                      <button
                        onClick={() => handleEdit(post)}
                        className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full hover:bg-pink-600"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                  No posts found for your account.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
