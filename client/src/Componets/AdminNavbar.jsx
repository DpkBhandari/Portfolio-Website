import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const adminLinks = [
  { title: "Dashboard", to: "/admin/dashboard" },
  { title: "Edit Home", to: "/admin/edithome" },
  { title: "Add Project", to: "/admin/addproject" },
  { title: "Add Experience", to: "/admin/edit-experience" },
];

export default function AdminNavbar({ logoutAdmin }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Load theme
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("theme"));
    if (saved !== null) setDarkMode(saved);
  }, []);

  // Apply theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-card shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink
            to="/admin/dashboard"
            className="text-xl font-bold text-gray-900 dark:text-white"
            onClick={handleLinkClick}
          >
            Admin Panel
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-custom-orange to-custom-blue text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaSun className="text-xl" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </button>

            {/* Logout */}
            <button
              onClick={logoutAdmin}
              className="ml-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors font-medium text-white"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaSun className="text-xl" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-custom-orange to-custom-blue text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
          <button
            onClick={logoutAdmin}
            className="w-full mt-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors font-medium text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
