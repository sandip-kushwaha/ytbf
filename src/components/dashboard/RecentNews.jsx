import { Eye, Star } from "lucide-react";

const RecentNews = ({ news = [], loading }) => {


  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
        <div className="mb-5 h-6 w-32 animate-pulse rounded bg-gray-800" />

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex gap-4 rounded-xl bg-gray-800/50 p-3"
            >
              <div className="h-16 w-20 shrink-0 animate-pulse rounded-lg bg-gray-700" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-700" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent News</h2>

          <p className="mt-1 text-sm text-gray-500">Latest news articles</p>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No news available
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 rounded-xl border border-gray-800 bg-gray-800/30 p-3 transition hover:bg-gray-800/60"
            >
              <img
                src={item.thumbnail || "/placeholder-news.jpg"}
                alt={item.title}
                className="h-16 w-20 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {item.category?.name || "Uncategorized"}
                </p>

                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye size={13} />
                    {item.views || 0}
                  </span>

                  {item.isFeatured && (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star size={13} />
                      Featured
                    </span>
                  )}

                  <span
                    className={
                      item.status === "published"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentNews;
