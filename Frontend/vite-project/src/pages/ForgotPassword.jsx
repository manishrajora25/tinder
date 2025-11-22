import React, { useState } from "react";
import Instance from "../AxiosConfig";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await Instance.post("/user/forgot-password", { email });
      setMsg("OTP sent to your email");
      setTimeout(() => navigate("/ResetPassword"), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
  
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Forgot Password
      </h1>
  
      <input
        className="border p-3 w-full rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
  
      <button
        className="mt-5 bg-pink-500 hover:bg-pink-600 transition text-white p-3 w-full rounded-md font-semibold"
        onClick={handleSendOtp}
      >
        Send OTP
      </button>
  
      {msg && (
        <p className="mt-4 text-sm text-gray-700 font-medium">
          {msg}
        </p>
      )}
    </div>
  </div>
  
  );
};

export default ForgotPassword;
