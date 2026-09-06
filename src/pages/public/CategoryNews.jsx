import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Newspaper,
  Search,
} from "lucide-react";
import { getPublishedNews } from "../../api/news.api";
import { getAllCategories } from "../../api/category.api";
import NepaliDate from "nepali-date-converter";

const CategoryNews = () => {
  const { slug } = useParams();

  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 12;

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalNews: 0,
    limit,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await getAllCategories();

        setCategories(response.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Current category
  const currentCategory = useMemo(() => {
    return categories.find(
      (category) => category.slug?.toLowerCase() === slug?.toLowerCase(),
    );
  }, [categories, slug]);

  // Fetch category news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublishedNews({
          page,
          limit,
          search,
          category: slug,
        });

        setNews(response.data?.news || []);

        setPagination(
          response.data?.pagination || {
            currentPage: page,
            totalPages: 0,
            totalNews: 0,
            limit,
            hasNextPage: false,
            hasPreviousPage: page > 1,
          },
        );
      } catch (error) {
        console.error("Failed to fetch category news:", error);

        setError(
          error.response?.data?.message || "Failed to load category news.",
        );

        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNews();
    }
  }, [slug, page, search]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
    setSearch("");
  }, [slug]);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearch("");
    setPage(1);
  };

  // Date formatter
  //======DATE
  const formatDate = (date) => {
    if (!date) return "—";

    try {
      return new NepaliDate(new Date(date)).format("D MMMM YYYY");
    } catch {
      return "—";
    }
  };

  // Loading skeleton
  if (loading && news.length) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header skeleton */}
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mt-4 h-10 w-64 animate-pulse rounded bg-gray-200" />

            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200" />
          </div>
        </section>

        {/* Cards skeleton */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="aspect-video animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                  <div className="h-5 w-full animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Invalid category
  if (!categoryLoading && categories.length > 0 && !currentCategory) {
    return (
      <div className="min-h-[70vh] bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-600">
              <Newspaper size={30} />
            </div>

            <h1 className="text-xl font-bold text-gray-900">
              Category Not Found
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              The category you're looking for doesn't exist.
            </p>

            <Link
              to="/categories"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Categories
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ================= CATEGORY HEADER =========== */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 transition hover:text-blue-600"
            >
              Home
            </Link>

            <span className="text-gray-300">/</span>

            <Link
              to="/categories"
              className="text-gray-500 transition hover:text-blue-600"
            >
              Categories
            </Link>

            <span className="text-gray-300">/</span>

            <span className="font-medium text-gray-900">
              {currentCategory?.name || slug}
            </span>
          </div>

          {/* Category title */}
          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-600">
                <Newspaper size={14} />
                Category
              </div>

              <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                {currentCategory?.name || slug}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                {currentCategory?.description ||
                  `Latest news and stories from ${
                    currentCategory?.name || slug
                  }.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Latest {currentCategory?.name || ""} News
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Browse the latest published stories.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search in this category..."
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {/* ============ NEWS GRID ============= */}
        {!loading && news.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
                >
                  {/* Image */}
                  <Link
                    to={`/news/${item._id}`}
                    className="block overflow-hidden bg-gray-100"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                          <Newspaper size={42} />
                        </div>
                      )}

                      {/* Featured */}
                      {item.isFeatured && (
                        <span className="absolute left-3 top-3 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                        {item.category?.name || currentCategory?.name || "News"}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-gray-300" />

                      <span className="text-xs text-gray-400">
                        {formatDate(item.publishedAt || item.createdAt)}
                      </span>
                    </div>

                    {/* Title */}
                    <Link to={`/news/${item._id}`} className="mt-3 block">
                      <h3 className="line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition group-hover:text-blue-600">
                        {item.title}
                      </h3>
                    </Link>

                    {/* Summary */}
                    {item.summary && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {item.summary}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Eye size={14} />

                        <span>
                          {Number(item.views || 0).toLocaleString()} views
                        </span>
                      </div>

                      <Link
                        to={`/news/${item._id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                      >
                        Read More
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ================= PAGINATION =========== */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
                    disabled={!pagination.hasPreviousPage}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="hidden items-center gap-1 sm:flex">
                    {[...Array(pagination.totalPages)]
                      .map((_, index) => index + 1)
                      .filter((pageNumber) => {
                        return (
                          pageNumber === 1 ||
                          pageNumber === pagination.totalPages ||
                          Math.abs(pageNumber - pagination.currentPage) <= 1
                        );
                      })
                      .map((pageNumber, index, arr) => (
                        <div
                          key={pageNumber}
                          className="flex items-center gap-1"
                        >
                          {index > 0 && pageNumber - arr[index - 1] > 1 && (
                            <span className="px-1 text-gray-400">...</span>
                          )}

                          <button
                            type="button"
                            onClick={() => setPage(pageNumber)}
                            className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition ${
                              pagination.currentPage === pageNumber
                                ? "bg-blue-600 text-white shadow-sm"
                                : "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        </div>
                      ))}
                  </div>

                  <button
                    type="button"
                    disabled={!pagination.hasNextPage}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="inline-flex h-10 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : !loading ? (
          /* ==================== EMPTY STATE ======== */
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-gray-400 shadow-sm">
              {search ? <Search size={28} /> : <Newspaper size={28} />}
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              {search ? "No matching news found" : "No news available"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {search
                ? `We couldn't find any news matching "${search}" in this category.`
                : `There are currently no published articles in ${
                    currentCategory?.name || "this category"
                  }.`}
            </p>

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default CategoryNews;
