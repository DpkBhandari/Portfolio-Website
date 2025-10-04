import { useState, useEffect, memo } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaCalendar,
} from "react-icons/fa";
import api from "../../api/axios.js";
import EditExperience from "../../Componets/EditExperience.jsx";

// Skeleton Loader
const ExperienceSkeleton = memo(function ExperienceSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
        <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  );
});

// Experience Card Component
const ExperienceCard = memo(function ExperienceCard({
  experience,
  onEdit,
  onDelete,
  isDeleting,
}) {
  const [imageError, setImageError] = useState(false);

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
    <article className="group bg-white dark:bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate group-hover:text-custom-orange transition-colors">
              {experience.companyName}
            </h3>
            <p className="text-base font-medium text-custom-orange dark:text-custom-orange">
              {experience.role}
            </p>
          </div>

          {experience.logo && !imageError && (
            <img
              src={experience.logo}
              alt={`${experience.companyName} logo`}
              className="h-14 w-14 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-gray-800 group-hover:ring-custom-orange/50 transition-all"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <FaCalendar className="text-custom-blue text-sm" />
          <time className="text-sm text-gray-700 dark:text-gray-300 font-medium bg-custom-blue/10 dark:bg-custom-blue/20 px-3 py-1 rounded-md">
            {formatDate(experience.startDate)} -{" "}
            {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
          </time>
        </div>

        {/* Description */}
        {experience.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
            {experience.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onEdit(experience)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            title="Edit Experience"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={() => onDelete(experience._id, experience.companyName)}
            disabled={isDeleting}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            title="Delete Experience"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <FaTrash />
                Delete
              </>
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
function ManageExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    document.title = "Manage Experiences | Admin Dashboard";
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/experience/");

      if (res.status === 200 && Array.isArray(res.data?.data)) {
        setExperiences(res.data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching experiences:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load experiences. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, companyName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${companyName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeleteLoading(id);

      const res = await api.delete(`/api/experience/${id}`);

      if (res.status === 200) {
        setExperiences((prev) => prev.filter((exp) => exp._id !== id));

        // Show success notification
        const notification = document.createElement("div");
        notification.className =
          "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
        notification.textContent = "Experience deleted successfully!";
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.message || "Failed to delete experience");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingExperience(null);
    setShowForm(true);
  };

  const handleExperienceAdded = (newExperience) => {
    setExperiences((prev) => [newExperience, ...prev]);
    setShowForm(false);
    setEditingExperience(null);

    // success toast
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
    notification.textContent = "Experience added successfully!";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // ✅ FIXED: update state with edited experience
  const handleExperienceUpdated = (updatedExperience) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp._id === updatedExperience._id ? updatedExperience : exp
      )
    );
    setShowForm(false);
    setEditingExperience(null);

    // success toast
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
    notification.textContent = "Experience updated successfully!";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExperience(null);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Experiences
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or delete your professional experiences
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
              <ExperienceSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add Experience Button */}
            <button
              onClick={handleAdd}
              className="h-64 bg-gradient-to-br from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white shadow-lg hover:shadow-xl flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300 group"
            >
              <FaPlus className="text-5xl mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">Add New Experience</span>
            </button>

            {/* Experience Cards */}
            {experiences.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <FaBuilding className="mx-auto text-6xl text-gray-400 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No experiences found. Add your first experience!
                </p>
              </div>
            ) : (
              experiences.map((experience) => (
                <ExperienceCard
                  key={experience._id}
                  experience={experience}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={deleteLoading === experience._id}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8">
            <EditExperience
              onClose={handleCloseForm}
              onExperienceAdded={handleExperienceAdded}
              onExperienceUpdated={handleExperienceUpdated}
              editData={editingExperience}
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

export default ManageExperiences;
