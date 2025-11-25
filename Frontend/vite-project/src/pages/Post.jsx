import React, { useState, useEffect, useRef } from "react";
import instance from "../AxiosConfig.js";
import LeftPage from "./Left.jsx";
import Footer from "../component/Footer.jsx";

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
  const [loading, setLoading] = useState(false); 
  
  const [oldImages, setOldImages] = useState([]); // DB images
// 🔥 NEW: Button Loading State

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
    const removeImg = images[index];
  
    // 🔥 If it's an OLD image (from DB)
    if (oldImages.includes(removeImg)) {
      setOldImages((prev) => prev.filter((img) => img !== removeImg));
    }
  
    // 🔥 UI se hamesha remove
    setImages((prev) => prev.filter((_, i) => i !== index));
  
    // 🔥 NEW uploaded files ke liye
    setFiles((prev) => prev.filter((_, i) => images.length - prev.length <= index ? false : true));
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
      oldImages.forEach((img) => data.append("oldImages", img));
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

      alert("✔ Post update!");

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
  
    setOldImages(post.images || []); // <-- ADD THIS
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
  {/* Desktop Left Sidebar */}
  <div className="hidden md:flex">
    <LeftPage />
  </div>

  {/* Main Content */}
  <div className="flex-1 flex justify-center bg-gray-100 p-4">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm">
      {/* ---- YOUR POST PAGE CODE ---- */}
      { /* SAME as you wrote */ }
    </div>
  </div>
</div>

{/* Mobile Footer */}
<div className="md:hidden fixed bottom-0 left-0 right-0 bg-white z-50 shadow-lg">
  <Footer />
</div>



<div className="min-h-screen flex justify-center items-start bg-gray-100 p-4 w-full md:pl-[260px]">


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
                              className="w-full h-95 object-cover rounded-xl border"
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
