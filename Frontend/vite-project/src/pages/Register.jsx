// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "User",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/user/register", formData);
//       alert(res.data.message);
//       setFormData({ name: "", email: "", password: "", role: "User" });
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-pink-100">
//       <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
//         <h2 className="text-2xl font-bold text-center mb-4 text-pink-500">Register</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//           >
//             <option value="User">User</option>
//             <option value="admin">Admin</option>
//           </select>

//           <button
//             type="submit"
//             className="bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600 transition"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;





import React, { useState } from "react";
// import axios from "axios";
import Instance from "../AxiosConfig.js";
import "../App.css";
import { Link } from "react-router-dom";
import img from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      setLoading(true);
      const res = await Instance.post("/user/register", formData);
      setMessage("Registration Successful ✅");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      setFormData({ name: "", email: "", password: "", role: "User" });
      console.log("Registered user:", res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration Failed ❌");
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
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 px-3 py-2 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="px-3 text-sm text-pink-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : "REGISTER"}
          </button>

          {/* Message */}
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
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>



        <p className="text-xs text-center text-gray-600 mt-6">
          By signing up, you agree to our{" "}
          <span className="text-pink-600 font-semibold cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-pink-600 font-semibold cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
