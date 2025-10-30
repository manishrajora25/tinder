import React, { useState } from "react";

const PostPage = () => {
  const [mode, setMode] = useState("edit"); // 'edit' or 'preview'
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "Manish",
    age: 18,
    interests: ["Ludo", "Sushi", "Café hopping", "Hot springs", "Self-care"],
  });

  // ✅ Add images (max 9)
  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 9));
  };

  // ✅ Remove image
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              mode === "edit"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500"
            }`}
            onClick={() => setMode("edit")}
          >
            Edit
          </button>
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              mode === "preview"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500"
            }`}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>

        {mode === "edit" ? (
          /* -------- EDIT MODE -------- */
          <div className="p-4">
            <h2 className="font-bold mb-3 text-gray-700">PROFILE PHOTOS</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    alt="profile"
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-0 transition"
                    onClick={() => handleRemoveImage(i)}
                  >
                    ❌
                  </button>
                </div>
              ))}

              {/* Empty Slots */}
              {images.length < 9 &&
                Array.from({ length: 9 - images.length }).map((_, i) => (
                  <label
                    key={i}
                    className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-pink-500 text-2xl">+</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleAddImage}
                    />
                  </label>
                ))}
            </div>

            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold">
              Save
            </button>
          </div>
        ) : (
          /* -------- PREVIEW MODE -------- */
          <div className="relative">
            {/* Main Image Carousel */}
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt="main"
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                No Photo Uploaded
              </div>
            )}

            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl font-bold">
                {formData.name} {formData.age}
              </h1>
              <p className="text-sm opacity-90 font-semibold mt-1">👥 Interests</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="bg-gray-900 bg-opacity-70 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Carousel Arrows (Dummy) */}
            <button className="absolute left-2 top-1/2 bg-white bg-opacity-50 rounded-full p-1">
              ◀
            </button>
            <button className="absolute right-2 top-1/2 bg-white bg-opacity-50 rounded-full p-1">
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
