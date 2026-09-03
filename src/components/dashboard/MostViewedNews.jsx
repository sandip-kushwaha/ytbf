import { Eye } from "lucide-react";

const MostViewedNews = ({ news = [], loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-gray-800" />

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-800" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Most Viewed</h2>

        <p className="mt-1 text-sm text-gray-500">Popular news articles</p>
      </div>

      {news.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No news available
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={item._id} className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gray-800 text-sm font-bold text-gray-400">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {item.category?.name || "Uncategorized"}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1 text-xs text-gray-400">
                <Eye size={14} />
                {item.views || 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostViewedNews;
