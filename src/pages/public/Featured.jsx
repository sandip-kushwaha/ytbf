import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
} from "lucide-react";

import { getFeaturedNews } from "../../api/news.api";

import NepaliDate from "nepali-date-converter";

// MAIN COMPONENT
const Featured = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalNews: 0,
    limit: 6,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // FETCH FEATURED NEWS
  useEffect(() => {
    let cancelled = false;

    const fetchFeaturedNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getFeaturedNews({
          page,
          limit: 6,
        });

        if (cancelled) return;

        setNews(response.data?.news || []);

        setPagination(
          response.data?.pagination || {
            currentPage: page,
            totalPages: 0,
            totalNews: 0,
            limit: 6,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        );
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to fetch featured news:", error);

        setError(
          error?.response?.data?.message || "Failed to load featured news.",
        );

        setNews([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchFeaturedNews();

    return () => {
      cancelled = true;
    };
  }, [page]);

  // URL SYNC
  useEffect(() => {
    const params = {};

    if (page > 1) {
      params.page = page;
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [page, setSearchParams]);

  // PREVIOUS
  const handlePrevious = () => {
    if (!pagination.hasPreviousPage) return;

    setPage((prev) => Math.max(prev - 1, 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // NEXT
  const handleNext = () => {
    if (!pagination.hasNextPage) return;

    setPage((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UI
  return (
    <main className="min-h-screen bg-white">
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

            <span className="truncate text-blue-600">Featured</span>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Star size={19} fill="currentColor" />
                </div>

                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Editor's Choice
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Featured News
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Explore the stories our editors have selected as the most
                important and noteworthy.
              </p>
            </div>

            {!loading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star size={17} className="text-blue-500" />

                <span>
                  {pagination.totalNews.toLocaleString()} featured articles
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ERROR */}
        {error && !loading && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-6 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-semibold text-red-700 underline underline-offset-4"
            >
              Try Again
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <FeaturedSkeleton />
        ) : news.length === 0 ? (
          /* EMPTY */
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Star size={28} className="text-gray-400" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No featured news found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              There are currently no featured articles available.
            </p>
          </div>
        ) : (
          /* NEWS */
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((article) => (
                <FeaturedCard key={article._id} article={article} />
              ))}
            </div>

            {/* PAGINATION */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
                <p className="text-sm text-gray-500">
                  Page{" "}
                  <span className="font-semibold text-gray-900">
                    {pagination.currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {pagination.totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={!pagination.hasPreviousPage}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!pagination.hasNextPage}
                    className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

// DATE
const formatDate = (date) => {
  if (!date) return "—";

  try {
    return new NepaliDate(new Date(date)).format("D MMMM YYYY");
  } catch {
    return "—";
  }
};

// IMAGE
const getImage = (thumbnail) => {
  return (
    thumbnail ||
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80"
  );
};

// LOADING SKELETON
const FeaturedSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="aspect-video animate-pulse bg-gray-200" />

          <div className="space-y-3 p-5">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

            <div className="h-5 w-full animate-pulse rounded bg-gray-200" />

            <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />

            <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />

            <div className="flex justify-between pt-2">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// FEATURED CARD
const FeaturedCard = ({ article }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}

      <Link
        to={`/news/${article.slug}`}
        className="relative block overflow-hidden"
      >
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img
            src={getImage(article.thumbnail)}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* FEATURED BADGE */}

        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
          <Star size={13} fill="currentColor" />
          Featured
        </div>
      </Link>

      {/* CONTENT */}

      <div className="p-5">
        {/* CATEGORY */}

        {article.category?.name && (
          <Link
            to={`/categories/${article.category.slug}`}
            className="mb-3 inline-block text-xs font-bold uppercase tracking-wide text-blue-600 hover:text-blue-700"
          >
            {article.category.name}
          </Link>
        )}

        {/* TITLE */}

        <Link to={`/news/${article.slug}`}>
          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-blue-600">
            {article.title}
          </h2>
        </Link>

        {/* SUMMARY */}

        {article.summary && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {article.summary}
          </p>
        )}

        {/* META */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays size={14} />

            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
            <Eye size={14} />

            <span>{article.views?.toLocaleString() || 0}</span>
          </div>
        </div>

        {/* READ MORE */}

        <Link
          to={`/news/${article.slug}`}
          className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:gap-2"
        >
          Read Article
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
};

export default Featured;
