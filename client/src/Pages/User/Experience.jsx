import { useState, useEffect } from "react";

function Experience() {
  useEffect(() => {
    document.title = "Experience | Deepak Bhanari Portfolio";
  }, []);

  return (
    <div className="h-screen  dark:bg-bg bg-primary w-screen flex items-center justify-center text-6xl text-custom-blue">
      Experience
    </div>
  );
}

export default Experience;
