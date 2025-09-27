import { useState, useEffect, useRef } from "react";

function AddProject({ onClose }) {
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

  const fileInputRef = useRef(null);

  // Handle file change & create preview
  const handleFileChange = (file) => {
    if (file) {
      setFormData({ ...formData, file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Open file dialog when clicking preview box
  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  // Drag & drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Cleanup preview URL when unmounted or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <section className="w-full bg-primary dark:bg-card text-black dark:text-primary rounded-2xl shadow-2xl p-6 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl font-bold text-red-500 hover:text-red-700"
      >
        X
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Project Details
      </h1>
      <p className="text-center text-secondary">
        Please provide the following project information
      </p>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Form */}
        <form className="flex-1 flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            name="preview"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />

          <div className="flex flex-col">
            <label htmlFor="projectName" className="font-semibold">
              Project Name:
            </label>
            <input
              type="text"
              name="projectName"
              placeholder="Enter project name "
              value={formData.projectName}
              onChange={handleChange}
              className="h-10 w-full p-2 border border-secondary rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="font-semibold">
              Project Description:
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project decription"
              className="w-full p-2 border border-secondary rounded resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="repoLink" className="font-semibold">
              Github Link:
            </label>
            <input
              type="text"
              name="repoLink"
              value={formData.repoLink}
              placeholder="Enter githun link"
              onChange={handleChange}
              className="h-10 w-full p-2 border border-secondary rounded"
            />

            <label htmlFor="liveLink" className="font-semibold">
              Live Link:
            </label>
            <input
              type="text"
              name="liveLink"
              value={formData.liveLink}
              placeholder="Enter live link "
              onChange={handleChange}
              className="h-10 w-full p-2 border border-secondary rounded"
            />
          </div>

          {/* Skills Section */}
          <div className="flex flex-col">
            <label htmlFor="skills" className="font-semibold">
              Add Skills:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
                placeholder="Type a skill and press Enter"
                className="h-10 w-full p-2 border border-secondary rounded-sm"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-md bg-red-100 dark:bg-bg text-blue-600 dark:text-blue-200 rounded-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="h-12 w-40 mt-4 self-start bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </form>

        {/* Preview (click or drag&drop) */}
        <div
          className="flex-1 shadow-2xl border-[1px] rounded overflow-hidden bg-gray-100 dark:bg-gray-800 h-64 lg:h-auto flex items-center justify-center cursor-pointer"
          onClick={handleBoxClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 dark:text-gray-400 text-center p-2">
              Drag & Drop or Click to Upload
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default AddProject;
