import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import {
  getDashboardStats,
  getRecentNews,
  getMostViewedNews,
} from "../../api/dashboard.api";

import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import RecentNews from "../../components/dashboard/RecentNews";
import MostViewedNews from "../../components/dashboard/MostViewedNews";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [mostViewedNews, setMostViewedNews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, recentResponse, mostViewedResponse] =
        await Promise.all([
          getDashboardStats(),
          getRecentNews(5),
          getMostViewedNews(5),
        ]);

      setStats(statsResponse.data);
      setRecentNews(recentResponse.data || []);
      setMostViewedNews(mostViewedResponse.data || []);
    } catch (error) {
      console.error("Dashboard error:", error);

      setError(
        error.response?.data?.message || "Failed to load dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">

            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>

          <p className="mt-1 text-sm text-gray-400">
            Welcome back! Here's what's happening with your news.
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard
          title="Total News"
          value={loading ? "..." : (stats?.totalNews ?? 0)}
          type="news"
          description="All news articles"
        />

        <DashboardStatCard
          title="Published News"
          value={loading ? "..." : (stats?.publishedNews ?? 0)}
          type="published"
          description="Currently published"
        />

        <DashboardStatCard
          title="Draft News"
          value={loading ? "..." : (stats?.draftNews ?? 0)}
          type="draft"
          description="Unpublished articles"
        />

        <DashboardStatCard
          title="Categories"
          value={loading ? "..." : (stats?.totalCategories ?? 0)}
          type="categories"
          description="Total categories"
        />

        <DashboardStatCard
          title="Total Views"
          value={loading ? "..." : (stats?.totalViews ?? 0)}
          type="views"
          description="All-time article views"
        />

        <DashboardStatCard
          title="Featured News"
          value={loading ? "..." : (stats?.featuredNews ?? 0)}
          type="featured"
          description="Featured published articles"
        />
      </div>

      {/* News Sections */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentNews news={recentNews} loading={loading} />

        <MostViewedNews news={mostViewedNews} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
