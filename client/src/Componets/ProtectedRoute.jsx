import { Navigate, useOutletContext } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useOutletContext();

  // If still loading, show loader
  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-bg">
        <div className="text-xl dark:text-white">Loading...</div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in, render the protected component
  return children;
}
