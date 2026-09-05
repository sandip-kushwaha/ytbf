import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  LayoutGrid,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { getAllCategories } from "../../api/category.api";
import { getPublishedNews } from "../../api/news.api";
import NepaliDate from "nepali-date-converter";

const PublicNews = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  // STATE
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || "all",
  );

  const [page, setPage] = useState(
    Math.max(Number(searchParams.get("page")) || 1, 1),
  );

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalNews: 0,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const limit = 10;


  // FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await getAllCategories();

        const activeCategories = (response.data || []).filter(
          (category) => category.isActive,
        );

        setCategories(activeCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);


  // FETCH NEWS
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublishedNews({
          page,
          limit,
          search: search.trim() || undefined,
          category: categoryFilter !== "all" ? categoryFilter : undefined,
        });

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
        console.error("Failed to load published news:", error);

        setError(error.response?.data?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, search, categoryFilter]);


  // UPDATE URL
  useEffect(() => {
    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (categoryFilter !== "all") {
      params.category = categoryFilter;
    }

    if (page > 1) {
      params.page = page;
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [search, categoryFilter, page, setSearchParams]);

  
  // SEARCH
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };


  // CATEGORY
  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    setPage(1);
  };


  // CLEAR FILTERS
  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setPage(1);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };


  // FILTER STATUS
  const hasFilters = search.trim() || categoryFilter !== "all";


  // SELECTED CATEGORY
  const selectedCategory = categories.find(
    (category) =>
      category._id === categoryFilter || category.slug === categoryFilter,
  );


  // LOADING
  if (loading && news.length === 0) {
    return <NewsPageSkeleton />;
  }


  return (
    <div className="min-h-screen">
      {/* ================ PAGE HEADER ============== */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Title */}

            <div>
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <Newspaper size={17} />

                <span>Latest News</span>
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                Latest Stories
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Stay updated with the latest news, stories, and important
                events.
              </p>
            </div>

            {/* Total Articles */}
            <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-950 px-4 py-3">
              <Newspaper size={18} className="text-blue-400" />

              <div>
                <p className="text-xs text-gray-600">Total Articles</p>

                <p className="text-sm font-semibold text-white">
                  {pagination.totalNews?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================ FILTER SECTION ============= */}
      <section className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
              />

              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search news..."
                className="h-11 w-full rounded-xl border border-gray-800 bg-gray-900 pl-11 pr-10 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-blue-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-gray-500 transition hover:bg-gray-800 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category */}

            <div className="relative lg:w-64">
              <LayoutGrid
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
              />

              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={categoryLoading}
                className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-gray-800 bg-gray-900 pl-11 pr-4 text-sm text-gray-300 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="all">All Categories</option>

                {categories.map((category) => (
                  <option key={category._id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear */}

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-5 text-sm font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>

          {/* ====================================
              ACTIVE FILTERS
          ==================================== */}

          {hasFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-600">Filters:</span>

              {search && (
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  Search: {search}
                </span>
              )}

              {categoryFilter !== "all" && (
                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                  Category: {selectedCategory?.name || categoryFilter}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ============= NEWS CONTENT ============== */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error ? (
          <ErrorState
            message={error}
            onRetry={() => window.location.reload()}
          />
        ) : news.length === 0 ? (
          <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
        ) : (
          <>
            {/* Result Header */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {hasFilters ? "Search Results" : "All Latest News"}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Showing {news.length} of {pagination.totalNews || 0} articles
                </p>
              </div>

              {loading && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-700 border-t-blue-500" />
                  Updating...
                </div>
              )}
            </div>

            {/* ============ NEWS GRID ========== */}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {news.map((item) => (
                <PublicNewsCard key={item._id} news={item} />
              ))}
            </div>

            {/* ================ PAGINATION ================== */}
            {pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                page={page}
                setPage={setPage}
              />
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
    <article className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl hover:shadow-black/20">
      {/* Thumbnail */}

      <Link
        to={`/news/${news._id}`}
        className="block aspect-16/10 overflow-hidden bg-gray-800"
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
            <Newspaper size={38} className="text-gray-700" />
          </div>
        )}
      </Link>

      {/* Content */}

      <div className="p-4">
        {/* Category */}

        {news.category && (
          <Link
            to={`/categories/${news.category.slug}`}
            className="inline-flex rounded-md bg-blue-500/10 px-2 py-1 text-[11px] font-medium capitalize text-blue-400 transition hover:bg-blue-500/20"
          >
            {news.category.name}
          </Link>
        )}

        {/* Title */}

        <Link to={`/news/${news._id}`}>
          <h2 className="mt-3 line-clamp-2 text-base font-bold leading-6 text-white transition group-hover:text-blue-400">
            {news.title}
          </h2>
        </Link>

        {/* Summary */}

        {news.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
            {news.summary}
          </p>
        )}

        {/* Meta */}

        <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock3 size={13} />

            <span>{formatDate(news.publishedAt || news.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye size={14} />

            <span>{news.views?.toLocaleString() || 0}</span>
          </div>
        </div>

        {/* Read Article */}

        <Link
          to={`/news/${news._id}`}
          className="mt-4 flex items-center justify-between rounded-lg bg-gray-800/70 px-3 py-2.5 text-xs font-medium text-gray-400 transition hover:bg-blue-600 hover:text-white"
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
    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 sm:flex-row">
      {/* Info */}

      <p className="text-xs text-gray-600">
        Page {page} of {totalPages}
      </p>

      {/* Buttons */}

      <div className="flex items-center gap-1">
        {/* Previous */}

        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-gray-800 text-gray-500 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={17} />
        </button>

        {/* Pages */}

        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="grid h-9 w-9 place-items-center text-sm text-gray-600"
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
                  : "text-gray-500 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next */}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-gray-800 text-gray-500 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

// EMPTY STATE
const EmptyState = ({ hasFilters, onClear }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gray-800">
        <Search size={28} className="text-gray-600" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-white">
        {hasFilters ? "No news found" : "No news available"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
        {hasFilters
          ? "We couldn't find any articles matching your search or selected category."
          : "There are currently no published articles available."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <X size={16} />
          Clear Filters
        </button>
      )}
    </div>
  );
};

// ERROR STATE
const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-500/10">
        <Newspaper size={28} className="text-red-400" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-white">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-gray-500">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
      >
        Try Again
      </button>
    </div>
  );
};

// LOADING SKELETON
const NewsPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}

      <section className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-4 w-28 rounded bg-gray-800" />

          <div className="mt-3 h-9 w-64 rounded bg-gray-800" />

          <div className="mt-3 h-5 max-w-xl rounded bg-gray-800" />
        </div>
      </section>

      {/* Filters */}

      <section className="border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <div className="h-11 flex-1 rounded-xl bg-gray-800" />

          <div className="h-11 w-full rounded-xl bg-gray-800 sm:w-64" />
        </div>
      </section>

      {/* Cards */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({
            length: 12,
          }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
            >
              <div className="aspect-16/10 bg-gray-800" />

              <div className="space-y-3 p-4">
                <div className="h-4 w-20 rounded bg-gray-800" />

                <div className="h-5 w-full rounded bg-gray-800" />

                <div className="h-5 w-3/4 rounded bg-gray-800" />

                <div className="h-4 w-full rounded bg-gray-800" />

                <div className="h-9 w-full rounded bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// DATE FORMAT
const formatDate = (date) => {
  if (!date) return "—";

  return new NepaliDate(new Date(date)).format("D MMMM YYYY")
};


export default PublicNews;
