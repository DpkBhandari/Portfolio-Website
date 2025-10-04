import { useState, useEffect, useCallback, memo } from "react";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import api from "../../api/axios.js";

// Constants
const INITIAL_HOME_DATA = {
  hero: {
    greeting: "Available for opportunities",
    mainHeading: "I do code and make content",
    highlightedText: "about it!",
    description:
      "I am a passionate BCA student skilled in web development, coding, and creating digital content.",
    highlightedRole: "BCA student",
    profileImg: "",
    profileAlt: "",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "JavaScript",
      "Tailwind CSS",
    ],
  },
  cta: {
    contactButton: "Get In Touch",
    resumeButton: "View Resume",
    resumeLink: "",
  },
  stats: {
    projects: "0",
    technologies: "0",
    years: "0",
  },
  education: {
    sectionTitle: "Education",
    sectionDescription:
      "My academic journey and qualifications that shaped my skills",
  },
};

// Helper functions
const statsToArray = (stats) => [
  { icon: "FaCode", label: stats.projects || "0" },
  { icon: "FaLaptopCode", label: stats.technologies || "0" },
  { icon: "FaGraduationCap", label: stats.years || "0" },
];

const statsToObject = (statsArray) => ({
  projects: statsArray[0]?.label || "0",
  technologies: statsArray[1]?.label || "0",
  years: statsArray[2]?.label || "0",
});

const normalizeHomeData = (apiData) => {
  if (!apiData) return INITIAL_HOME_DATA;

  return {
    ...apiData,
    stats:
      typeof apiData.stats === "object" && !Array.isArray(apiData.stats)
        ? statsToArray(apiData.stats)
        : apiData.stats,
    education: {
      sectionTitle:
        apiData.education?.sectionTitle ||
        INITIAL_HOME_DATA.education.sectionTitle,
      sectionDescription:
        apiData.education?.sectionDescription ||
        INITIAL_HOME_DATA.education.sectionDescription,
    },
    hero: {
      ...INITIAL_HOME_DATA.hero,
      ...apiData.hero,
    },
    cta: {
      ...INITIAL_HOME_DATA.cta,
      ...apiData.cta,
    },
  };
};

// Input Field Component
const InputField = memo(function InputField({
  label,
  value,
  onChange,
  isEditing,
  type = "text",
  multiline = false,
  required = false,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isEditing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={onChange}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-custom-orange focus:border-custom-orange transition-all resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-custom-orange focus:border-custom-orange transition-all"
          />
        )
      ) : (
        <p className="text-gray-700 dark:text-gray-300 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
          {value || <span className="text-gray-400 italic">Not set</span>}
        </p>
      )}
    </div>
  );
});

// Section Component
const Section = memo(function Section({ title, children }) {
  return (
    <section className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 mb-6 transition-all hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      {children}
    </section>
  );
});

// Loading Spinner
const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-bg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-custom-orange border-t-transparent mb-4" />
        <p className="text-lg font-semibold text-custom-orange dark:text-custom-orange">
          Loading...
        </p>
      </div>
    </div>
  );
});

