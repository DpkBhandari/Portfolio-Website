import { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import api from "../api/axios.js";

export default function EditExperience({
  onClose,
  onExperienceAdded,
  onExperienceUpdated,
  editData,
}) {
  const isEditMode = Boolean(editData);

  // Form state with proper field mapping to API
  const [formData, setFormData] = useState({
    companyName: editData?.companyName || "",
    role: editData?.role || "",
    startDate: editData?.startDate
      ? new Date(editData.startDate).toISOString().split("T")[0]
      : "",
    endDate: editData?.endDate
      ? new Date(editData.endDate).toISOString().split("T")[0]
      : "",
    description: editData?.description || "",
    isCurrent: editData?.isCurrent || false,
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(editData?.logo || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const fileInputRef = useRef(null);

  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear field error when user starts typing
      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [fieldErrors]
  );

  // Handle checkbox for current position
  const handleCurrentChange = useCallback((e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      isCurrent: isChecked,
      endDate: isChecked ? "" : prev.endDate,
    }));
  }, []);

  // Handle file selection
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      return;
    }

    setLogo(file);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Remove logo
  const handleRemoveLogo = useCallback(() => {
    setLogo(null);
    setLogoPreview(editData?.logo || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [editData?.logo]);

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required";
    }

    if (!formData.role.trim()) {
      errors.role = "Role is required";
    }

    if (!formData.startDate) {
      errors.startDate = "Start date is required";
    }

    if (!formData.isCurrent && !formData.endDate) {
      errors.endDate = "End date is required for past positions";
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        errors.endDate = "End date must be after start date";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the errors above");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = new FormData();

      // Append form fields
      payload.append("companyName", formData.companyName.trim());
      payload.append("role", formData.role.trim());
      payload.append("startDate", formData.startDate);
      payload.append("isCurrent", formData.isCurrent);

      // Only append endDate if not current
      if (!formData.isCurrent && formData.endDate) {
        payload.append("endDate", formData.endDate);
      }

      if (formData.description.trim()) {
        payload.append("description", formData.description.trim());
      }

      // Append logo if new file selected
      if (logo) {
        payload.append("logo", logo);
      }

      let response;

      if (isEditMode) {
        // Update existing experience
        response = await api.put(`/api/experience/${editData._id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200 && response.data?.data) {
          onExperienceUpdated?.(response.data.data);
        }
      } else {
        // Create new experience
        response = await api.post("/api/experience", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201 && response.data?.data) {
          onExperienceAdded?.(response.data.data);
        }
      }
    } catch (err) {
      console.error("Error saving experience:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `Failed to ${isEditMode ? "update" : "create"} experience`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-card border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? "Edit Experience" : "Add New Experience"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {isEditMode
              ? "Update your professional experience details"
              : "Add a new position to your experience timeline"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Global Error */}
        {error && (
          <div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            role="alert"
          >
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
                <h3 className="font-semibold text-red-800 dark:text-red-300 text-sm">
                  Error
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g., Unified Mentor"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              fieldErrors.companyName
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-custom-orange focus:border-transparent transition-all`}
            disabled={loading}
            required
          />
          {fieldErrors.companyName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.companyName}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Role / Position <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Full Stack Developer Intern"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              fieldErrors.role
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-custom-orange focus:border-transparent transition-all`}
            disabled={loading}
            required
          />
          {fieldErrors.role && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.role}
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                fieldErrors.startDate
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-custom-orange focus:border-transparent transition-all`}
              disabled={loading}
              required
            />
            {fieldErrors.startDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.startDate}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              End Date{" "}
              {!formData.isCurrent && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={formData.isCurrent || loading}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                fieldErrors.endDate
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-custom-orange focus:border-transparent transition-all disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed`}
            />
            {fieldErrors.endDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* Current Position Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isCurrent"
            name="isCurrent"
            checked={formData.isCurrent}
            onChange={handleCurrentChange}
            disabled={loading}
            className="w-4 h-4 text-custom-orange bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-custom-orange transition-all"
          />
          <label
            htmlFor="isCurrent"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            I currently work here
          </label>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your role, responsibilities, and achievements..."
            rows={5}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-custom-orange focus:border-transparent transition-all resize-none"
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Optional: Add details about your work, projects, or achievements
          </p>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Logo
          </label>

          {logoPreview && (
            <div className="mb-3 flex items-center gap-4">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={handleRemoveLogo}
                disabled={loading}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-custom-orange/10 file:text-custom-orange hover:file:bg-custom-orange/20 file:cursor-pointer file:transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, or WebP. Max 5MB.
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2.5 bg-gradient-to-r from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>{isEditMode ? "Updating..." : "Creating..."}</span>
              </>
            ) : (
              <span>{isEditMode ? "Update Experience" : "Add Experience"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

EditExperience.propTypes = {
  onClose: PropTypes.func.isRequired,
  onExperienceAdded: PropTypes.func,
  onExperienceUpdated: PropTypes.func,
  editData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    companyName: PropTypes.string,
    role: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    description: PropTypes.string,
    isCurrent: PropTypes.bool,
    logo: PropTypes.string,
  }),
};
