import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Components
import ProtectedRoute from "./Componets/ProtectedRoute.jsx";

// User Pages
import Home from "./Pages/User/Home.jsx";
import Projects from "./Pages/User/Projects.jsx";
import Experience from "./Pages/User/Experience.jsx";
import Contact from "./Pages/User/Contact.jsx";
import NotFoundPage from "./Pages/User/NotFoundPage.jsx";
import Privacy from "./Pages/User/Privacy.jsx";

// Admin Pages
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import EditHome from "./Pages/Admin/EditHome.jsx";
import AddProjects from "./Pages/Admin/AddProjects.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import ChangePassword from "./Pages/Admin/ChangePassword.jsx";

import ManageExperiences from "./Pages/Admin/ManageExperiences.jsx";
function App() {
  return (
    <Routes>
      {/* User routes with UserLayout */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>

      {/* Admin routes with AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Public routes */}
        <Route path="login" element={<AdminLogin />} />
        <Route path="change-password" element={<ChangePassword />} />

        {/* Protected routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="edithome"
          element={
            <ProtectedRoute>
              <EditHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="addproject"
          element={
            <ProtectedRoute>
              <AddProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="edit-experience"
          element={
            <ProtectedRoute>
              <ManageExperiences />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
