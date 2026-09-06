import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search as SearchIcon,
  X,
} from "lucide-react";
import { getAllCategories } from "../../api/category.api";
import { getPublishedNews } from "../../api/news.api";


const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalNews: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentPage = Number(searchParams.get("page")) || 1;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();

        setCategories(response.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublishedNews({
          page: currentPage,
          limit: 10,
          search: initialSearch,
          category: initialCategory,
        });

        setNews(response.data?.news || []);

        setPagination(
          response.data?.pagination || {
            currentPage: 1,
            totalPages: 0,
            totalNews: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        );
      } catch (error) {
        console.error("Failed to fetch news:", error);

        setError(
          error.response?.data?.message || "Failed to load search results.",
        );

        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, initialSearch, initialCategory]);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = {};

    if (search.trim()) {
      params.q = search.trim();
    }

    if (category) {
      params.category = category;
    }

    params.page = 1;

    setSearchParams(params);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);

    const params = {};

    if (search.trim()) {
      params.q = search.trim();
    }

    if (value) {
      params.category = value;
    }

    params.page = 1;

    setSearchParams(params);
  };

  const clearSearch = () => {
    setSearch("");
    setCategory("");

    setSearchParams({
      page: 1,
    });
  };

  const changePage = (page) => {
    if (page < 1 || page > pagination.totalPages) return;

    const params = {};

    if (initialSearch) {
      params.q = initialSearch;
    }

    if (initialCategory) {
      params.category = initialCategory;
    }

    params.page = page;

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              News Search
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Search News
            </h1>

            <p className="mt-3 text-gray-600">
              Find the latest news and stories from our newsroom.
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 lg:flex-row"
          >
            <div className="relative flex-1">
              <SearchIcon
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-60"
            >
              <option value="">All Categories</option>

              {categories.map((item) => (
                <option key={item._id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              <SearchIcon size={18} />
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!loading && !error && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {initialSearch
                  ? `Results for "${initialSearch}"`
                  : "Latest News"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {pagination.totalNews}{" "}
                {pagination.totalNews === 1 ? "article" : "articles"} found
              </p>
            </div>

            {(initialSearch || initialCategory) && (
              <button
                onClick={clearSearch}
                className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="h-52 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-700">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && news.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gray-200">
              <SearchIcon size={24} className="text-gray-500" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No news found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              We couldn't find any published news matching your search. Try
              another keyword or category.
            </p>

            <button
              onClick={clearSearch}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* News Cards */}
        {!loading && !error && news.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link to={`/news/${item._id}`}>
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-gray-400">
                          No Image
                        </div>
                      )}

                      {item.category?.name && (
                        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                          {item.category.name}
                        </span>
                      )}

                      {item.isFeatured && (
                        <span className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                          Featured
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDate(item.publishedAt || item.createdAt)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Eye size={14} />
                        {item.views || 0}
                      </span>
                    </div>

                    <Link to={`/news/${item._id}`}>
                      <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-blue-600">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {item.summary}
                    </p>

                    <Link
                      to={`/news/${item._id}`}
                      className="mt-5 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => changePage(pagination.currentPage - 1)}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, index) => index + 1,
                )
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.currentPage) <= 2,
                  )
                  .map((page, index, pages) => {
                    const previousPage = pages[index - 1];

                    return (
                      <div key={page} className="flex items-center gap-2">
                        {previousPage && page - previousPage > 1 && (
                          <span className="px-1 text-gray-400">...</span>
                        )}

                        <button
                          onClick={() => changePage(page)}
                          className={`grid h-10 min-w-10 place-items-center rounded-lg px-3 text-sm font-semibold transition ${
                            page === pagination.currentPage
                              ? "bg-blue-600 text-white"
                              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}

                <button
                  disabled={!pagination.hasNextPage}
                  onClick={() => changePage(pagination.currentPage + 1)}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
