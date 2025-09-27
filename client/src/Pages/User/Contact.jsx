import { useState, useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title = "Contact me | Deepak Bhanari Portfolio";
  }, []);
  return (
    <div className="h-screen dark:bg-bg bg-primary w-screen flex items-center justify-center text-6xl text-custom-blue">
      Contact
    </div>
  );
}

export default Contact;
