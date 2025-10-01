import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import api from "../../api/axios.js";

function AdminLogin() {
  const navigate = useNavigate();
  const { checkLogin, isLoggedIn } = useOutletContext();

  useEffect(() => {
    document.title = "Admin Login | Deepak Bhandari Portfolio";

    // Redirect if already logged in
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Login successful - refresh auth state
        await checkLogin();
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-bg p-4">
      <div className="flex flex-col gap-6 items-center justify-center bg-white dark:bg-card border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full inline-block mb-4">
            <FaUser className="text-3xl text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold dark:text-white mb-2">
            Admin Login
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-300 font-medium text-sm"
            >
              Email Address
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full border border-gray-300 dark:border-gray-600 pl-10 pr-4 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:text-white transition-all"
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300 font-medium text-sm"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full border border-gray-300 dark:border-gray-600 pl-10 pr-12 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:text-white transition-all"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`h-12 w-full mt-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center">
          <Link
            to="/admin/change-password"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Divider */}
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-card text-gray-500 dark:text-gray-400">
              Need help?
            </span>
          </div>
        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </main>
  );
}

export default AdminLogin;
