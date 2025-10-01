import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaGithub,
  FaExternalLinkAlt,
  FaEdit,
} from "react-icons/fa";
import CreateProject from "../../Componets/CreateProject.jsx";
import api from "../../api/axios.js";

function AddProjects() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch projects on load
  useEffect(() => {
    document.title = "Manage Projects | Admin Dashboard";
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/projects?page=1&limit=20");

      if (res.status === 200 && res.data?.data?.docs) {
        setProjects(res.data.data.docs);
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

  const handleDelete = async (id, projectName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${projectName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeleteLoading(id);

      const res = await api.delete(`/api/projects/${id}`);

      if (res.status === 200) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        alert("Project deleted successfully!");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete project");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleProjectAdded = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowForm(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or delete your portfolio projects
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Add Project Button */}
            <button
              onClick={() => setShowForm(true)}
              className="h-64 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-200 group"
            >
              <FaPlus className="text-5xl mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">Add New Project</span>
            </button>

            {/* Project Cards */}
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No projects found. Create your first project!
                </p>
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={handleDelete}
                  isDeleting={deleteLoading === project._id}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8">
            <CreateProject
              onClose={() => setShowForm(false)}
              onProjectAdded={handleProjectAdded}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default AddProjects;

// Reusable Project Card
function ProjectCard({ project, onDelete, isDeleting }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {project.previewImg && !imageError ? (
          <img
            src={project.previewImg}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">🖼️</span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {project.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-1">
          {project.description || "No description provided"}
        </p>

        {/* Skills Tags */}
        {project.skills && (
          <div className="flex flex-wrap gap-1 mb-3">
            {(Array.isArray(project.skills)
              ? project.skills
              : project.skills.split(",")
            )
              .slice(0, 3)
              .map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            {(Array.isArray(project.skills)
              ? project.skills
              : project.skills.split(",")
            ).length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                +
                {(Array.isArray(project.skills)
                  ? project.skills
                  : project.skills.split(",")
                ).length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition-colors"
              title="View on GitHub"
            >
              <FaGithub /> Code
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              title="View Live Demo"
            >
              <FaExternalLinkAlt /> Live
            </a>
          )}

          <button
            onClick={() => onDelete(project._id, project.name)}
            disabled={isDeleting}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            title="Delete Project"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            ) : (
              <FaTrash />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
