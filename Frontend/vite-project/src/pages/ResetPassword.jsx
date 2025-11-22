import React, { useState } from "react";
import Instance from "../AxiosConfig";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const res = await Instance.post("/user/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMsg("Password changed successfully 🎉");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message);
    }
  };

  return (
   
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">

  <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

  <p className="text-sm text-gray-600 mb-1">
    OTP sent to <span className="font-semibold">{email}</span>
  </p>

  {msg && <p className="mt-3 text-sm text-gray-700 m-[20px]">{msg}</p>}

  <input className="border p-2 w-full mt-3"
   placeholder="Email" 
   onChange={(e) => setEmail(e.target.value)} />
  

  <input
    className="border p-3 w-full mt-4 rounded-md"
    placeholder="Enter OTP"
    onChange={(e) => setOtp(e.target.value)}
  />

  <input
    className="border p-3 w-full mt-4 rounded-md"
    placeholder="New Password"
    type="password"
    onChange={(e) => setNewPassword(e.target.value)}
  />

  <button
    className="mt-5 bg-pink-500 text-white p-3 w-full rounded-md"
    onClick={handleReset}
  >
    Reset Password
  </button>


</div>
</div>
  );
};

export default ResetPassword;



