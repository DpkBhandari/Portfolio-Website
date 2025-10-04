import AdminNavbar from "../Componets/AdminNavbar.jsx";
import api from "../api/axios";
import { Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export default function AdminLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  const checkLogin = async () => {
    try {
      const res = await api.get("/api/admin/profile");
      setIsLoggedIn(res.status === 200);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logoutAdmin = async () => {
    try {
      await api.post("/api/admin/logout");
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-bg">
        <div className="text-xl dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-bg">
      <AdminNavbar logoutAdmin={logoutAdmin} />
      <main className="flex-1 min-h-screen">
        <Outlet context={{ isLoggedIn, checkLogin }} />
      </main>
    </div>
  );
}
