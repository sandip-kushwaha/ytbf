import { Link } from "react-router-dom";
import { ArrowRight, Radio } from "lucide-react";

const BreakingNews = ({ news = [] }) => {
  if (!news.length) return null;

  // Duplicate news so the ticker can loop smoothly
  const tickerNews = [...news.slice(0, 5), ...news.slice(0, 5)];

  return (
    <div className="sticky top-17 z-40 border-b border-gray-800 bg-gray-900/95 backdrop-blur-xl">
      <div className="mx-auto flex h-11 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

        {/* ================= BREAKING LABEL ================= */}
        <div className="flex shrink-0 items-center gap-2 border-r border-gray-800 pr-3 sm:pr-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>

          <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 sm:text-xs">
            {/* Breaking */}
            ताजा खबर
          </span>
        </div>

        {/* ================= NEWS TICKER ================= */}
        <div className="min-w-0 flex-1 overflow-hidden px-3 sm:px-4">
          <div className="breaking-ticker">
            <div className="breaking-track">
              {tickerNews.map((item, index) => (
                <Link
                  key={`${item._id}-${index}`}
                  to={`/news/${item.slug}`}
                  className="group flex shrink-0 items-center gap-2 pr-8 text-xs text-gray-400 transition hover:text-white sm:pr-10"
                >
                  <Radio
                    size={12}
                    className="shrink-0 text-gray-600 transition group-hover:text-red-400"
                  />

                  <span className="max-w-55 truncate">
                    {item.title}
                  </span>

                  {/* Separator */}
                  <span className="ml-2 text-gray-700">•</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ================= VIEW ALL ================= */}
        <Link
          to="/news"
          className="hidden shrink-0 items-center gap-1 border-l border-gray-800 pl-4 text-xs font-medium text-blue-400 transition hover:text-blue-300 sm:flex"
        >
          {/* All News */}
          सबै न्युज
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
};

export default BreakingNews;