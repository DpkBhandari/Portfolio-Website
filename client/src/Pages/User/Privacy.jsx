import { useEffect } from "react";

function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | Deepak Bhandari Portfolio";
  }, []);

  return (
    <main className="min-h-screen  dark:bg-bg bg-primary dark:bg-card text-gray-800 dark:text-gray-200 px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="mb-4">
          Welcome to my portfolio website. Your privacy is important to me. This
          Privacy Policy outlines how your data may be collected, used, and
          protected when you visit this website.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">
          Information Collection
        </h2>
        <p className="mb-4">
          I do not actively collect personal data unless you choose to contact
          me through email or other communication channels provided.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          This site may use basic cookies to enhance user experience. You can
          disable cookies in your browser settings if you prefer.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">
          Security
        </h2>
        <p className="mb-4">
          Reasonable measures are taken to protect any information you choose to
          share. However, please note that no method of online transmission is
          100% secure.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-2">Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact
          me at{" "}
          <a
            href="mailto:code2deepak@gmail.com"
            className="text-blue-500 hover:underline"
          >
            code2deepak@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export default Privacy;
