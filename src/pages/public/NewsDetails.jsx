import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Eye,
  Share2,
  Tag,
} from "lucide-react";

import { getPublicNewsBySlug, incrementNewsViews } from "../../api/news.api";

import formatDate from "./NepaliDate";

const NewsDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const viewCounted = useRef(false);

  // Fetch article and record view
  useEffect(() => {
    let isMounted = true;

    const fetchNewsAndCountView = async () => {
      try {
        setLoading(true);
        setError("");

        // Get news using slug
        const response = await getPublicNewsBySlug(slug);

        if (!isMounted) return;

        setNews(response.data);

        // Count view only once
        if (!viewCounted.current) {
          viewCounted.current = true;

          try {
            const viewResponse = await incrementNewsViews(response.data._id);

            if (isMounted && viewResponse.data?.views !== undefined) {
              setNews((prev) =>
                prev
                  ? {
                      ...prev,
                      views: viewResponse.data.views,
                    }
                  : prev,
              );
            }
          } catch (viewErr) {
            console.error("Failed to increment views:", viewErr);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch news:", err);

          setError(
            err.response?.data?.message || "Failed to load this news article.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      viewCounted.current = false;
      fetchNewsAndCountView();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);


  // Estimated Read Time
  const calculateReadTime = (content) => {
    if (!content) return "1 min read";

    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return `${minutes} min read`;
  };

  // Share
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

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2500);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 h-4 w-36 animate-pulse rounded-md bg-gray-200" />

          <div className="mb-4 h-6 w-24 animate-pulse rounded-full bg-gray-200" />

          <div className="mb-4 h-12 w-full animate-pulse rounded-xl bg-gray-200" />

          <div className="mb-8 h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />

          <div className="mb-8 aspect-video w-full animate-pulse rounded-2xl bg-gray-200" />

          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error || !news) {
    return (
      <div className="min-h-[70vh] bg-slate-50/50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xs">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600">
            <Eye size={26} />
          </div>

          <h1 className="mb-2 text-xl font-bold text-gray-900">
            Article Not Found
          </h1>

          <p className="mb-6 text-sm text-gray-500">
            {error ||
              "The requested article could not be located or may have been unpublished."}
          </p>

          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Back to All News
          </button>
        </div>
      </div>
    );
  }

  const category = news.category;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-gray-100 bg-slate-50/60"
      >
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-hidden text-xs font-medium text-gray-500">
            <Link to="/" className="shrink-0 transition hover:text-blue-600">
              Home
            </Link>

            <span className="text-gray-300">/</span>

            <Link
              to="/news"
              className="shrink-0 transition hover:text-blue-600"
            >
              News
            </Link>

            {category?.slug && (
              <>
                <span className="text-gray-300">/</span>

                <Link
                  to={`/categories/${category.slug}`}
                  className="truncate text-blue-600 hover:underline"
                >
                  {category.name}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          {category && (
            <Link
              to={`/categories/${category.slug}`}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition hover:bg-blue-100"
            >
              <Tag size={13} />
              {category.name}
            </Link>
          )}

          <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl lg:leading-tight">
            {news.title}
          </h1>

          {news.summary && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600 sm:text-xl">
              {news.summary}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={15} className="text-blue-600" />
                {formatDate(news.publishedAt || news.createdAt)}
              </span>

              <span className="h-3 w-px bg-gray-200" />

              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-blue-600" />
                {calculateReadTime(news.content)}
              </span>

              <span className="h-3 w-px bg-gray-200" />

              <span className="flex items-center gap-1.5">
                <Eye size={15} className="text-blue-600" />
                {Number(news.views || 0).toLocaleString()} Views
              </span>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {news.thumbnail && (
          <figure className="my-8 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-xs">
            <img
              src={news.thumbnail}
              alt={news.title}
              className="h-auto max-h-125 w-full object-cover"
            />
          </figure>
        )}

        {/* Content */}
        <section className="prose prose-gray max-w-none prose-p:text-gray-800 prose-p:leading-relaxed sm:prose-lg">
          {news.content?.split("\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();

            if (!trimmed) return null;

            return (
              <p
                key={index}
                className="mb-6 text-base leading-8 sm:text-lg sm:leading-8"
              >
                {trimmed}
              </p>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

            <Link
              to="/news"
              className="text-xs font-semibold text-blue-600 transition hover:underline"
            >
              Browse All News →
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default NewsDetails;
