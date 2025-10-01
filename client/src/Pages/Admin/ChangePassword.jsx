import React, { useState, useEffect } from "react";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaLock,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";

function ChangePassword() {
  useEffect(() => {
    document.title = "Change Password | Deepak Bhandari Portfolio";
  }, []);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    if (
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "strong";
    }
    return "medium";
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(newPassword));
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!email || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/admin/change-password", {
        email,
        newPassword,
      });

      setSuccess(true);
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      // Auto redirect after 3 seconds
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStrengthWidth = () => {
    switch (passwordStrength) {
      case "weak":
        return "w-1/3";
      case "medium":
        return "w-2/3";
      case "strong":
        return "w-full";
      default:
        return "w-0";
    }
  };

  if (success) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100 dark:bg-bg">
        <div className="flex flex-col gap-6 items-center justify-center bg-white dark:bg-card border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-lg w-80 md:w-96 text-center">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
            <FaCheckCircle className="text-5xl text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold dark:text-white">
            Password Changed Successfully!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your password has been updated. Redirecting to login...
          </p>
          <Link
            to="/admin/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Go to Login Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-bg p-4">
      <div className="flex flex-col gap-6 items-center justify-center bg-white dark:bg-card border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full inline-block mb-4">
            <FaLock className="text-3xl text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold dark:text-white mb-2">
            Change Password
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email and new password to reset your account
          </p>
        </div>

        {error && (
          <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-gray-300 font-medium text-sm"
            >
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

          {/* New Password Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="newPassword"
              className="text-gray-700 dark:text-gray-300 font-medium text-sm"
            >
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 w-full border border-gray-300 dark:border-gray-600 pl-10 pr-12 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:text-white transition-all"
                placeholder="Enter new password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Password Strength:
                  </span>
                  <span
                    className={`font-medium capitalize ${
                      passwordStrength === "weak"
                        ? "text-red-600"
                        : passwordStrength === "medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {passwordStrength}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor()} ${getStrengthWidth()}`}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use 10+ characters with uppercase, numbers & symbols
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-gray-700 dark:text-gray-300 font-medium text-sm"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 w-full border border-gray-300 dark:border-gray-600 pl-10 pr-12 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:text-white transition-all"
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
            } text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Changing Password...
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="text-center">
          <Link
            to="/admin/login"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ChangePassword;
