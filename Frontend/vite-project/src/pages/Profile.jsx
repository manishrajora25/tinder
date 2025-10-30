



// import React, { useState } from "react";
// // import axios from "axios";
// import Instance from "../AxiosConfig.js";
// import { Camera } from "lucide-react";

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     user: "",
//     bio: "",
//     age: "",
//     gender: "",
//     interests: "",
//   });
//   const [img, setImg] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // handle text inputs
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle image input
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//       setPreview(URL.createObjectURL(file)); // 🔥 preview
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       setLoading(true);
//       const data = new FormData();
//       data.append("user", formData.user);
//       data.append("bio", formData.bio);
//       data.append("age", formData.age);
//       data.append("gender", formData.gender);
//       data.append("interests", formData.interests);
//       if (img) data.append("img", img);

//       const res = await Instance.post("/profile/create", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true, // ✅ if using cookies for auth
//       });

//       setMessage("✅ Profile created successfully!");
//       console.log("Response:", res.data);
//       setFormData({ user: "", bio: "", age: "", gender: "", interests: "" });
//       setImg(null);
//       setPreview(null);
//     } catch (err) {
//       console.error(err);
//       setMessage(`❌ Error: ${err?.response?.data?.message || err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
//           Create Profile
//         </h1>

//         {/* Profile Image Upload Preview */}
//         <div className="flex flex-col items-center mb-6">
//           <label
//             htmlFor="img"
//             className="relative cursor-pointer w-28 h-28 rounded-full border-4 border-pink-500 flex items-center justify-center overflow-hidden hover:opacity-90 transition"
//           >
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="flex flex-col items-center justify-center text-pink-500">
//                 <Camera size={32} />
//                 <p className="text-sm">Upload</p>
//               </div>
//             )}
//             <input
//               type="file"
//               id="img"
//               name="img"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </label>
//           <p className="text-gray-600 text-sm mt-2">Click to upload image</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="user"
//             placeholder="Username"
//             value={formData.user}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//             required
//           />

//           <textarea
//             name="bio"
//             placeholder="Write your bio..."
//             value={formData.bio}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//             rows="3"
//           />

//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={formData.age}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//             required
//           />

//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>

//           <input
//             type="text"
//             name="interests"
//             placeholder="Your interests (comma separated)"
//             value={formData.interests}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Please wait..." : "Create Profile"}
//           </button>
//         </form>

//         {message && (
//           <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;








// import React, { useState } from "react";
// // import axios from "axios";

// import Instance from "../AxiosConfig.js";

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     bio: "",
//     age: "",
//     gender: "",
//     interests: "",
//   });
//   const [img, setImg] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle text inputs
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle image input
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImg(e.target.files[0]);
//     }
//   };

//   // Submit profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       setLoading(true);
//       const data = new FormData();
//       data.append("bio", formData.bio);
//       data.append("age", formData.age);
//       data.append("gender", formData.gender);
//       data.append("interests", formData.interests);
//       if (img) data.append("image", img); // must match backend

//       const res = await Instance.post("/profile/create", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true, // if backend uses cookies for auth
//       });

//       setMessage("✅ Profile created successfully!");
//       console.log("Response:", res.data);
//       setFormData({ bio: "", age: "", gender: "", interests: "" });
//       setImg(null);
//     } catch (err) {
//       console.error(err);
//       setMessage(`❌ Error: ${err?.response?.data?.message || err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
//           Create Profile
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Image preview circle */}
//           <div className="flex justify-center mb-4">
//             <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-600 flex items-center justify-center">
//               {img ? (
//                 <img
//                   src={URL.createObjectURL(img)}
//                   alt="profile preview"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-400">Upload</span>
//               )}
//             </div>
//           </div>

//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//           />

//           <textarea
//             name="bio"
//             placeholder="Write your bio..."
//             value={formData.bio}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//             rows="3"
//             required
//           />

//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={formData.age}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//             required
//           />

//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>

//           <input
//             type="text"
//             name="interests"
//             placeholder="Your interests (comma separated)"
//             value={formData.interests}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-3 py-2 outline-none"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Please wait..." : "Create Profile"}
//           </button>
//         </form>

//         {message && (
//           <p className="text-center mt-4 text-gray-700 font-medium break-words">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;










import React, { useState, useEffect } from "react";
import Instance from "../AxiosConfig.js"; // Axios instance with baseURL & credentials

const Profile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    age: "",
    gender: "",
    interests: "",
  });
  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // true = profile exists & inputs disabled
  const [profileId, setProfileId] = useState(null); // user's profile id

  // ✅ Fetch logged-in user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await Instance.get("/profile/me", { withCredentials: true });

        if (res.data) {
          const profile = res.data;
          setFormData({
            bio: profile.bio || "",
            age: profile.age || "",
            gender: profile.gender || "",
            interests: profile.interests ? profile.interests.join(", ") : "",
          });
          setPreviewImg(profile.image || null);
          setProfileId(profile._id);
          setIsSaved(true);
        }
      } catch (err) {
        console.warn("No existing profile found. Creating new...");
        setIsSaved(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  // ✅ Handle Save/Edit
  const handleSaveOrEdit = async () => {
    if (isSaved) {
      // Enable editing
      setIsSaved(false);
      setMessage("");
      return;
    }

    // Save profile
    setMessage("");
    try {
      setLoading(true);
      const data = new FormData();
      data.append("bio", formData.bio);
      data.append("age", formData.age);
      data.append("gender", formData.gender);
      data.append("interests", formData.interests);
      if (img) data.append("image", img);

      let res;
      if (profileId) {
        // Update existing profile
        res = await Instance.put(`/profile/update/${profileId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        setMessage("✅ Profile updated successfully!");
      } else {
        // Create new profile
        res = await Instance.post("/profile/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        setMessage("✅ Profile created successfully!");
        setProfileId(res.data.profile._id);
      }

      setIsSaved(true); // disable inputs again
      console.log("Response:", res.data);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error: ${err?.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <button>p</button>
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          {isSaved ? "Your Profile" : "Edit Profile"}
        </h1>

        <div className="space-y-5">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-600 flex items-center justify-center">
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Upload</span>
              )}
            </div>
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg px-3 py-2 outline-none"
            disabled={isSaved}
          />

          <textarea
            name="bio"
            placeholder="Write your bio..."
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none"
            rows="3"
            required
            disabled={isSaved}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none"
            required
            disabled={isSaved}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none"
            required
            disabled={isSaved}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="interests"
            placeholder="Your interests (comma separated)"
            value={formData.interests}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none"
            disabled={isSaved}
          />

          <button
            type="button"
            onClick={handleSaveOrEdit}
            disabled={loading}
            className={`w-full ${
              isSaved
                ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            } py-2 rounded-full font-semibold transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : isSaved ? "Edit" : "Save"}
          </button>
        </div>

        {message && (
          <p
            className={`text-center mt-4 font-medium transition-all duration-500 ${
              message.includes("✅")
                ? "text-green-600 animate-pulse"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
