import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { getCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", formData);

      await getCurrentUser();

      alert("Login Successful");

      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">

      {/* LEFT (hidden on mobile, improved spacing) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-10 xl:p-16">

        <div className="max-w-md">

          <h1 className="text-4xl xl:text-5xl font-bold mb-6">
            CivicAI
          </h1>

          <p className="text-blue-100 text-base xl:text-lg leading-7">
            Report civic issues with AI assistance, track progress, and help build a smarter city.
          </p>

          <div className="mt-8 space-y-4 text-sm xl:text-base">

            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              AI-powered issue categorization
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              Real-time issue tracking
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              Community leaderboard
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          <div className="text-center mb-6 sm:mb-8">

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Login to continue
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;