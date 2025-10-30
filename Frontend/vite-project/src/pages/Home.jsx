import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center relative overflow-hidden">
      {/* Background Tilted Cards */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="flex flex-wrap justify-center gap-6 opacity-50">
          {[
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="profile"
              className="w-44 h-72 object-cover rounded-2xl shadow-lg transform rotate-[-10deg] hover:rotate-0 transition duration-500"
            />
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-4 z-20">
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Tinder_flame_logo.svg"
            alt="Tinder logo"
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold">tinder</span>
        </div>

        <ul className="hidden md:flex space-x-8 text-sm font-semibold">
          <li className="hover:text-pink-400 cursor-pointer">Products</li>
          <li className="hover:text-pink-400 cursor-pointer">Learn</li>
          <li className="hover:text-pink-400 cursor-pointer">Safety</li>
          <li className="hover:text-pink-400 cursor-pointer">Support</li>
          <li className="hover:text-pink-400 cursor-pointer">Download</li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="text-sm hover:text-pink-400">🌐 Language</button>
          <button className="bg-white text-black rounded-full px-5 py-2 text-sm font-semibold hover:bg-gray-200">
            Log in
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center mt-20 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
          Start something epic.
        </h1>
        <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg">
          Create account
        </button>
      </div>

      {/* Cookie Consent */}
      <div className="absolute bottom-0 bg-white text-black w-full py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left max-w-3xl">
          We value your privacy. We and our partners use trackers to measure the
          audience of our website and to provide you with offers and improve our
          own Tinder marketing operations.{" "}
          <a href="#" className="text-blue-600 underline">
            More info on cookies and providers we use.
          </a>{" "}
          You can withdraw your consent at any time in your settings.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button className="border border-black rounded-full px-4 py-2 text-sm hover:bg-gray-100">
            Personalize my choices
          </button>
          <button className="bg-black text-white rounded-full px-5 py-2 text-sm hover:bg-gray-800">
            I accept
          </button>
          <button className="border border-black rounded-full px-5 py-2 text-sm hover:bg-gray-100">
            I decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
