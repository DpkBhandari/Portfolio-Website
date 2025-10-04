import { NavLink } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { title: "Home", to: "/" },
    { title: "Projects", to: "/projects" },
    { title: "Experience", to: "/experience" },
    { title: "Contact", to: "/contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/DpkBhandari/",
      color: "hover:text-gray-900 dark:hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/deepak-bhandari-500467355/",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/mr.dpk.b/",
      color: "hover:text-pink-600 dark:hover:text-pink-400",
    },
  ];

  return (
    <footer className="bg-white dark:bg-card border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Deepak Bhandari
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Full Stack Web Developer passionate about creating modern,
              responsive, and user-friendly web applications.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-300`}
                    aria-label={social.name}
                  >
                    <IconComponent className="text-2xl" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-custom-orange dark:text-custom-orange font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:text-custom-orange dark:hover:text-custom-blue"
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <FaEnvelope className="text-custom-orange dark:text-custom-orange mt-1 flex-shrink-0" />
                <a
                  href="mailto:code2deepak@gmail.com"
                  className="hover:text-custom-orange dark:hover:text-custom-blue transition-colors duration-300"
                >
                  code2deepak@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-custom-orange dark:text-custom-orange mt-1 flex-shrink-0" />
                <span>
                  Pune - 411036
                  <br />
                  Maharashtra, India
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Let's Connect
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Available for freelance projects and collaborations.
            </p>
            <NavLink
              to="/contact"
              className="inline-block px-6 py-2 bg-gradient-to-r from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get in Touch
            </NavLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {currentYear} Deepak Bhandari. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <NavLink
                to="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-custom-orange dark:hover:text-custom-blue transition-colors duration-300"
              >
                Privacy Policy
              </NavLink>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                Made with <FaHeart className="text-red-500 animate-pulse" /> by
                Deepak
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-custom-orange via-custom-blue to-custom-orange" />
    </footer>
  );
}

export default Footer;
