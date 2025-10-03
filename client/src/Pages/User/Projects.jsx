import { useState, useEffect } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import api from "../../api/axios.js";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [allSkills, setAllSkills] = useState([]);

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
      const res = await api.get("/api/projects?page=1&limit=20");
      if (res.status === 200 && res.data?.data?.docs) {
        const docs = res.data.data.docs;
        setProjects(docs);
        setFilteredProjects(docs);
        extractSkills(docs);
      } else {
        setError("Failed to fetch projects");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load projects. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const extractSkills = (projectsList) => {
    const skillsSet = new Set();
    projectsList.forEach((project) => {
      let arr = [];
      if (Array.isArray(project.skills)) arr = project.skills;
      else if (typeof project.skills === "string" && project.skills.length > 0)
        arr = project.skills.split(",");
      arr.forEach((skill) => skillsSet.add(skill.trim()));
    });
    setAllSkills(["All", ...Array.from(skillsSet)]);
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
        if (Array.isArray(project.skills)) skills = project.skills;
        else if (
          typeof project.skills === "string" &&
          project.skills.length > 0
        )
          skills = project.skills.split(",");
        return skills.some((skill) => skill.trim() === selectedSkill);
      });
    }

    setFilteredProjects(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-bg px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchProjects}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of web development projects showcasing various
            technologies and solutions
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white dark:bg-card rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div className="relative min-w-[200px]">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white outline-none appearance-none cursor-pointer"
              >
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;

// ---------------- ProjectCard ----------------
function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);
  const hasLiveLink = Boolean(project.liveLink);

  // Skills array
  let skillArr = [];
  if (Array.isArray(project.skills)) skillArr = project.skills;
  else if (typeof project.skills === "string" && project.skills.length > 0)
    skillArr = project.skills.split(",").map((s) => s.trim());

  return (
    <article className="bg-white dark:bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {project.previewImg && !imageError ? (
          <img
            src={project.previewImg} // Use the URL directly from backend
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-6xl">🖼️</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 line-clamp-1">
          {project.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
          {project.description || "No description provided"}
        </p>

        {skillArr.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
              Technologies:
            </p>
            <div className="flex flex-wrap gap-2">
              {skillArr.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
              {skillArr.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                  +{skillArr.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg ${
                hasLiveLink ? "flex-1" : "w-full"
              }`}
              title="View Source Code"
            >
              <FaGithub /> Code
            </a>
          )}
          {hasLiveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              title="View Live Demo"
            >
              <FaExternalLinkAlt /> Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
