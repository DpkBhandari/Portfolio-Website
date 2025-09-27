import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import AddProject from "../../Componets/AddProject.jsx";

function EditProjects() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary dark:bg-bg">
      {/* Plus icon */}
      {!showForm && (
        <div
          className="h-32 w-32 bg-red-500 dark:bg-card shadow-2xl flex items-center justify-center rounded-2xl cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="text-6xl dark:text-primary" />
        </div>
      )}

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="relative w-full max-w-5xl">
            <AddProject onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <EditProjects />
    </main>
  );
}

export default EditProjects;

function ProjectPreview() {
  return (
    <section className="flex flex-col h-auto w-auto  p-4 bg-red-500">
      <img src="" alt="Project preview " />

      <div>
        <h1>Project Name</h1>
        <p> Project Desription</p>
        <span>Skills</span>
      </div>
    </section>
  );
}
