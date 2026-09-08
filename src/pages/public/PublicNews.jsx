import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Newspaper,
} from "lucide-react";

import { getPublishedNews } from "../../api/news.api";

import formatDate from "./NepaliDate";

const PublicNews = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // INITIAL URL VALUES
  const initialPage = Math.max(Number(searchParams.get("page")) || 1, 1);

  // STATE
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [page, setPage] = useState(initialPage);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalNews: 0,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const limit = 10;

  // FETCH NEWS
  useEffect(() => {
    let cancelled = false;

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublishedNews({
          page,
          limit,
        });

        if (cancelled) return;

        const newsData = response.data?.news || [];

        const paginationData = response.data?.pagination;

        setNews(newsData);

        if (paginationData) {
          setPagination(paginationData);
        } else {
          setPagination({
            currentPage: page,
            totalPages: 1,
            totalNews: newsData.length,
            limit,
            hasNextPage: false,
            hasPreviousPage: page > 1,
          });
        }
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to load published news:", error);

        setError(error.response?.data?.message || "Failed to load news");

        setNews([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      cancelled = true;
    };
  }, [page]);

  // UPDATE URL
  useEffect(() => {
    const params = {};

    if (page > 1) {
      params.page = page;
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [page, setSearchParams]);

  // RENDER
  return (
    <div className="min-h-screen bg-white text-gray-900">
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

            <span className="truncate text-blue-600">News</span>
          </div>
        </div>
      </nav>

      {/* ========= PAGE HEADER ========= */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* TITLE */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <Newspaper size={17} />

                <span>Latest News
                  
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Latest Stories
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Stay updated with the latest news, stories, and important
                events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================== NEWS CONTENT =============== */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ERROR */}

        {error ? (
          <ErrorState
            message={error}
            onRetry={() => window.location.reload()}
          />
        ) : (
          <>
            {/* RESULT HEADER */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Latest News
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {loading
                    ? "Updating results..."
                    : `Showing ${news.length} of ${
                        pagination.totalNews || 0
                      } articles`}
                </p>
              </div>
            </div>

            {/* ============ LOADING FIRST PAGE =========== */}
            {loading && news.length === 0 ? (
              <NewsGridSkeleton />
            ) : news.length === 0 ? (
              /* ========== EMPTY ========== */
              <EmptyState />
            ) : (
              /* ============= NEWS GRID ========== */
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {news.map((item) => (
                    <PublicNewsCard key={item.slug} news={item} />
                  ))}
                </div>

                {/* PAGINATION */}

                {pagination.totalPages > 1 && (
                  <Pagination
                    pagination={pagination}
                    page={page}
                    setPage={setPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

// NEWS CARD
const PublicNewsCard = ({ news }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">
      {/* THUMBNAIL */}
      <Link
        to={`/news/${news.slug}`}
        className="block aspect-16/10 overflow-hidden bg-gray-100"
      >
        {news.thumbnail ? (
          <img
            src={news.thumbnail}
            alt={news.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Newspaper size={38} className="text-gray-300" />
          </div>
        )}
      </Link>

      {/* CONTENT */}

      <div className="p-4">
        {/* CATEGORY */}

        {news.category && (
          <Link
            to={`/categories/${news.category.slug}`}
            className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-[11px] font-medium capitalize text-blue-600 transition hover:bg-blue-100"
          >
            {news.category.name}
          </Link>
        )}

        {/* TITLE */}

        <Link to={`/news/${news.slug}`}>
          <h2 className="mt-3 line-clamp-2 text-base font-bold leading-6 text-gray-900 transition group-hover:text-blue-600">
            {news.title}
          </h2>
        </Link>

        {/* SUMMARY */}

        {news.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
            {news.summary}
          </p>
        )}

        {/* META */}

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={13} />

            <span>{formatDate(news.publishedAt || news.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye size={14} />

            <span>{news.views?.toLocaleString() || 0}</span>
          </div>
        </div>

        {/* READ ARTICLE */}

        <Link
          to={`/news/${news.slug}`}
          className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5 text-xs font-medium text-gray-600 transition hover:bg-blue-600 hover:text-white"
        >
          Read Article
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
};

// PAGINATION
const Pagination = ({ pagination, page, setPage }) => {
  const totalPages = pagination.totalPages || 1;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (page >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
      {/* INFO */}

      <p className="text-xs text-gray-500">
        Page {page} of {totalPages}
      </p>

      {/* BUTTONS */}

      <div className="flex items-center gap-1">
        {/* PREVIOUS */}

        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={17} />
        </button>

        {/* PAGES */}

        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="grid h-9 w-9 place-items-center text-sm text-gray-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`grid h-9 min-w-9 cursor-pointer place-items-center rounded-lg px-2 text-sm font-medium transition ${
                page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* NEXT */}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

// EMPTY STATE
const EmptyState = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gray-100">
        <Newspaper size={28} className="text-gray-400" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-gray-900">
        No news available
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        There are currently no published articles available.
      </p>
    </div>
  );
};

// ERROR STATE
const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-100">
        <Newspaper size={28} className="text-red-500" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-gray-900">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-gray-600">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
};

// NEWS GRID SKELETON
const NewsGridSkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({
        length: 4,
      }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="aspect-16/10 animate-pulse bg-gray-300" />

          <div className="space-y-3 p-4">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-full animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-300" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
            <div className="h-9 w-full animate-pulse rounded bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicNews;
