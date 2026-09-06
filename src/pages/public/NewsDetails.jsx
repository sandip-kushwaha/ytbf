import { useEffect, useState, useRef, } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Eye, Share2, Tag } from "lucide-react";
import { getNewsById, incrementNewsViews } from "../../api/news.api";
import NepaliDate from "nepali-date-converter";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getNewsById(id);

        setNews(response.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);

        setError(
          error.response?.data?.message || "Failed to load this news article.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  // Increment views
  const viewCounted = useRef(false);

  useEffect(() => {
    if (!id || viewCounted.current) return;

    viewCounted.current = true;

    const updateViews = async () => {
      try {
        const response = await incrementNewsViews(id);

        if (response.data) {
          setNews((prev) => ({
            ...prev,
            views: response.data.views,
          }));
        }
      } catch (error) {
        viewCounted.current = false;
        console.error("Failed to increment views:", error);
      }
    };

    updateViews();
  }, [id]);


//---Date
  const formatDate = (date) => {
    if (!date) return "—";

    return new NepaliDate(new Date(date)).format("D MMMM YYYY");
  };

  // Handle Share 
  const handleShare = async () => {
    const shareData = {
      title: news?.title,
      text: news?.summary,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("News link copied!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 h-5 w-40 animate-pulse rounded bg-gray-200" />

          <div className="mb-4 h-5 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mb-4 h-12 w-full animate-pulse rounded bg-gray-200" />

          <div className="mb-8 h-6 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="mb-8 aspect-video animate-pulse rounded-2xl bg-gray-200" />

          <div className="space-y-4">
            <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-[70vh] bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-red-50 text-red-500">
              <Eye size={28} />
            </div>

            <h1 className="mb-2 text-xl font-bold text-gray-900">
              News Not Found
            </h1>

            <p className="mb-6 text-sm leading-6 text-gray-500">
              {error || "The news article you're looking for doesn't exist."}
            </p>

            <button
              onClick={() => navigate("/news")}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={17} />
              Back to News
            </button>
          </div>
        </div>
      </div>
    );
  }

  const category = news.category;

  return (
    <div className="min-h-screen bg-white">
      <article>
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-hidden text-sm">
              <Link
                to="/"
                className="shrink-0 text-gray-500 transition hover:text-blue-600"
              >
                Home
              </Link>

              <span className="text-gray-300">/</span>

              <Link
                to="/news"
                className="shrink-0 text-gray-500 transition hover:text-blue-600"
              >
                News
              </Link>

              {category?.slug && (
                <>
                  <span className="text-gray-300">/</span>

                  <Link
                    to={`/categories/${category.slug}`}
                    className="truncate text-gray-500 transition hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
          {/* Category */}
          {category && (
            <Link
              to={`/categories/${category.slug}`}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-600 transition hover:bg-blue-100"
            >
              <Tag size={13} />
              {category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="max-w-5xl text-3xl font-black leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            {news.title}
          </h1>

          {/* Summary */}
          {news.summary && (
            <p className="mt-5 max-w-4xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              {news.summary}
            </p>
          )}

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-gray-100 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={17} className="text-blue-500" />

              <span>{formatDate(news.publishedAt || news.createdAt)}</span>
            </div>

            <div className="h-4 w-px bg-gray-200" />

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye size={17} className="text-blue-500" />

              <span>{Number(news.views || 0).toLocaleString()} views</span>
            </div>

            <button
              onClick={handleShare}
              className="ml-auto inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Thumbnail */}
        {news.thumbnail && (
          <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={news.thumbnail}
                alt={news.title}
                className="h-auto max-h-162.5 w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="prose prose-gray max-w-none">
            {news.content?.split("\n").map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <p
                    key={index}
                    className="mb-6 text-base leading-8 text-gray-700 sm:text-lg sm:leading-9"
                  >
                    {paragraph}
                  </p>
                ),
            )}
          </div>

          {/* Back */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to News
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetails;
