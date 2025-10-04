import { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaUpload,
  FaGithub,
  FaExternalLinkAlt,
  FaPlus,
  FaTrash,
  FaImage,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import api from "../api/axios.js";

function CreateProject({ onClose, onProjectAdded }) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    repoLink: "",
    liveLink: "",
    skills: [],
    file: null,
  });
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    } else if (formData.projectName.length < 3) {
      newErrors.projectName = "Project name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (formData.repoLink && !validateUrl(formData.repoLink)) {
      newErrors.repoLink = "Please enter a valid URL";
    }

    if (formData.liveLink && !validateUrl(formData.liveLink)) {
      newErrors.liveLink = "Please enter a valid URL";
    }

    if (!formData.file) {
      newErrors.file = "Project preview image is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (file) => {
    if (!file) return;

    setErrors((prev) => ({ ...prev, file: null }));

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        file: "Please select a valid image file (JPEG, PNG, WebP, or GIF)",
      }));
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        file: "File size must be less than 5MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, file: null }));
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmedSkill = skillInput.trim();

    if (!trimmedSkill) return;

    if (formData.skills.includes(trimmedSkill)) {
      setErrors((prev) => ({ ...prev, skills: "This skill already exists" }));
      return;
    }

    if (formData.skills.length >= 10) {
      setErrors((prev) => ({ ...prev, skills: "Maximum 10 skills allowed" }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmedSkill],
    }));
    setSkillInput("");
    setErrors((prev) => ({ ...prev, skills: null }));
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = document.querySelector(".border-red-500");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const data = new FormData();
      data.append("name", formData.projectName.trim());
      data.append("description", formData.description.trim());
      data.append("githubLink", formData.repoLink.trim());
      data.append("liveLink", formData.liveLink.trim());
      data.append("skills", JSON.stringify(formData.skills));
      data.append("previewImg", formData.file, formData.file.name);

      const res = await api.post("/api/create-projects", data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (onProjectAdded) onProjectAdded(res.data.data.project);

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      console.error("Error creating project:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create project. Please try again.";

      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    if (loading) return;

    const hasData =
      formData.projectName ||
      formData.description ||
      formData.file ||
      formData.skills.length > 0;

    if (hasData) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmClose) return;
    }

    onClose();
  };

  return (
    <div className="w-full max-w-6xl max-h-[90vh] bg-white dark:bg-card rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="relative px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-card">
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Close"
        >
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Create New Project
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full mt-2" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Fill in the details below to add your project to the portfolio
        </p>
      </div>

      {/* Form Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <FaExclamationCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 dark:text-red-300">
                  Submission Error
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  {errors.submit}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-5">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g., Portfolio Website"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors
                    ${
                      errors.projectName
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-custom-orange dark:focus:border-custom-orange"
                    }
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-custom-orange/20`}
                />
                {errors.projectName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    {errors.projectName}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your project, its features, and technologies used..."
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none
                    ${
                      errors.description
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-custom-orange dark:focus:border-custom-orange"
                    }
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-custom-orange/20`}
                />
                <div className="mt-1 flex justify-between items-center">
                  {errors.description ? (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <FaExclamationCircle className="text-xs" />
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Min. 20 characters
                    </p>
                  )}
                  <span
                    className={`text-xs ${
                      formData.description.length < 20
                        ? "text-gray-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {formData.description.length} chars
                  </span>
                </div>
              </div>

              {/* GitHub Link */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaGithub className="inline mr-2" />
                  GitHub Repository
                </label>
                <input
                  type="url"
                  name="repoLink"
                  value={formData.repoLink}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors
                    ${
                      errors.repoLink
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-custom-orange dark:focus:border-custom-orange"
                    }
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-custom-orange/20`}
                />
                {errors.repoLink && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    {errors.repoLink}
                  </p>
                )}
              </div>

              {/* Live Link */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaExternalLinkAlt className="inline mr-2" />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  placeholder="https://your-project.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors
                    ${
                      errors.liveLink
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-custom-orange dark:focus:border-custom-orange"
                    }
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-custom-orange/20`}
                />
                {errors.liveLink && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    {errors.liveLink}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Technologies & Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
                    placeholder="e.g., React, Node.js"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none focus:border-custom-orange dark:focus:border-custom-orange focus:ring-2 focus:ring-custom-orange/20"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-5 py-3 bg-custom-blue hover:bg-custom-blue/90 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <FaPlus />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>

                {/* Skills Display */}
                {formData.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="group inline-flex items-center gap-2 px-3 py-1.5 bg-custom-orange/10 dark:bg-custom-orange/20 text-custom-orange dark:text-custom-orange rounded-full text-sm font-medium border border-custom-orange/30 hover:bg-custom-orange/20 dark:hover:bg-custom-orange/30 transition-colors"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-custom-orange hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {errors.skills && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    {errors.skills}
                  </p>
                )}

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {formData.skills.length}/10 skills added
                </p>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Preview Image <span className="text-red-500">*</span>
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="hidden"
              />

              <div
                onClick={handleBoxClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative group h-64 lg:h-full lg:min-h-[400px] rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
                  ${
                    isDragging
                      ? "border-custom-orange bg-custom-orange/10 dark:bg-custom-orange/20"
                      : errors.file
                      ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                      : "border-gray-300 dark:border-gray-600 hover:border-custom-orange dark:hover:border-custom-orange bg-gray-50 dark:bg-gray-800/50"
                  }`}
              >
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <FaImage className="text-4xl text-white" />
                      <p className="text-white font-semibold">
                        Click to change image
                      </p>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <FaTrash />
                        Remove Image
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-custom-orange/10 dark:bg-custom-orange/20 flex items-center justify-center">
                      <FaUpload className="text-2xl text-custom-orange" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {isDragging ? "Drop image here" : "Upload Project Image"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Drag and drop or click to browse
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      PNG, JPG, WebP or GIF (max 5MB)
                    </p>
                  </div>
                )}
              </div>

              {errors.file && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {errors.file}
                </p>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {loading && uploadProgress > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Uploading...
                </span>
                <span className="text-sm font-semibold text-custom-orange dark:text-custom-orange">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-custom-orange to-custom-blue transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Footer with Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FaCheckCircle />
                <span>Create Project</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
