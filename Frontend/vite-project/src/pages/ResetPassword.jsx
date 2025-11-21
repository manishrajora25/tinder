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
    <div className="p-6">
      <h1 className="text-xl font-bold">Reset Password</h1>

      <input className="border p-2 w-full mt-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mt-3" placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
      <input className="border p-2 w-full mt-3" placeholder="New Password" type="password" onChange={(e) => setNewPassword(e.target.value)} />

      <button className="mt-4 bg-pink-500 text-white p-2 rounded" onClick={handleReset}>
        Reset Password
      </button>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
};

export default ResetPassword;
