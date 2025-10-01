import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | Deepak Bhandari Portfolio";
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-4 py-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 sm:w-48 sm:h-48 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 sm:w-48 sm:h-48 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Large 404 background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        text-[180px] sm:text-[250px] md:text-[350px] lg:text-[450px] xl:text-[550px] 
        font-black text-gray-300 dark:text-gray-800 opacity-20 select-none pointer-events-none 
        leading-none"
        aria-hidden="true"
      >
        404
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full space-y-6 sm:space-y-8">
        {/* 404 heading with gradient */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black 
          bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
          dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 
          bg-clip-text text-transparent animate-gradient"
        >
          404
        </h1>

        {/* Error message */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto px-4">
            Sorry, the page you're looking for doesn't exist or has been moved.
            Let's get you back on track!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            to="/"
            className="group relative flex items-center justify-center gap-3 
            px-6 sm:px-8 py-3 sm:py-4 
            bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
            dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700
            text-white font-semibold text-base sm:text-lg 
            rounded-xl shadow-lg hover:shadow-2xl 
            transform hover:scale-105 transition-all duration-300 
            focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <FaHome className="text-xl group-hover:rotate-12 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={handleGoBack}
            className="group relative flex items-center justify-center gap-3 
            px-6 sm:px-8 py-3 sm:py-4 
            bg-white dark:bg-gray-800 
            hover:bg-gray-50 dark:hover:bg-gray-700
            text-gray-800 dark:text-white font-semibold text-base sm:text-lg 
            rounded-xl shadow-lg hover:shadow-2xl 
            border-2 border-gray-300 dark:border-gray-600
            transform hover:scale-105 transition-all duration-300 
            focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful links */}
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 w-full max-w-md">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/projects"
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
              hover:text-blue-800 dark:hover:text-blue-300 
              hover:underline transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
              hover:text-blue-800 dark:hover:text-blue-300 
              hover:underline transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
              hover:text-blue-800 dark:hover:text-blue-300 
              hover:underline transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for animations - Add to your global styles or tailwind config */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        /* Ensure responsive text sizing */
        @media (max-width: 640px) {
          .text-responsive-404 {
            font-size: clamp(4rem, 15vw, 6rem);
          }
        }
      `}</style>
    </div>
  );
}

export default NotFoundPage;
