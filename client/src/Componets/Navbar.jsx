import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const navLinks = [
  { title: "Home", to: "/" },
  { title: "Projects", to: "/projects" },
  { title: "Experience", to: "/experience" },
  { title: "Contact", to: "/contact" },
];

function Navbar() {
  const [darkMode, setDarkmode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("theme"));
    if (saved !== null) setDarkmode(saved);
  }, []);

  // Apply theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav
      role="navigation"
      className={`flex items-center shadow-inner shadow-2xl justify-between p-2 bg-white dark:bg-card`}
    >
      {/* Logo */}
      <NavLink to="/">
        <img
          src={Logo}
          alt="Logo"
          className="h-10 w-10 mx-2 dark:bg-white rounded-2xl"
        />
      </NavLink>

      {/* Mobile Menu Toggle */}
      <button
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-3xl mx-6 text-black dark:text-white"
      >
        {menuOpen ? <FaXmark /> : <FaBarsStaggered />}
      </button>

      {/* Navigation Links */}
      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:flex-row absolute mx-2 md:static top-16 right-0 bg-white dark:bg-card p-4 md:p-0`}
      >
        {navLinks.map((link) => (
          <li key={link.to} className="mb-2 md:mb-0 md:ml-4">
            <NavLink
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-black dark:text-white font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }
            >
              {link.title}
            </NavLink>
          </li>
        ))}

        {/* Dark Mode Button */}
        <button
          aria-label="Dark mode"
          className="mb-2 md:mb-0 md:ml-4 cursor-pointer flex items-center text-gray-600 dark:text-white"
          onClick={() => setDarkmode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark mode"}
        </button>
        <hr />
      </ul>
    </nav>
  );
}

export default Navbar;
