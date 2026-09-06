import { useEffect, useState } from "react";
import {
  CheckCircle,
  Eye,
  FileEdit,
  FileText,
  Folder,
  RefreshCw,
  Star,
} from "lucide-react";

import {
  getDashboardStats,
  getRecentNews,
  getMostViewedNews,
} from "../../api/dashboard.api";

import RecentNews from "../../components/dashboard/RecentNews";
import MostViewedNews from "../../components/dashboard/MostViewedNews";
import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import StatCard from "../../components/common/StatCard";

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
          getMostViewedNews(10),
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
        <Header
          title="Dashboard"
          description="Welcome back! Here's what's happening with your news."
        />

        <Button
          onClick={fetchDashboard}
          value={
            <>
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </>
          }
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total News"
          value={loading ? "..." : (stats?.totalNews ?? 0)}
          icon={<FileText size={22} />}
          iconClass="bg-blue-500/10 text-blue-400"
        />

        <StatCard
          title="Published News"
          value={loading ? "..." : (stats?.publishedNews ?? 0)}
          icon={<CheckCircle size={22} />}
          iconClass="bg-green-500/10 text-green-400"
          valueClass="text-green-400"
        />

        <StatCard
          title="Draft News"
          value={loading ? "..." : (stats?.draftNews ?? 0)}
          icon={<FileEdit size={22} />}
          iconClass="bg-red-500/10 text-red-400"
          valueClass="text-red-400"
        />

        <StatCard
          title="Categories"
          value={loading ? "..." : (stats?.totalCategories ?? 0)}
          icon={<Folder size={22} />}
          iconClass="bg-blue-500/10 text-blue-400"
        />

        <StatCard
          title="Total Views"
          value={loading ? "..." : (stats?.totalViews ?? 0)}
          icon={<Eye size={22} />}
          iconClass="bg-green-500/10 text-green-400"
          valueClass="text-green-400"
        />

        <StatCard
          title="Featured News"
          value={loading ? "..." : (stats?.featuredNews ?? 0)}
          icon={<Star size={22} />}
          iconClass="bg-yellow-500/10 text-yellow-400"
          valueClass="text-yellow-400"
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
