import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaCode,
} from "react-icons/fa";
import api from "../../api/axios.js";

// Skeleton Loader
const ProjectSkeleton = memo(function ProjectSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
});

// Error Message Component
const ErrorMessage = memo(function ErrorMessage({ message, onRetry }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-bg p-6">
      <div className="max-w-md w-full">
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 shadow-lg"
          role="alert"
        >
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
                Error Loading Projects
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400">
                {message}
              </p>
            </div>
          </div>
          <button
            onClick={onRetry}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
});

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

// Empty State Component
const EmptyState = memo(function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <FaCode className="text-6xl text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        No projects found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
});

// Project Card Component
const ProjectCard = memo(function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);

  // Parse skills array
  let skillArr = [];
  if (Array.isArray(project.skills)) {
    skillArr = project.skills;
  } else if (typeof project.skills === "string" && project.skills.length > 0) {
    skillArr = project.skills.split(",").map((s) => s.trim());
  }

  return (
    <article className="group bg-white dark:bg-card rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30">
      {/* Preview Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {project.previewImg && !imageError ? (
          <img
            src={project.previewImg}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Title */}
        <h2 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-custom-orange dark:group-hover:text-custom-blue transition-colors duration-300 line-clamp-2">
          {project.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 flex-1">
          {project.description || "No description provided"}
        </p>

        {/* Skills Tags */}
        {skillArr.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skillArr.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-custom-orange/10 dark:bg-custom-orange/20 text-custom-orange dark:text-custom-orange text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {skillArr.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                +{skillArr.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors ${
                project.liveLink ? "flex-1" : "w-full"
              }`}
              title="View Source Code"
            >
              <FaGithub />
              Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-custom-blue hover:bg-custom-blue/90 text-white rounded-lg text-sm font-medium transition-colors"
              title="View Live Demo"
            >
              <FaExternalLinkAlt />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-custom-orange to-custom-blue transition-all duration-300" />
    </article>
  );
});

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    previewImg: PropTypes.string,
    githubLink: PropTypes.string,
    liveLink: PropTypes.string,
    skills: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }).isRequired,
};

// Main Component
function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [allSkills, setAllSkills] = useState(["All"]);

  useEffect(() => {
    document.title = "Projects | Deepak Bhandari Portfolio";
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchTerm, selectedSkill, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/projects?page=1&limit=50");

      if (res.status === 200 && res.data?.data?.docs) {
        const docs = res.data.data.docs;
        setProjects(docs);
        setFilteredProjects(docs);
        extractSkills(docs);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load projects. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const extractSkills = (projectsList) => {
    const skillsSet = new Set();
    projectsList.forEach((project) => {
      let arr = [];
      if (Array.isArray(project.skills)) {
        arr = project.skills;
      } else if (
        typeof project.skills === "string" &&
        project.skills.length > 0
      ) {
        arr = project.skills.split(",");
      }
      arr.forEach((skill) => skillsSet.add(skill.trim()));
    });
    setAllSkills(["All", ...Array.from(skillsSet).sort()]);
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSkill !== "All") {
      filtered = filtered.filter((project) => {
        let skills = [];
        if (Array.isArray(project.skills)) {
          skills = project.skills;
        } else if (
          typeof project.skills === "string" &&
          project.skills.length > 0
        ) {
          skills = project.skills.split(",");
        }
        return skills.some((skill) => skill.trim() === selectedSkill);
      });
    }

    setFilteredProjects(filtered);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-bg p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse mb-2" />
            <div className="h-1 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <ProjectSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProjects} />;
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Projects Portfolio
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full" />
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Explore my collection of web development projects
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-custom-orange focus:border-transparent dark:bg-gray-800 dark:text-white transition-all outline-none"
              />
            </div>

            {/* Filter */}
            <div className="relative min-w-[200px]">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full pl-12 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-custom-orange focus:border-transparent dark:bg-gray-800 dark:text-white outline-none appearance-none cursor-pointer transition-all"
              >
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <EmptyState />
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
