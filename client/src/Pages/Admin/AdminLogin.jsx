import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function AdminLogin() {
  useEffect(() => {
    document.title = "Admin login | Deepak Bhandari Portfolio";
  }, []);

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

      // Replace this with your real login API call
      console.log("Logging in with:", { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Login successful!");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 dark:bg-bg">
      <div className="flex flex-col gap-6 items-center justify-center bg-white dark:bg-card border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-lg w-80 md:w-96">
        <h1 className="text-2xl font-bold text-center dark:text-white">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm font-medium text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-300 font-medium"
            >
              Enter Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-card dark:text-white"
              autoComplete="email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300 font-medium"
            >
              Enter Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-card dark:text-white pr-10"
              autoComplete="current-password"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`h-12 w-full ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200"
            } text-white dark:text-black rounded-md font-semibold transition-colors`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;
