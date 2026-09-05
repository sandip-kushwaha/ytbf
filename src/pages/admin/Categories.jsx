import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Edit,
  Folder,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";

import {
  getAllCategories,
  updateCategoryStatus,
  deleteCategory,
} from "../../api/category.api";

import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";

import NepaliDate from "nepali-date-converter";

import CategoryModal from "../../components/category/CategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [actionId, setActionId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Delete
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCategories();

      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);

      setError(error.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Search
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText || category.name?.toLowerCase().includes(searchText);

      let matchesStatus = true;

      if (statusFilter === "active") {
        matchesStatus = category.isActive;
      }
      if (statusFilter === "inactive") {
        matchesStatus = !category.isActive;
      }

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  // Toggle Status
  const handleToggleStatus = async (id, isActive) => {
    try {
      setActionId(id);

      const newStatus = !isActive;
      await updateCategoryStatus(id, newStatus);

      setCategories((prev) =>
        prev.map((category) =>
          category._id === id
            ? {
                ...category,
                isActive: newStatus,
              }
            : category,
        ),
      );
    } catch (error) {
      console.error("Failed to update category status:", error);

      setError(
        error.response?.data?.message || "Failed to update category status",
      );
    } finally {
      setActionId(null);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      await deleteCategory(deleteId);

      setDeleteId(null);

      await fetchCategories();

      // setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);

      setError(error.response?.data?.message || "Failed to delete category");
    } finally {
      setDeleteLoading(false);
    }
  };
  //Delete news
  // const handleDeleteNews = async () => {
  //   if (!deleteId) return;

  //   try {
  //     setDeleteLoading(true);

  //     await deleteNews(deleteId);

  //     setDeleteId(null);

  //     await fetchNews();
  //   } catch (error) {
  //     console.error("Failed to deleted news: ", error);

  //     setError(error.response?.data?.message || "Failed to deleted news");
  //   } finally {
  //     setDeleteLoading(false);
  //   }
  // };

  return (
    <>
      <div className="space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Header
            title="Categories"
            description="Manage your news categories."
          />
          <Button
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
            value={
              <>
                {" "}
                <Plus size={18} /> Add Category{" "}
              </>
            }
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Category"
            value={loading ? "..." : (categories.length ?? 0)}
            icon={<Folder size={22} />}
            iconClass="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            title="Active"
            value={
              loading
                ? "..."
                : (categories.filter((category) => category.isActive).length ??
                  0)
            }
            icon={<CheckCircle size={22} />}
            iconClass="bg-green-500/10 text-green-400"
            valueClass="text-green-400"
          />

          <StatCard
            title="Inactive"
            value={
              loading
                ? "..."
                : (categories.filter((category) => !category.isActive).length ??
                  0)
            }
            icon={<XCircle size={22} />}
            iconClass="bg-red-500/10 text-red-400"
            valueClass="text-red-400"
          />
        </div>

        {/* ================= SEARCH ================= */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
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
                placeholder="Search categories..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg basis-2/6 border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white
                       outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all"> All Status </option>
              <option value="active"> Active </option>
              <option value="inactive"> Inactive </option>
            </select>
          </div>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead className="border-b border-gray-800 bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Slug
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Created
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">
                {/* Loading */}
                {loading &&
                  [...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td colSpan="5" className="px-6 py-5">
                        <div className="h-5 w-full animate-pulse rounded bg-gray-800" />
                      </td>
                    </tr>
                  ))}

                {/* Empty */}
                {!loading && filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <Folder size={40} className="mx-auto text-gray-600" />

                      <p className="mt-3 text-sm text-gray-400">
                        No categories found
                      </p>
                    </td>
                  </tr>
                )}

                {/* Categories */}
                {!loading &&
                  filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="transition hover:bg-gray-800/40"
                    >
                      {/* Category */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500/10">
                              <Folder size={18} className="text-blue-500" />
                            </div>
                          )}

                          <div>
                            <p className="font-medium text-white">
                              {category.name}
                            </p>

                            {category.description && (
                              <p className="max-w-xs truncate text-xs text-gray-500">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-4">
                        <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-400">
                          {category.slug}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          disabled={actionId === category._id}
                          onClick={() =>
                            handleToggleStatus(category._id, category.isActive)
                          }
                        >
                          {actionId === category._id ? (
                            " ... "
                          ) : category.isActive ? (
                            <span className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 hover:text-green-800 hover:bg-green-50">
                              <CheckCircle size={16} />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center cursor-pointer gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:text-red-800 hover:bg-red-50">
                              <XCircle size={16} />
                              Inactive
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Created */}
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {category.createdAt
                          ? new NepaliDate(new Date(category.createdAt)).format(
                              "D MMMM YYYY",
                            )
                          : "—"}{" "}
                        /{" "}
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString(
                              "en-NP",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsModalOpen(true);
                            }}
                            type="button"
                            className="cursor-pointer rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10"
                            title="Edit category"
                          >
                            <Edit size={20} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteId(category._id)}
                            className="cursor-pointer rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                            title="Delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />

      {/* ======== Delete Confirmation ============= */}
      {deleteId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-s">
          <div className="w-full max-w-md rounded-xs border border-gray-700 bg-gray-900 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white">
              Delete Category ?
            </h2>

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
                onClick={handleDeleteCategory}
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

export default Categories;
