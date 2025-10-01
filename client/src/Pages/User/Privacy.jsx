import { useEffect } from "react";
import {
  FaShieldAlt,
  FaCookie,
  FaLock,
  FaEnvelope,
  FaInfoCircle,
  FaUserSecret,
} from "react-icons/fa";

function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | Deepak Bhandari Portfolio";
    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = [
    {
      icon: <FaInfoCircle className="text-3xl sm:text-4xl" />,
      title: "Information Collection",
      content: (
        <>
          <p className="mb-3">
            I respect your privacy and am committed to protecting your personal
            information. This website does not actively collect personal data
            unless you choose to contact me through the provided communication
            channels.
          </p>
          <p className="mb-3">
            <strong>What I may collect:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
            <li>
              Information you voluntarily provide through contact forms or email
            </li>
            <li>
              Basic analytics data (page views, browser type, device
              information) through third-party services
            </li>
            <li>
              Technical information automatically collected by your browser
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaCookie className="text-3xl sm:text-4xl" />,
      title: "Cookies & Tracking",
      content: (
        <>
          <p className="mb-3">
            This website may use cookies and similar tracking technologies to
            enhance your browsing experience and analyze site traffic.
          </p>
          <p className="mb-3">
            <strong>Types of cookies used:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Essential Cookies:</strong> Required for basic site
              functionality (e.g., dark mode preferences)
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help understand how visitors
              interact with the website
            </li>
            <li>
              <strong>Performance Cookies:</strong> Improve site speed and user
              experience
            </li>
          </ul>
          <p className="mt-3 text-sm">
            You can control or disable cookies through your browser settings.
            Note that disabling cookies may affect site functionality.
          </p>
        </>
      ),
    },
    {
      icon: <FaUserSecret className="text-3xl sm:text-4xl" />,
      title: "Third-Party Services",
      content: (
        <>
          <p className="mb-3">
            This website may use third-party services that collect, monitor, and
            analyze data to improve functionality:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Google Analytics:</strong> Website traffic and usage
              analysis
            </li>
            <li>
              <strong>Email Services:</strong> Communication management
            </li>
            <li>
              <strong>Hosting Providers:</strong> Website hosting and content
              delivery
            </li>
          </ul>
          <p className="mt-3 text-sm">
            These services have their own privacy policies and terms of service.
            I am not responsible for the privacy practices of third-party
            services.
          </p>
        </>
      ),
    },
    {
      icon: <FaLock className="text-3xl sm:text-4xl" />,
      title: "Data Security",
      content: (
        <>
          <p className="mb-3">
            I take reasonable measures to protect any information you choose to
            share. Security measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
            <li>SSL/TLS encryption for secure data transmission</li>
            <li>Secure hosting infrastructure</li>
            <li>Regular security updates and monitoring</li>
            <li>Limited data collection and retention</li>
          </ul>
          <p className="mt-3 text-sm font-semibold text-amber-600 dark:text-amber-400">
            Important: While I implement security best practices, no method of
            online transmission or storage is 100% secure. Please use caution
            when sharing sensitive information online.
          </p>
        </>
      ),
    },
    {
      icon: <FaShieldAlt className="text-3xl sm:text-4xl" />,
      title: "Your Rights",
      content: (
        <>
          <p className="mb-3">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Access:</strong> Request information about data I may have
              collected
            </li>
            <li>
              <strong>Correction:</strong> Request corrections to any inaccurate
              information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
            </li>
            <li>
              <strong>Opt-out:</strong> Unsubscribe from communications at any
              time
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact me using the
            information provided below.
          </p>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 py-16 sm:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-gray-800 rounded-full mb-6 shadow-lg">
            <FaShieldAlt className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Your privacy matters. Learn how I protect and handle your
            information.
          </p>
          <p className="text-sm text-blue-200 mt-4">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <p className="text-base sm:text-lg leading-relaxed">
            Welcome to my portfolio website. Your privacy is important to me,
            and I am committed to protecting your personal information. This
            Privacy Policy outlines how data may be collected, used, and
            protected when you visit this website. By using this site, you agree
            to the terms described in this policy.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 
              hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="text-sm sm:text-base leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Changes to Policy */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl p-6 sm:p-8 mt-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-3">
            <FaInfoCircle className="text-amber-500" />
            Changes to This Policy
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
            I may update this Privacy Policy from time to time to reflect
            changes in practices or legal requirements. Any changes will be
            posted on this page with an updated "Last Modified" date. I
            encourage you to review this policy periodically to stay informed
            about how I protect your information.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl shadow-xl p-6 sm:p-8 mt-8 text-white">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FaEnvelope className="text-2xl sm:text-3xl" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Questions or Concerns?
              </h2>
              <p className="text-sm sm:text-base mb-4 text-blue-100">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or how your data is handled, please don't
                hesitate to reach out.
              </p>
              <a
                href="mailto:code2deepak@gmail.com"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 
                px-6 py-3 rounded-lg font-semibold transition-all duration-300 
                hover:shadow-lg transform hover:scale-105"
              >
                <FaEnvelope />
                <span>code2deepak@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This privacy policy is effective as of{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            and applies to all visitors and users of this website.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Privacy;
