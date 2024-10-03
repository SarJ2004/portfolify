import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://portfolify-4bjg.onrender.com/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.status);
      if (response.status === 200) {
        console.log(response);
        const userId = response.data.id; // Adjust according to your response
        navigate(`/${userId}/dashboard`);
      }
      console.log("User logged in:", response.data);
      // Handle successful login (e.g., redirect or store token)
    } catch (error) {
      setError("Invalid email or password");
      setTimeout(() => setError(""), 5000);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-black">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 pl-10"
              required
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 pl-10"
              required
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-200">
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
