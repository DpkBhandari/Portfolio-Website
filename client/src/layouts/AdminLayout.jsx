import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // Use your axios config

export default function AdminLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading state
  const navigate = useNavigate();

  // Check login status
  const checkLogin = async () => {
    try {
      const res = await api.get("/api/admin/profile");

      // Your backend returns status 200 on success
      if (res.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      // If error (401, 403, etc.), user is not logged in
      console.log("Not authenticated:", err.response?.status);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // Logout function
  const logoutAdmin = async () => {
    try {
      await api.post("/api/admin/logout");
      setIsLoggedIn(false);
      navigate("/"); // Redirects to home page after logout
    } catch (err) {
      console.error("Error while logging out:", err);
      alert("Error while logging out");
    }
  };

  // Show loader while checking authentication
  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-bg">
        <div className="text-xl dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-bg">
      <nav className="p-4 bg-gray-800 text-white flex gap-4 items-center shadow-md">
        {/* Show all navigation links regardless of login status */}
        <Link
          to="/admin/dashboard"
          className="hover:text-gray-300 transition-colors px-3 py-2 rounded hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/edithome"
          className="hover:text-gray-300 transition-colors px-3 py-2 rounded hover:bg-gray-700"
        >
          Edit Home
        </Link>
        <Link
          to="/admin/addproject"
          className="hover:text-gray-300 transition-colors px-3 py-2 rounded hover:bg-gray-700"
        >
          Add Project
        </Link>

        {/* Right side login/logout button */}
        <div className="ml-auto">
          {isLoggedIn ? (
            <button
              onClick={logoutAdmin}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/admin/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded inline-block transition-colors font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <main className="flex-1">
        <Outlet context={{ isLoggedIn, checkLogin }} />
      </main>
    </div>
  );
}
