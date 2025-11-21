import React, { useState } from "react";
import Instance from "../AxiosConfig.js";
import "../App.css";
import img from "../img/logo.png";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (em) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(em).toLowerCase());

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isValidEmail(email)) {
      setMessage("Email Invelid ।");
      return;
    }
    if (password.length < 6) {
      setMessage("Password Min 6 curecters");
      return;
    }

    try {
      setLoading(true);
      // ✅ Important: include withCredentials for cookies
      const res = await Instance.post("/user/login",{
         email, 
         password,
         role: "user",  },
        { withCredentials: true } // 👈 cookie allow
      );

      setMessage("Login Successful ✅");
      console.log("Login response:", res.data);

      // ✅ if token also returned in res.data (in addition to cookie)
      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/; SameSite=Lax;`;
      }

      // ✅ redirect to profile after success
      setTimeout(() => {
        navigate("/PostPage");
      }, 1000);
    } catch (error) {
      const serverMsg =
        error?.response?.data?.message || error?.response?.data || error.message;
      setMessage(`Login Failed ❌ — ${serverMsg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400">
      <div className="">
        <img src={img} alt="" />
      </div>

      <div className="bg-white/90 rounded-2xl shadow-lg p-8 w-[90%] max-w-sm">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-2">Password</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-3 py-2 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="px-3 text-sm text-pink-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p
  onClick={() => navigate("/ForgotPassword")}
  className="text-right text-sm mt-1 text-pink-600 cursor-pointer hover:underline">
  FORGOT PASSWORD?
</p>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : "CONTINUE"}
          </button>

          {message && (
            <p className="text-center text-sm font-medium text-gray-700 break-words">
              {message}
            </p>
          )}
        </form>

        {/* 🔗 Register link added here */}
        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <p className="text-xs text-center text-gray-600 mt-6">
          By tapping Continue, you agree to our{" "}
          <span className="text-pink-600 font-semibold cursor-pointer">Terms</span>{" "}
          and{" "}
          <span className="text-pink-600 font-semibold cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
