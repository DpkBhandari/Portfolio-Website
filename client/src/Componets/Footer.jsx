import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  const navLinks = [
    { title: "Home", to: "/" },
    { title: "Projects", to: "/projects" },
    { title: "Experience", to: "/experience" },
    { title: "Contact", to: "/contact" },
  ];

  return (
    <footer className="bg-white dark:bg-card text-gray-800 dark:text-white py-8 px-4 md:px-16 shadow-inner shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h3 className="font-bold text-lg mb-2">Connect Me</h3>
          <p>
            <a
              href="mailto:code2deepak@gmail.com"
              className="hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Mail me
            </a>
          </p>
          <p>Pune - 411036</p>
          <p>Maharashtra, India</p>
        </div>

        {/* Social Handles */}
        <div>
          <h3 className="font-bold text-lg mb-2">Social Handles</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/DpkBhandari/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <FaGithub /> Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/deepak-bhandari-500467355/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <FaLinkedin /> Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/mr.dpk.b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <FaInstagram /> Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black dark:text-white font-bold"
                      : "text-gray-600 dark:text-gray-400 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright / Legal */}
        <div className="flex flex-col justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 md:mb-0">
            © 2025 Deepak Bhandari. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <NavLink
              to="/privacy"
              className="hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Privacy Policy
            </NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
