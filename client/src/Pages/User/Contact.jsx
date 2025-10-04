import { useEffect, memo } from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

// Social Link Card Component
const SocialCard = memo(function SocialCard({ social }) {
  const IconComponent = social.icon;

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-card rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 p-6 transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30 flex items-center gap-4"
    >
      <div
        className={`${social.color} p-4 rounded-lg transition-transform group-hover:scale-110 flex-shrink-0`}
      >
        <IconComponent className="text-2xl text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-custom-orange dark:group-hover:text-custom-blue transition-colors duration-300 truncate">
          {social.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Connect with me
        </p>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-custom-orange to-custom-blue transition-all duration-300 rounded-b-xl" />
    </a>
  );
});

// Main Component
function Contact() {
  useEffect(() => {
    document.title = "Contact | Deepak Bhandari Portfolio";
  }, []);

  const contactInfo = {
    email: "code2deepak@gmail.com",
    linkedin: "https://www.linkedin.com/in/deepak-bhandari-500467355/",
    github: "https://github.com/DpkBhandari",
    twitter: "https://x.com/MrDpkBhandari",
    instagram: "https://www.instagram.com/mr.dpk.b/",
    whatsapp: "https://wa.me/917083540396",
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: contactInfo.linkedin,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: contactInfo.github,
      color:
        "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: contactInfo.whatsapp,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: contactInfo.instagram,
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      name: "Twitter",
      icon: FaSquareXTwitter,
      url: contactInfo.twitter,
      color: "bg-sky-500 hover:bg-sky-600",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-white dark:bg-bg py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Get In Touch
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Available for freelance projects, collaborations, or full-time
            opportunities in web development
          </p>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-custom-orange to-custom-blue rounded-xl shadow-xl p-8 md:p-12 text-white mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              Whether you have a project in mind, need technical consultation,
              or just want to discuss web development trends, I'm always excited
              to connect with fellow developers, entrepreneurs, and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-custom-orange hover:bg-gray-100 font-semibold rounded-lg transition-colors shadow-lg"
              >
                <FaEnvelope />
                Send Email
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-custom-blue font-semibold rounded-lg transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-8 md:p-12 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-custom-orange/10 dark:bg-custom-orange/20 rounded-full mb-6">
              <FaEnvelope className="text-3xl text-custom-orange" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Primary Email
            </h2>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-block text-xl text-custom-orange hover:text-custom-orange/80 dark:text-custom-orange dark:hover:text-custom-orange/80 font-semibold transition-colors mb-6"
            >
              {contactInfo.email}
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              I typically respond within 24-48 hours on business days
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-custom-orange hover:bg-custom-orange/90 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <FaEnvelope />
              Compose Email
            </a>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Connect on Social Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <SocialCard key={index} social={social} />
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 text-center">
            <div className="text-3xl text-custom-orange dark:text-custom-orange mb-3">
              🚀
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Quick Response
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fast turnaround on all inquiries
            </p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 text-center">
            <div className="text-3xl text-custom-blue dark:text-custom-blue mb-3">
              💼
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Professional
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quality work and clear communication
            </p>
          </div>

          <div className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 text-center">
            <div className="text-3xl text-custom-orange dark:text-custom-orange mb-3">
              🤝
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Collaborative
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Open to feedback and new ideas
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
