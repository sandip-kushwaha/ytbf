import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Search as SearchIcon,
  Tag,
  X,
} from "lucide-react";
import { getAllCategories } from "../../api/category.api";
import { getPublishedNews } from "../../api/news.api";

import formatDate from "./NepaliDate";

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

  // Sync state with URL changes
  useEffect(() => {
    setSearch(initialSearch);
    setCategory(initialCategory);
  }, [initialSearch, initialCategory]);

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

  const selectedCategoryObj = categories.find((item) => item.slug === category);

  return (
    <section className="min-h-screen bg-slate-50/50">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-gray-100 bg-slate-50/60"
      >
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-hidden text-xs font-medium text-gray-500">
            <Link to="/" className="shrink-0 transition hover:text-blue-600">
            गृहपृष्ठ
            </Link>

            <span className="text-gray-300">/</span>

            <span className="truncate text-blue-600">खोज्नुहोस्</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              {/* Newsroom Discovery */}
              न्युजरुमबाट विशेष खोज
            </p>

            <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              {/* Search & Filter News */}
              समाचार खोज तथा फिल्टर
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              {/* Explore coverage across topics, breaking news, and in-depth reports. */}
              विभिन्न विषयहरू, मुख्य समाचार र विस्तृत रिपोर्टहरू खोज्नुहोस्।
            </p>
          </div>

          {/* Main Search Input */}
          <form onSubmit={handleSearch} className="mt-6 flex items-center gap-3">
            <div className="relative flex-1">
              <SearchIcon
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="विषय, मुख्य शब्द वा शीर्षकबाट समाचार खोज्नुहोस् | नेपालीमा..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <SearchIcon size={18} />
              <span className="hidden sm:inline">खोज्नुहोस्</span>
            </button>
          </form>

          {/* Interactive Category Filter Pills */}
          <div className="mt-6 flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Filter size={14} className="text-blue-600" />
              <span>
                {/* Browse Categories */}
                सबै विषयहरू हेर्नुहोस्
              </span>
            </div>

            <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => handleCategoryChange("")}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  category === ""
                    ? "bg-gray-900 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {/* All Topics */}
                सबै विषयहरू
              </button>

              {categories.map((item) => {
                const isActive = category === item.slug;
                return (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => handleCategoryChange(item.slug)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Tag size={13} className={isActive ? "text-white" : "text-gray-400"} />
                    {item.name} 
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!loading && !error && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/60 pb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {initialSearch
                  ? `Results for "${initialSearch}"`
                  : selectedCategoryObj
                  ? `${selectedCategoryObj.name} News`
                  : "ताजा खबर"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Showing {news.length} of {pagination.totalNews}{" "}
                {pagination.totalNews === 1 ? "article" : "articles"}
              </p>
            </div>

            {/* Active Filters Bar */}
            {(initialSearch || initialCategory) && (
              <div className="flex flex-wrap items-center gap-2">
                {initialSearch && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700">
                    Query: "{initialSearch}"
                  </span>
                )}

                {selectedCategoryObj && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700">
                    Category: {selectedCategoryObj.name}
                  </span>
                )}

                <button
                  onClick={clearSearch}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <X size={14} />
                  Clear All
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs"
              >
                <div className="h-52 animate-pulse bg-gray-300" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
                  <div className="h-6 w-full animate-pulse rounded bg-gray-300" />
                  <div className="h-6 w-4/5 animate-pulse rounded bg-gray-300" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && news.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-xs">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <SearchIcon size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No matching articles
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              We couldn't find any news articles matching your search query or selected category.
            </p>

            <button
              onClick={clearSearch}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && news.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <article
                  key={item._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link to={`/news/${item.slug}`}>
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-sm font-medium text-gray-400">
                          No Image Available
                        </div>
                      )}

                      {item.category?.name && (
                        <span className="absolute left-4 top-4 rounded-lg bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                          {item.category.name}
                        </span>
                      )}

                      {item.isFeatured && (
                        <span className="absolute right-4 top-4 rounded-lg bg-red-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                          {/* Featured */}
                          मुख्य समाचार
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDate(item.publishedAt || item.createdAt)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Eye size={14} />
                        {item.views || 0}
                      </span>
                    </div>

                    <Link to={`/news/${item.slug}`}>
                      <h3 className="line-clamp-2 text-2xl font-bold leading-snug text-gray-900 transition group-hover:text-blue-600">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-lg leading-6 text-gray-600">
                      {item.summary}
                    </p>

                    <div className="mt-auto pt-4">
                      <Link
                        to={`/news/${item.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:gap-1.5"
                      >
                        {/* Read Article  */}
                        समाचार पढ्नुहोस्
                        <ArrowRight size={18}/>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => changePage(pagination.currentPage - 1)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                          <span className="px-1 text-xs text-gray-400">...</span>
                        )}

                        <button
                          onClick={() => changePage(page)}
                          className={`grid h-10 min-w-10 place-items-center rounded-xl px-3 text-xs font-semibold transition ${
                            page === pagination.currentPage
                              ? "bg-blue-600 text-white shadow-xs"
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
                  className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
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