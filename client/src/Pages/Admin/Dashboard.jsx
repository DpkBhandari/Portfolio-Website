import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHome, FaProjectDiagram, FaTools, FaChartLine } from "react-icons/fa";
import api from "../../api/axios.js";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard | Deepak Bhandari Portfolio";
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch projects count
      const projectsRes = await api.get("/api/projects?page=1&limit=1");

      // You can add skills endpoint if you have one
      // const skillsRes = await api.get("/api/skills?page=1&limit=1");

      setStats({
        totalProjects: projectsRes.data?.data?.totalDocs || 0,
        totalSkills: 0, // Update when skills endpoint is available
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const dashboardData = [
    {
      title: "Edit Home",
      desc: "Update homepage content, banners, and personal information.",
      actionButton: "Go to Home Editor",
      actionLink: "/admin/edithome",
      icon: FaHome,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Manage Projects",
      desc: "Add, edit, or remove portfolio projects and showcase your work.",
      actionButton: "Manage Projects",
      actionLink: "/admin/addproject",
      icon: FaProjectDiagram,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      stat: stats.totalProjects,
      statLabel: "Projects",
    },
    {
      title: "Manage Skills",
      desc: "Showcase your technical skills, tools, and areas of expertise.",
      actionButton: "Manage Skills",
      actionLink: "/admin/skills",
      icon: FaTools,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      stat: stats.totalSkills,
      statLabel: "Skills",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-gray-50 dark:bg-bg px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Manage your portfolio content from here.
          </p>
        </div>

        {/* Stats Overview */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-card rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Projects
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stats.totalProjects}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <FaProjectDiagram className="text-2xl text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Skills
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stats.totalSkills}
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                  <FaTools className="text-2xl text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Page Views
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    -
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <FaChartLine className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Last Updated
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    Today
                  </p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                  <FaHome className="text-2xl text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <div
                key={index}
                className="bg-white dark:bg-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Gradient Header */}
                <div
                  className={`bg-gradient-to-r ${item.color} p-6 text-white`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="text-3xl" />
                    {item.stat !== undefined && (
                      <div className="text-right">
                        <p className="text-3xl font-bold">{item.stat}</p>
                        <p className="text-sm opacity-90">{item.statLabel}</p>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {item.desc}
                  </p>

                  {/* Action Button */}
                  <Link to={item.actionLink}>
                    <button
                      className={`w-full bg-gradient-to-r ${item.color} ${item.hoverColor} text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg`}
                    >
                      {item.actionButton}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8 bg-white dark:bg-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/addproject"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaProjectDiagram className="text-xl text-green-600 dark:text-green-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                Add New Project
              </span>
            </Link>

            <Link
              to="/admin/edithome"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaHome className="text-xl text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                Edit Homepage
              </span>
            </Link>

            <Link
              to="/admin/skills"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaTools className="text-xl text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                Add New Skill
              </span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaChartLine className="text-xl text-orange-600 dark:text-orange-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                View Portfolio
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
