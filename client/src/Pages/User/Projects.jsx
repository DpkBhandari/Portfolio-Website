import { useState, useEffect } from "react";

function Projects() {
  useEffect(() => {
    document.title = "Projects | Deepak Bhanari Portfolio";
  }, []);

  return (
    <div className="h-screen dark:bg-bg bg-primary  w-screen flex items-center justify-center text-6xl text-custom-blue">
      Projects
    </div>
  );
}

export default Projects;