// Main Component
export default function DynamicHomeManager() {
  const [homeData, setHomeData] = useState(INITIAL_HOME_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(INITIAL_HOME_DATA);
  const [backendId, setBackendId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/home/");
      const apiData = response.data?.data?.homePages?.[0];

      if (apiData) {
        const normalizedData = normalizeHomeData(apiData);
        setHomeData(normalizedData);
        setEditData(normalizedData);
        setBackendId(apiData._id);
      }
    } catch (err) {
      console.error("Failed to fetch home data:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load home page data. Please refresh the page."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Edit Home | Admin Dashboard";
    fetchHomeData();
  }, [fetchHomeData]);

  const updateField = useCallback((path, value) => {
    setEditData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }, []);

  const addTechStack = useCallback(() => {
    setEditData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        techStack: [...prev.hero.techStack, "New Technology"],
      },
    }));
  }, []);

  const removeTechStack = useCallback((index) => {
    setEditData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        techStack: prev.hero.techStack.filter((_, i) => i !== index),
      },
    }));
  }, []);

  const updateTechStack = useCallback((index, value) => {
    setEditData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        techStack: prev.hero.techStack.map((tech, i) =>
          i === index ? value : tech
        ),
      },
    }));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const payload = {
        ...editData,
        stats: Array.isArray(editData.stats)
          ? statsToObject(editData.stats)
          : editData.stats,
      };

      const response = backendId
        ? await api.put(`/api/home/${backendId}`, payload)
        : await api.post("/api/home/", payload);

      const savedData =
        response.data?.data?.home || response.data?.data?.homePages?.[0];

      if (savedData) {
        const normalizedData = normalizeHomeData(savedData);
        setHomeData(normalizedData);
        setEditData(normalizedData);
        setBackendId(savedData._id);
        setIsEditing(false);

        // Success notification
        const notification = document.createElement("div");
        notification.className =
          "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
        notification.textContent = "Changes saved successfully!";
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to save home data:", err);
      setError(
        err.response?.data?.message ||
          "Failed to save changes. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = useCallback(() => {
    setEditData(homeData);
    setIsEditing(false);
    setError(null);
  }, [homeData]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setError(null);
  }, []);

  const data = isEditing ? editData : homeData;

  if (loading && !isEditing) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-bg p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Edit Home Page
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Manage your portfolio homepage content
              </p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                  disabled={loading}
                >
                  <FaEdit /> Edit Content
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg ${
                      isSaving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSaving}
                  >
                    <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                    disabled={isSaving}
                  >
                    <FaTimes /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
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
              <button
                onClick={() => setError(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <Section title="Hero Section">
          <InputField
            label="Greeting"
            value={data.hero.greeting}
            onChange={(e) => updateField("hero.greeting", e.target.value)}
            isEditing={isEditing}
            required
          />
          <InputField
            label="Main Heading"
            value={data.hero.mainHeading}
            onChange={(e) => updateField("hero.mainHeading", e.target.value)}
            isEditing={isEditing}
            required
          />
          <InputField
            label="Highlighted Text"
            value={data.hero.highlightedText}
            onChange={(e) =>
              updateField("hero.highlightedText", e.target.value)
            }
            isEditing={isEditing}
          />
          <InputField
            label="Highlighted Role"
            value={data.hero.highlightedRole}
            onChange={(e) =>
              updateField("hero.highlightedRole", e.target.value)
            }
            isEditing={isEditing}
          />
          <InputField
            label="Description"
            value={data.hero.description}
            onChange={(e) => updateField("hero.description", e.target.value)}
            isEditing={isEditing}
            multiline
            required
          />
          <InputField
            label="Profile Image URL"
            value={data.hero.profileImg}
            onChange={(e) => updateField("hero.profileImg", e.target.value)}
            isEditing={isEditing}
            required
          />
          <InputField
            label="Profile Image Alt Text"
            value={data.hero.profileAlt}
            onChange={(e) => updateField("hero.profileAlt", e.target.value)}
            isEditing={isEditing}
          />

          {/* Tech Stack */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Tech Stack
            </label>
            <div className="space-y-2">
              {data.hero.techStack.map((tech, index) => (
                <div key={index} className="flex gap-2 items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateTechStack(index, e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-custom-orange focus:border-custom-orange transition-all"
                        placeholder="Technology name"
                      />
                      <button
                        onClick={() => removeTechStack(index)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Remove technology"
                      >
                        <FaTrash />
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 bg-custom-orange/10 dark:bg-custom-orange/20 text-custom-orange dark:text-custom-orange rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={addTechStack}
                  className="flex items-center gap-2 px-4 py-2 bg-custom-blue hover:bg-custom-blue/90 text-white rounded-lg transition-colors mt-3"
                >
                  <FaPlus /> Add Technology
                </button>
              )}
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section title="Call-to-Action">
          <InputField
            label="Contact Button Text"
            value={data.cta.contactButton}
            onChange={(e) => updateField("cta.contactButton", e.target.value)}
            isEditing={isEditing}
          />
          <InputField
            label="Resume Button Text"
            value={data.cta.resumeButton}
            onChange={(e) => updateField("cta.resumeButton", e.target.value)}
            isEditing={isEditing}
          />
          <InputField
            label="Resume Link URL"
            value={data.cta.resumeLink}
            onChange={(e) => updateField("cta.resumeLink", e.target.value)}
            isEditing={isEditing}
            required
          />
        </Section>

        {/* Stats Section */}
        <Section title="Statistics">
          {Array.isArray(data.stats) &&
            data.stats.map((stat, index) => (
              <InputField
                key={index}
                label={
                  stat.icon === "FaCode"
                    ? "Projects Count"
                    : stat.icon === "FaLaptopCode"
                    ? "Technologies Count"
                    : "Years of Experience"
                }
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...data.stats];
                  newStats[index] = {
                    ...newStats[index],
                    label: e.target.value,
                  };
                  updateField("stats", newStats);
                }}
                isEditing={isEditing}
              />
            ))}
        </Section>

        {/* Education Section */}
        <Section title="Education Section">
          <InputField
            label="Section Title"
            value={data.education.sectionTitle}
            onChange={(e) =>
              updateField("education.sectionTitle", e.target.value)
            }
            isEditing={isEditing}
          />
          <InputField
            label="Section Description"
            value={data.education.sectionDescription}
            onChange={(e) =>
              updateField("education.sectionDescription", e.target.value)
            }
            isEditing={isEditing}
            multiline
          />
        </Section>
      </div>

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
    </div>
  );
}
