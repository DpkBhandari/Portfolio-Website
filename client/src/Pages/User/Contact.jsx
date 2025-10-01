import React, { useEffect } from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
function Contact() {
  useEffect(() => {
    document.title = "Contact me | Deepak Bhandari Portfolio";
  }, []);

  const contactInfo = {
    email: "code2deepak@gmail.com",
    linkedin: "https://x.com/MrDpkBhandari",
    github: "https://github.com/DpkBhandari",
    twitter: "https://twitter.com/deepak_bhandari",
    instagram: "https://www.instagram.com/mr.dpk.b/",
    whatsapp: "https://wa.me/917083540396",
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: contactInfo.linkedin,
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-blue-600",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: contactInfo.github,
      color: "bg-gray-800 hover:bg-gray-900",
      textColor: "text-gray-800",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: contactInfo.whatsapp,
      color: "bg-green-500 hover:bg-green-600",
      textColor: "text-green-500",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: contactInfo.instagram,
      color: "bg-pink-600 hover:bg-pink-700",
      textColor: "text-pink-600",
    },
    {
      name: "Twitter",
      icon: FaSquareXTwitter,
      url: contactInfo.twitter,
      color: "bg-black hover:bg-bg",
      textColor: "text-sky-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            {/* Heading Box */}
            <div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-card">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Get in touch with{" "}
                <span className="block mt-2 text-blue-600 dark:text-blue-400">
                  Deepak Bhandari
                </span>{" "}
                <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl">
                  for Web Development
                </span>
              </h1>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

            {/* Description Box */}
            <div className="flex-1 p-8 lg:p-12 flex items-center">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                I'm available for freelance projects, collaborations, or
                full-time opportunities in web development. Feel free to reach
                out via email, LinkedIn, or any other contact method listed
                below.
              </p>
            </div>
          </div>
        </section>

        {/* Email Section */}
        <section className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <FaEnvelope className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Send me an email
            </h2>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-block text-xl text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              {contactInfo.email}
            </a>
            <div className="mt-6">
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Compose Email
              </a>
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Connect on Social Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-current"
                  style={{ borderColor: "transparent" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`${social.color} p-4 rounded-lg transition-transform group-hover:scale-110`}
                    >
                      <IconComponent className="text-2xl text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${social.textColor} dark:text-white`}
                      >
                        {social.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connect with me
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 lg:p-12 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
              Whether you have a project in mind, need technical consultation,
              or just want to discuss web development trends, I'm always excited
              to connect with fellow developers, entrepreneurs, and businesses.
              Let's turn your ideas into reality!
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Get Started
              </a>
              <a
                href="/projects"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View My Work
              </a>
            </div>
          </div>
        </section>

        {/* Response Time Notice */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            I typically respond within 24-48 hours on business days.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Contact;
