import React from "react";
import { Routes, Route } from "react-router-dom";

// Components

import Navbar from "./Componets/Navbar.jsx";
import Footer from "./Componets/Footer.jsx";

// User Routes Pages

import Home from "./Pages/User/Home.jsx";
import Projects from "./Pages/User/Projects.jsx";
import Experience from "./Pages/User/Experience.jsx";
import Contact from "./Pages/User/Contact.jsx";
import NotFoundPage from "./Pages/User/NotFoundPage.jsx";
import Privacy from "./Pages/User/Privacy.jsx";

// Admin Routes Pages

import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import EditHome from "./Pages/Admin/EditHome.jsx";
import EditProjects from "./Pages/Admin/EditProjects.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/experience" element={<Experience />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/login" element={<AdminLogin />}></Route>
          <Route path="/edithome" element={<EditHome />}></Route>
          <Route path="/editproject" element={<EditProjects />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
