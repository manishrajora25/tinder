import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ profileImage }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md py-2 px-6 flex justify-between items-center md:hidden z-50">

      {/* Home */}
      <Link to="/PostPage">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700"
            viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3 10v10h18V10L12 2z" />
          </svg>
        </div>
      </Link>

      {/* Requests */}
      <Link to="/request">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700"
            viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>
      </Link>

      {/* Explore */}
      <Link to="/allposte">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700"
            viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3 6l-4 8-3-3 4-8 3 3z" />
          </svg>
        </div>
      </Link>

      {/* Video */}
      <div className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700"
          viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h12v14H4zM20 6h-2v12h2z" />
        </svg>
      </div>

      {/* Profile */}
      <Link to="/PostPage">
        <img
          src={
            profileImage
              ? profileImage
              : "https://placehold.co/40x40?text=You"
          }
          className="w-8 h-8 rounded-full border border-gray-300 object-cover"
          alt="profile"
        />
      </Link>

    </div>
  );
}
