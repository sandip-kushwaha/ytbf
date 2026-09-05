import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  FileText,
  TrendingUp,
  Star,
  Newspaper,
  ArrowUpRight,
  CheckCircle,
  RefreshCcw,
} from "lucide-react";

import { getDashboardStats, getMostViewedNews } from "../../api/dashboard.api";
import StatCard from "../../components/common/StatCard";
import Header from "../../components/common/Header";
import Button from "../../components/common/Button";

const Analysis = () => {
  const [stats, setStats] = useState(null);
  const [mostViewed, setMostViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Fetch Analytics
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, mostViewedResponse] = await Promise.all([
        getDashboardStats(),
        getMostViewedNews(5),
      ]);

      setStats(statsResponse.data);
      setMostViewed(mostViewedResponse.data || []);
    } catch (error) {
      console.error("Failed to load analytics:", error);

      setError(
        error.response?.data?.message || "Failed to load analytics data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const publishRate = useMemo(() => {
    if (!stats?.totalNews) return 0;

    return Math.round((stats.publishedNews / stats.totalNews) * 100);
  }, [stats]);

  const featuredRate = useMemo(() => {
    if (!stats?.totalNews) return 0;

    return Math.round((stats.featuredNews / stats.totalNews) * 100);
  }, [stats]);


  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Header
          title=" Analytics"
          description="Monitor your news performance and content statistics"
        />
        <Button
          onClick={fetchAnalytics}
          value={
            <>
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </>
          }
        />
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Views"
          value={loading ? "..." : (stats?.totalViews || 0).toLocaleString()}
          icon={<Eye size={22} />}
          description="Total article views"
          iconClass="bg-green-500/10 text-green-400"
          valueClass="text-green-400"
        />
        <StatCard
          title="Total News"
          value={loading ? "..." : stats?.totalNews || 0}
          icon={<FileText size={22} />}
          description="All news articles"
          iconClass="bg-blue-500/10 text-blue-400"
        />

        <StatCard
          title="Published News"
          value={loading ? "..." : (stats?.publishedNews ?? 0)}
          icon={<CheckCircle size={22} />}
          description={`${publishRate}% of total news`}
          iconClass="bg-green-500/10 text-green-400"
          valueClass="text-green-400"
        />

        <StatCard
          title="Featured News"
          value={loading ? "..." : (stats?.featuredNews ?? 0)}
          icon={<Star size={22} />}
          description={`${featuredRate}% of total news`}
          iconClass="bg-yellow-500/10 text-yellow-400"
          valueClass="text-yellow-400"
        />
      </div>

      {/* Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Publishing Overview */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Content Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current news publishing statistics
            </p>
          </div>

          <div className="space-y-6">
            {/* Published */}
            <ProgressRow
              title="Published News"
              value={loading ? "..." : (stats?.publishedNews || 0)}
              total={loading ? "..." : (stats?.totalNews || 0)}
              percentage={publishRate}
            />

            {/* Draft */}
            <ProgressRow
              title="Draft News"
              value={loading ? "..." : (stats?.draftNews || 0)}
              total={loading ? "..." : (stats?.totalNews || 0)}
              percentage={
                stats?.totalNews
                  ? Math.round((stats.draftNews / stats.totalNews) * 100)
                  : 0
              }
            />

            {/* Featured */}
            <ProgressRow
              title="Featured News"
              value={loading ? "..." : (stats?.featuredNews || 0)}
              total={loading ? "..." : (stats?.totalNews || 0)}
              percentage={featuredRate}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Quick Statistics
            </h2>

            <p className="mt-1 text-sm text-gray-500">Content summary</p>
          </div>

          <div className="space-y-4">
            <QuickStat
              icon={<FileText size={17} />}
              iconClass="bg-red-500/10 text-red-400"
              title="Draft Articles"
              value={stats?.draftNews || 0}
            />

            <QuickStat
              icon={<Star size={17} />}
              iconClass="bg-yellow-500/10 text-yellow-400"
              title="Featured Articles"
              value={stats?.featuredNews || 0}
            />

            <QuickStat
              icon={<Newspaper size={17} />}
              iconClass="bg-blue-500/10 text-blue-400"
              title="Categories"
              value={stats?.totalCategories || 0}
            />

            <QuickStat
              icon={<Eye size={17} />}
              iconClass="bg-green-500/10 text-green-400"
              title="Average Views"
              value={
                stats?.totalNews
                  ? Math.round(
                      stats.totalViews / stats.totalNews,
                    ).toLocaleString()
                  : 0
              }
            />
          </div>
        </div>
      </div>

      {/* Most Viewed */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Most Viewed News
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your most popular published articles
            </p>
          </div>

          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
            <TrendingUp size={20} />
          </div>
        </div>

        {mostViewed.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Newspaper size={40} className="mx-auto mb-3 text-gray-700" />

            <p className="text-gray-500">No published news available</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {mostViewed.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-gray-800/40"
              >
                {/* Rank */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-sm font-bold text-gray-400">
                  #{index + 1}
                </div>

                {/* Thumbnail */}
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center">
                      <Newspaper size={20} className="text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {item.category?.name || "Uncategorized"}
                  </p>
                </div>

                {/* Views */}
                <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-300">
                  <Eye size={16} className="text-blue-400" />

                  {item.views?.toLocaleString() || 0}
                </div>

                <ArrowUpRight
                  size={17}
                  className="hidden text-gray-600 sm:block"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ========= PROGRESS ROW ========= */
const ProgressRow = ({ title, value, total, percentage }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">{title}</span>

        <span className="text-sm text-gray-500">
          {value} / {total}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%`}}
        />
      </div>

      <p className="mt-1 text-right text-xs text-gray-600">{percentage}%</p>
    </div>
  );
};

/* ========== QUICK STAT ============== */
const QuickStat = ({ icon, iconClass, title, value }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-800/40 p-4">
      <div className="flex items-center gap-3">
        <div
          className={`grid h-9 w-9 place-items-center rounded-lg bg-gray-800 text-gray-400 ${iconClass}`}
        >
          {icon}
        </div>

        <span className="text-sm text-gray-400">{title}</span>
      </div>

      <span className="font-semibold text-white">{value}</span>
    </div>
  );
};

export default Analysis;
