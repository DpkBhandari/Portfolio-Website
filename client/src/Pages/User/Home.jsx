import { useState, useEffect, memo } from "react";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaFileDownload,
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
} from "react-icons/fa";
import api from "../../api/axios.js";
import { educationData } from "../../data/educationData.js";

// Loading Skeleton
const HeroSkeleton = memo(function HeroSkeleton() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 animate-pulse">
      <div className="h-56 w-56 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="space-y-4 w-full max-w-3xl">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
      </div>
    </div>
  );
});

// Education Card Component
const EducationCard = memo(function EducationCard({
  img,
  title,
  course,
  result,
  description,
  index,
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className="group bg-white dark:bg-card rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30 flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {!imageError ? (
          <img
            src={img}
            alt={`${title} Logo`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <FaGraduationCap className="text-5xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-custom-orange dark:group-hover:text-custom-blue transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-base font-medium text-custom-orange dark:text-custom-orange">
          {course}
        </p>
        <div className="inline-flex items-center gap-2 w-fit px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          {result}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 mt-auto">
          {description}
        </p>

        {/* Hover Indicator */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-custom-orange to-custom-blue rounded-full transition-all duration-300 mt-2" />
      </div>
    </article>
  );
});

// Main Component
function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Home | Deepak Bhandari Portfolio";
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/home/");

      if (res.status === 200 && res.data?.data?.homePages?.[0]) {
        setHomeData(res.data.data.homePages[0]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Failed to fetch home data:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load home page data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-white dark:bg-bg">
        <section className="py-20 px-6">
          <HeroSkeleton />
        </section>
      </main>
    );
  }

  if (error || !homeData) {
    return (
      <main className="min-h-screen w-full bg-white dark:bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <svg
                className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                  Failed to Load
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400">
                  {error || "Unable to load home page data"}
                </p>
              </div>
            </div>
            <button
              onClick={fetchHomeData}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white dark:bg-bg">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-custom-orange via-custom-blue to-custom-orange opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <div className="relative">
              <img
                src={homeData.hero.profileImg}
                alt={homeData.hero.profileAlt}
                className="h-56 w-56 md:h-64 md:w-64 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 items-center text-center max-w-4xl">
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-custom-blue/10 dark:bg-custom-blue/20 rounded-full text-custom-blue dark:text-custom-blue text-sm font-medium">
              <span className="w-2 h-2 bg-custom-blue rounded-full animate-pulse" />
              {homeData.hero.greeting}
            </div>

            {/* Main Heading */}
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight">
              {homeData.hero.mainHeading}{" "}
              <span className="bg-gradient-to-r from-custom-orange to-custom-blue bg-clip-text text-transparent">
                {homeData.hero.highlightedText}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              {homeData.hero.description}{" "}
              <strong className="text-custom-orange dark:text-custom-orange">
                {homeData.hero.highlightedRole}
              </strong>
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {homeData.hero.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-custom-orange/10 dark:bg-custom-orange/20 text-custom-orange dark:text-custom-orange text-sm font-medium rounded-full hover:bg-custom-orange/20 dark:hover:bg-custom-orange/30 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <NavLink
              to="/contact"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <FaEnvelope className="text-xl" />
              Contact Me
            </NavLink>

            <a
              href={homeData.cta.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-300"
            >
              <FaFileDownload className="text-xl" />
              Resume
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 w-full max-w-2xl mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <FaCode className="text-4xl text-custom-orange dark:text-custom-orange mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {homeData.stats.projects}
              </p>
            </div>
            <div className="text-center">
              <FaLaptopCode className="text-4xl text-custom-blue dark:text-custom-blue mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {homeData.stats.technologies}
              </p>
            </div>
            <div className="text-center">
              <FaGraduationCap className="text-4xl text-custom-orange dark:text-custom-orange mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {homeData.stats.years}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              Education
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full mx-auto" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center mt-4">
              Academic journey that shaped my skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationData.map((edu, index) => (
              <EducationCard key={index} {...edu} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
