import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import api from "../../api/axios.js";

// Skeleton Loader Component
const ExperienceSkeleton = memo(function ExperienceSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-card rounded-xl h-64 w-full border border-gray-100 dark:border-gray-800">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
});

// Error Message Component
const ErrorMessage = memo(function ErrorMessage({ message }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-bg p-6">
      <div className="max-w-md w-full">
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 shadow-lg"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
                Error Loading Experiences
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

// Empty State Component
const EmptyState = memo(function EmptyState() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-bg p-6">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Experiences Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for professional experiences.
        </p>
      </div>
    </div>
  );
});

// Experience Card Component
const ExperienceCard = memo(function ExperienceCard({ exp }) {
  const formatDate = (date) => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return "";
    }
  };

  return (
    <article
      className="group bg-white dark:bg-card rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 transition-all duration-300 p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30"
      aria-label={`Experience at ${exp.companyName}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-1 truncate group-hover:text-custom-orange dark:group-hover:text-custom-blue transition-colors duration-300">
            {exp.companyName}
          </h2>
          <p className="text-base font-medium text-custom-orange dark:text-custom-orange">
            {exp.role}
          </p>
        </div>
        {exp.logo && (
          <div className="flex-shrink-0">
            <img
              src={exp.logo}
              alt={`${exp.companyName} logo`}
              className="h-14 w-14 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-gray-800 group-hover:ring-custom-orange/50 group-hover:scale-105 transition-all duration-300"
              loading="lazy"
              width={56}
              height={56}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Date Badge */}
      <div className="flex items-center gap-2">
        <svg
          className="h-4 w-4 text-custom-blue dark:text-custom-blue flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <time
          className="text-sm text-gray-700 dark:text-gray-300 font-medium bg-custom-blue/10 dark:bg-custom-blue/20 px-3 py-1 rounded-md"
          dateTime={exp.startDate}
        >
          {formatDate(exp.startDate)} -{" "}
          {exp.endDate ? formatDate(exp.endDate) : "Present"}
        </time>
      </div>

      {/* Description */}
      {exp.description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 mt-auto">
          {exp.description}
        </p>
      )}

      {/* Hover Indicator */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-custom-orange to-custom-blue rounded-full transition-all duration-300" />
    </article>
  );
});

ExperienceCard.propTypes = {
  exp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    logo: PropTypes.string,
    role: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

// Main Component
function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/experience/", {
          signal: controller.signal,
        });

        if (isMounted) {
          if (res.status === 200 && Array.isArray(res.data?.data)) {
            setExperiences(res.data.data);
          } else {
            throw new Error("Invalid response format");
          }
        }
      } catch (err) {
        if (isMounted && err.name !== "CanceledError") {
          console.error("Error fetching experiences:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load experiences. Please try again later."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchExperiences();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-bg p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <ExperienceSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Empty State
  if (!experiences.length) {
    return <EmptyState />;
  }

  // Success State
  return (
    <div className="min-h-screen w-full bg-white dark:bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Professional Experience
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp._id} exp={exp} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExperienceList;
