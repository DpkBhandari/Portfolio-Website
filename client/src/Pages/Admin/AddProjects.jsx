import { useState, useEffect, memo } from "react";
import { FaPlus, FaTrash, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import CreateProject from "../../Componets/CreateProject.jsx";
import api from "../../api/axios.js";

// Skeleton Loader
const ProjectSkeleton = memo(function ProjectSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
});

// Project Card Component
const ProjectCard = memo(function ProjectCard({
  project,
  onDelete,
  isDeleting,
}) {
  const [imageError, setImageError] = useState(false);

  // Parse skills
  let skillArr = [];
  if (Array.isArray(project.skills)) {
    skillArr = project.skills;
  } else if (typeof project.skills === "string" && project.skills.length > 0) {
    skillArr = project.skills.split(",").map((s) => s.trim());
  }

  return (
    <article className="group bg-white dark:bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30">
      {/* Image */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-custom-orange dark:group-hover:text-custom-blue transition-colors duration-300 line-clamp-1">
          {project.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-1">
          {project.description || "No description provided"}
        </p>

        {/* Skills Tags */}
        {skillArr.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skillArr.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-custom-orange/10 dark:bg-custom-orange/20 text-custom-orange dark:text-custom-orange text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {skillArr.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                +{skillArr.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
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
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-custom-blue hover:bg-custom-blue/90 text-white rounded-lg text-sm font-medium transition-colors"
              title="View Live Demo"
            >
              <FaExternalLinkAlt /> Demo
            </a>
          )}

          <button
            onClick={() => onDelete(project._id, project.name)}
            disabled={isDeleting}
            className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            title="Delete Project"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <FaTrash />
            )}
          </button>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-custom-orange to-custom-blue transition-all duration-300" />
    </article>
  );
});

// Main Component
function AddProjects() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    document.title = "Manage Projects | Admin Dashboard";
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/projects?page=1&limit=50");

      if (res.status === 200 && res.data?.data?.docs) {
        setProjects(res.data.data.docs);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
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

        // Success notification
        const notification = document.createElement("div");
        notification.className =
          "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
        notification.textContent = "Project deleted successfully!";
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.message || "Failed to delete project");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleProjectAdded = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowForm(false);

    // Success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
    notification.textContent = "Project added successfully!";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <main className="min-h-screen w-full bg-white dark:bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Projects
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or delete your portfolio projects
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
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
                <h3 className="font-semibold text-red-800 dark:text-red-300">
                  Error
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <ProjectSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add Project Button */}
            <button
              onClick={() => setShowForm(true)}
              className="h-64 bg-gradient-to-br from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white shadow-lg hover:shadow-xl flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300 group"
            >
              <FaPlus className="text-5xl mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">Add New Project</span>
            </button>

            {/* Project Cards */}
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8">
            <CreateProject
              onClose={() => setShowForm(false)}
              onProjectAdded={handleProjectAdded}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}

export default AddProjects;
