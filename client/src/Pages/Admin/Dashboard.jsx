import { Link } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";
import api from "../../api/axios.js";

// Stat Card Component
const StatCard = memo(function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
});

// Management Card Component
const ManagementCard = memo(function ManagementCard({
  title,
  description,
  link,
  icon: Icon,
  color,
  stat,
  statLabel,
}) {
  return (
    <article className="group bg-white dark:bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30">
      {/* Icon Header */}
      <div className={`${color} p-6 flex items-center justify-between`}>
        <Icon className="text-4xl text-white" />
        {stat !== undefined && (
          <div className="text-right text-white">
            <p className="text-3xl font-bold">{stat}</p>
            <p className="text-sm opacity-90">{statLabel}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-custom-orange dark:group-hover:text-custom-blue transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>

        <Link
          to={link}
          className="block w-full text-center px-6 py-3 bg-gradient-to-r from-custom-orange to-custom-blue hover:from-custom-orange/90 hover:to-custom-blue/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Manage
        </Link>
      </div>

      {/* Hover Indicator */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-custom-orange to-custom-blue transition-all duration-300" />
    </article>
  );
});

// Quick Action Component
const QuickAction = memo(function QuickAction({
  to,
  icon: Icon,
  label,
  color,
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 p-4 bg-white dark:bg-card rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 hover:border-custom-orange/30 dark:hover:border-custom-orange/30 transition-all duration-300"
    >
      <div
        className={`${color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="text-xl text-white" />
      </div>
      <span className="font-medium text-gray-900 dark:text-white group-hover:text-custom-orange dark:group-hover:text-custom-blue transition-colors">
        {label}
      </span>
    </Link>
  );
});

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalExperiences: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard | Deepak Bhandari Portfolio";
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [projectsRes, experiencesRes] = await Promise.all([
        api.get("/api/projects?page=1&limit=1"),
        api.get("/api/experience/"),
      ]);

      setStats({
        totalProjects: projectsRes.data?.data?.totalDocs || 0,
        totalExperiences: Array.isArray(experiencesRes.data?.data)
          ? experiencesRes.data.data.length
          : 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const managementCards = [
    {
      title: "Home Page",
      description:
        "Update homepage content, hero section, and personal information",
      link: "/admin/edithome",
      icon: FaHome,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Projects",
      description:
        "Add, edit, or remove portfolio projects and showcase your work",
      link: "/admin/addproject",
      icon: FaProjectDiagram,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      stat: stats.totalProjects,
      statLabel: "Projects",
    },
    {
      title: "Experience",
      description: "Manage your professional experience and work history",
      link: "/admin/edit-experience",
      icon: FaBriefcase,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      stat: stats.totalExperiences,
      statLabel: "Experiences",
    },
  ];

  const quickActions = [
    {
      to: "/admin/addproject",
      icon: FaProjectDiagram,
      label: "Add Project",
      color: "bg-green-600",
    },
    {
      to: "/admin/edithome",
      icon: FaHome,
      label: "Edit Homepage",
      color: "bg-blue-600",
    },
    {
      to: "/admin/edit-experience",
      icon: FaBriefcase,
      label: "Add Experience",
      color: "bg-purple-600",
    },
    {
      to: "/",
      icon: FaChartLine,
      label: "View Portfolio",
      color: "bg-custom-orange",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-white dark:bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-custom-orange to-custom-blue rounded-full mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Manage your portfolio content from here
          </p>
        </div>

        {/* Stats Overview */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-card rounded-xl p-6 animate-pulse border border-gray-100 dark:border-gray-800"
              >
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={FaProjectDiagram}
              label="Total Projects"
              value={stats.totalProjects}
              color="bg-green-500"
            />
            <StatCard
              icon={FaBriefcase}
              label="Total Experiences"
              value={stats.totalExperiences}
              color="bg-purple-500"
            />
            <StatCard
              icon={FaChartLine}
              label="Page Views"
              value="-"
              color="bg-blue-500"
            />
            <StatCard
              icon={FaHome}
              label="Last Updated"
              value="Today"
              color="bg-custom-orange"
            />
          </div>
        )}

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {managementCards.map((card, index) => (
            <ManagementCard key={index} {...card} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-card rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
