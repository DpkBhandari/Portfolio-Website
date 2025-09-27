import { useState, useEffect } from "react";

function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found | Deepak Bhanari Portfolio";
  }, []);

  return (
    <div className="h-screen  dark:bg-bg bg-primary w-screen flex items-center justify-center text-6xl text-custom-blue">
      NotFoundPage
    </div>
  );
}

export default NotFoundPage;
