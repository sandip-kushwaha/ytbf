import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import StatCard from "../../components/common/StatCard";
import {
  CheckCircle,
  Edit,
  Eye,
  FileEdit,
  FileText,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAllCategories } from "../../api/category.api";
import { deleteNews, getAllNews, toggleFeaturedNews } from "../../api/news.api";

import NepaliDate from "nepali-date-converter";

import NewsModal from "../../components/news/NewsModal";

const News = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [error, setError] = useState("");

  // Search and Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalNews: 0,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Delete
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  //Fetch News
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllNews({ page, limit });

      setNews(response.data?.news || []);

      setPagination(
        response.data?.pagination || {
          currentPage: page,
          totalPages: 1,
          totalNews: 0,
          limit,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      );
    } catch (error) {
      console.error("Failed to fetch news: ", error);
      setError(error.response?.data?.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);

      const response = await getAllCategories();

      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to fetch category: ", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter News
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        item.title?.toLowerCase().includes(searchValue) ||
        item.summary?.toLowerCase().includes(searchValue);

      const categoryId = item.category?._id || item.category;

      const matchesCategory =
        categoryFilter === "all" || categoryId === categoryFilter;

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [news, search, categoryFilter, statusFilter]);

  // Add News
  const handleAddNews = () => {
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  // Edit News
  const handleEditNews = (item) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  //Toggle Featured
  const handleToggleFeatured = async (id) => {
    try {
      const response = await toggleFeaturedNews(id);

      const updatedNews = response.data;

      setNews((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isFeatured: updatedNews?.isFeatured ?? !item.isFeatured,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update featured:", error);

      setError(
        error.response?.data?.message || "Failed to update featured status",
      );
    }
  };

  //Delete news
  const handleDeleteNews = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);

      await deleteNews(deleteId);

      setDeleteId(null);

      await fetchNews();
    } catch (error) {
      console.error("Failed to deleted news: ", error);

      setError(error.response?.data?.message || "Failed to deleted news");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <>
      <div className="space-y-6">
        {/* ======= Header ========*/}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Header
            title="News Management"
            description="Create, manage and publish your news
"
          />
          <Button
            onClick={handleAddNews}
            value={
              <>
                {" "}
                <Plus size={18} />
                Add news{" "}
              </>
            }
          />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total News"
            value={loading ? "..." : (pagination.totalNews ?? 0)}
            icon={<FileText size={22} />}
            iconClass="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            title="Published News"
            value={
              loading
                ? "..."
                : (news.filter((item) => item.status === "published").length ??
                  0)
            }
            icon={<CheckCircle size={22} />}
            iconClass="bg-green-500/10 text-green-400"
            valueClass="text-green-400"
          />
          <StatCard
            title="Draft News"
            value={
              loading
                ? "..."
                : (news.filter((item) => item.status === "draft").length ?? 0)
            }
            icon={<FileEdit size={22} />}
            iconClass="bg-red-500/10 text-red-400"
            valueClass="text-red-400"
          />
          <StatCard
            title="Featured News"
            value={
              loading
                ? "..."
                : (news.filter((item) => item.isFeatured).length ?? 0)
            }
            icon={<Star size={22} />}
            iconClass="bg-yellow-500/10 text-yellow-400"
            valueClass="text-yellow-400"
          />
        </div>

        {/*====== Error ========*/}
        {error && (
          <div className="flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <span>{error}</span>

            <button onClick={() => setError("")} className="cursor-pointer">
              <X size={18} />
            </button>
          </div>
        )}

        {/* ======= Search & Filters ============ */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex gap-3">
            {/* Search */}
            <div className="relative basis-2/3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              disabled={categoryLoading}
              className="bg-gray-800 rounded-xl basis-2/6 border border-gray-700 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 rounded-xl basis-2/6 border border-gray-700 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* ======News Table ======== */}
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-275">
              <thead className="border-b border-gray-800 bg-gray-800/50">
                <tr className="text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">News</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {/* Loading */}
                {loading &&
                  [1, 2, 3, 4].map((item) => (
                    <tr key={item}>
                      <td colSpan="7" className="px-6 py-5">
                        <div className="h-15 w-full animate-pulse rounded-2xl bg-gray-800" />
                      </td>
                    </tr>
                  ))}

                {!loading && filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <FileText
                        size={40}
                        className="mx-auto mb-3 text-gray-600"
                      />
                      <p className="text-gray-400">No news found</p>
                      <p className="mt-1 text-sm text-gray-600">
                        Try chnaging your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  !loading &&
                  filteredNews.map((item) => (
                    <tr
                      key={item._id}
                      className="transition hover:bg-gray-800/40"
                    >
                      {/* News */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                            {item.thumbnail ? (
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <FileText size={22} className="text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="max-w-md truncate font-medium text-white">
                              {item.title}
                            </h3>

                            <p className="mt-1 max-w-md truncate text-xs text-gray-500">
                              {item.summary}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="flex rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                          {item.category?.name || "Uncategorized"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-medium 
                            ${
                              item.status === "published"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                        >
                          {item.status?.charAt(0).toUpperCase() +
                            item.status?.slice(1)}
                        </span>
                      </td>

                      {/* Views */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Eye size={16} />
                          {item.views || 0}
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleFeatured(item._id)}
                          className={`cursor-pointer rounded-lg p-2 transition 
                            ${
                              item.isFeatured
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-gray-800 text-gray-500 hover:text-yellow-400"
                            }`}
                          title={
                            item.isFeatured
                              ? "Remove featured"
                              : "Make featured"
                          }
                        >
                          <Star
                            size={18}
                            fill={item.isFeatured ? "currentColor" : "none"}
                          />
                        </button>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {item.createdAt
                          ? new NepaliDate(new Date(item.createdAt)).format(
                              "D MMMM YYYY",
                            )
                          : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditNews(item)}
                            className="cursor-pointer rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10"
                            title="Edit"
                          >
                            <Edit size={20} />
                          </button>

                          <button
                            onClick={() => setDeleteId(item._id)}
                            className="cursor-pointer rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                            title="Delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================ Pagination ================== */}
        {pagination.totalPages >= 1 && (
          <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-400">
              Page{" "}
              <span className="font-medium text-white">
                {pagination.currentPage}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white">
                {pagination.totalPages}
              </span>
            </p>

            <div className="flex gap-2">
              <button
                disabled={!pagination.hasPreviousPage}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============== News Modal ============ */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        news={selectedNews}
        onSuccess={fetchNews}
      />

      {/* ======== Delete Confirmation ============= */}
      {deleteId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-s">
          <div className="w-full max-w-md rounded-xs border border-gray-700 bg-gray-900 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white">Delete News ?</h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Are you sure you want to delete this news article? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
                value="Cancel"
              />

              <button
                onClick={handleDeleteNews}
                disabled={deleteLoading}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Deleting...
                  </>
                ) : (
                  <>Delete</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default News;
