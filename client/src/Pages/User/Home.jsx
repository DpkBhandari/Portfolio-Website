import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaFileDownload,
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
} from "react-icons/fa";

import { educationData } from "../../data/educationData.js";

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Home | Deepak Bhandari Portfolio";
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fetch home data from backend
    axios
      .get("http://localhost:5000/api/home/")
      .then((res) => {
        const apiData = res.data?.data?.homePages?.[0];
        if (apiData) setHomeData(apiData);
      })
      .catch((err) => {
        console.error("Failed to fetch home data", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main>
        <div className="flex justify-center items-center h-screen">
          <span className="text-xl font-medium">Loading...</span>
        </div>
      </main>
    );
  }

  if (!homeData) {
    return (
      <main>
        <div className="flex justify-center items-center h-screen">
          <span className="text-xl text-red-500 font-medium">
            Failed to load home page data.
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-8 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-32 h-32 sm:w-48 sm:h-48 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto flex flex-col items-center gap-12">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-75 blur-xl group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <div className="relative">
              <img
                src={homeData.hero.profileImg}
                alt={homeData.hero.profileAlt}
                className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full object-cover shadow-2xl 
                border-4 border-white dark:border-gray-800 
                transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse"></div>
            </div>
          </div>

          {/* Heading + About */}
          <div className="flex flex-col gap-6 items-center text-center max-w-4xl">
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              {homeData.hero.greeting}
            </div>

            {/* Main Heading */}
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight">
              {homeData.hero.mainHeading}{" "}
              <span className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                {homeData.hero.highlightedText}
              </span>
            </h1>

            {/* Description */}
            <p className="font-medium text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl px-4">
              {homeData.hero.description}{" "}
              <strong className="text-blue-600 dark:text-blue-400">
                {homeData.hero.highlightedRole}
              </strong>
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {homeData.hero.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto px-4">
            <NavLink
              to="/contact"
              className="group relative flex items-center justify-center gap-3 
              px-6 sm:px-8 py-3 sm:py-4 
              bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
              text-white font-semibold text-base sm:text-lg 
              rounded-full shadow-lg hover:shadow-2xl 
              transform hover:scale-105 transition-all duration-300 
              focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
              w-full sm:w-auto"
            >
              <FaEnvelope className="text-xl group-hover:rotate-12 transition-transform duration-300" />
              <span>Contact</span>
            </NavLink>

            <a
              href={homeData.cta.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 
              px-6 sm:px-8 py-3 sm:py-4 
              bg-white dark:bg-gray-800 
              hover:bg-gray-50 dark:hover:bg-gray-700
              text-gray-800 dark:text-white font-semibold text-base sm:text-lg 
              rounded-full shadow-lg hover:shadow-2xl 
              border-2 border-gray-300 dark:border-gray-600
              transform hover:scale-105 transition-all duration-300 
              focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600
              w-full sm:w-auto"
            >
              <FaFileDownload className="text-xl group-hover:translate-y-1 transition-transform duration-300" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-2xl mt-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                <FaCode className="inline" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {homeData.stats.projects}
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                <FaLaptopCode className="inline" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {homeData.stats.technologies}
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                <FaGraduationCap className="inline" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {homeData.stats.years}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <FaGraduationCap className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Education
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My academic journey and qualifications that shaped my skills
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {educationData.map((edu, index) => (
              <EducationCard key={index} {...edu} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </main>
  );
}

export default Home;

// EducationCard remains unchanged
function EducationCard({ img, title, course, result, description, index }) {
  return (
    <article
      className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg 
      hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 
      overflow-hidden border border-gray-200 dark:border-gray-700"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={`${title} Logo`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="relative p-6 space-y-3">
        <div className="text-center space-y-2">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">
            {course}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {result}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 text-justify">
          {description}
        </p>
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500"></div>
      </div>
    </article>
  );
}
