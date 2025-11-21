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
    <div className="p-6">
      <h1 className="text-xl font-bold">Forgot Password</h1>
      <input
        className="border p-2 w-full mt-4"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="mt-4 bg-pink-500 text-white p-2 rounded"
        onClick={handleSendOtp}
      >
        Send OTP
      </button>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
};

export default ForgotPassword;
