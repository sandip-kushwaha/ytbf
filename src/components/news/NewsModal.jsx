import { useEffect, useState } from "react";

import {
  X,
  Loader2,
  ImagePlus,
  Folder,
  ChevronDown,
  Check,
} from "lucide-react";

import { createNews, updateNews } from "../../api/news.api";
import { getAllCategories } from "../../api/category.api";
import Button from "../common/Button";

const statusOptions = [
  {
    value: "draft",
    label: "Draft",
    color: "bg-amber-400",
  },
  {
    value: "published",
    label: "Published",
    color: "bg-emerald-400",
  },
];

const NewsModal = ({ isOpen, onClose, news, onSuccess }) => {
  const isEdit = Boolean(news);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    status: "draft",
    isFeatured: false,
    thumbnail: null,
  });

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [error, setError] = useState("");

  // Custom dropdown states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Derived dropdown values
  const activeCategories = categories.filter((category) => category.isActive);

  const selectedCategory = activeCategories.find(
    (category) => category._id === formData.category,
  );

  const currentStatusOption =
    statusOptions.find((option) => option.value === formData.status) ||
    statusOptions[0];

  // Load existing news when editing
  useEffect(() => {
    if (!isOpen) return;

    if (news) {
      setFormData({
        title: news.title || "",
        summary: news.summary || "",
        content: news.content || "",
        category: news.category?._id || news.category || "",
        status: news.status || "draft",
        isFeatured: news.isFeatured || false,
        thumbnail: null,
      });

      setPreview(news.thumbnail || "");
    } else {
      setFormData({
        title: "",
        summary: "",
        content: "",
        category: "",
        status: "draft",
        isFeatured: false,
        thumbnail: null,
      });

      setPreview("");
    }

    setError("");
    setIsCategoryOpen(false);
    setIsStatusOpen(false);
  }, [news, isOpen]);

  // Fetch categories
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await getAllCategories();

        if (isMounted) {
          setCategories(response.data || []);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);

        if (isMounted) {
          setError(
            error.response?.data?.message || "Failed to load categories",
          );
        }
      } finally {
        if (isMounted) {
          setCategoryLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Keep hooks above this early return
  if (!isOpen) return null;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // Select a category
  const handleCategorySelect = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));

    setIsCategoryOpen(false);
    setIsStatusOpen(false);
    setError("");
  };

  // Select a status
  const handleStatusSelect = (status) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));

    setIsStatusOpen(false);
    setIsCategoryOpen(false);
    setError("");
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Thumbnail must be less than 2MB.");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    setPreview(URL.createObjectURL(file));
    setError("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("summary", formData.summary.trim());
      data.append("content", formData.content.trim());
      data.append("category", formData.category);
      data.append("status", formData.status);
      data.append("isFeatured", String(formData.isFeatured));

      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }

      if (isEdit) {
        await updateNews(news._id, data);
      } else {
        await createNews(data);
      }

      await onSuccess();
      onClose();
    } catch (error) {
      console.error("News error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={() => {
        setIsCategoryOpen(false);
        setIsStatusOpen(false);
      }}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 text-white shadow-2xl scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-700 bg-gray-900 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit News" : "Create News"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {isEdit ? "Update news information" : "Create a new news article"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}

          {/* Thumbnail */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              News Thumbnail
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-36 w-48 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
                {preview ? (
                  <img
                    src={preview}
                    alt="News thumbnail preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <ImagePlus size={25} />
                    <span className="mt-2 text-xs">No Image</span>
                  </div>
                )}
              </div>

              <div>
                <label className="inline-block cursor-pointer rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-600">
                  Choose Thumbnail
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </label>

                <p className="mt-2 text-xs text-gray-500">
                  JPG, PNG, WEBP · Maximum 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="news-title"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Title
            </label>

            <input
              id="news-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter news title..."
              required
              minLength={3}
              maxLength={200}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.title.length}/200
            </p>
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Category dropdown */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Category
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isCategoryOpen}
                disabled={categoryLoading}
                onClick={() => {
                  setIsCategoryOpen((prev) => !prev);
                  setIsStatusOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-gray-800 px-4 py-3 text-left text-sm outline-none transition focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isCategoryOpen
                    ? "border-blue-500"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="min-w-0">
                    <span
                      className={`block truncate font-medium ${
                        selectedCategory ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {categoryLoading
                        ? "Loading categories..."
                        : selectedCategory?.name || "Select category"}
                    </span>
                  </span>
                </span>

                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1.5 shadow-2xl">
                  <div className="max-h-56 overflow-y-auto">
                    {activeCategories.length > 0 ? (
                      <div role="listbox" aria-label="News categories">
                        {activeCategories.map((category) => {
                          const isSelected = formData.category === category._id;

                          return (
                            <button
                              key={category._id}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => handleCategorySelect(category._id)}
                              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition ${
                                isSelected
                                  ? "bg-blue-500/10 text-blue-400"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                    isSelected
                                      ? "bg-blue-500/15 text-blue-400"
                                      : "bg-gray-700 text-gray-400"
                                  }`}
                                >
                                  <Folder size={16} />
                                </span>

                                <span className="truncate text-sm font-medium">
                                  {category.name}
                                </span>
                              </span>

                              {isSelected && (
                                <Check
                                  size={17}
                                  className="shrink-0 text-blue-400"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <Folder
                          size={24}
                          className="mx-auto mb-2 text-gray-500"
                        />

                        <p className="text-sm text-gray-300">
                          No active categories
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Create or activate a category first.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <input
                type="text"
                name="category"
                value={formData.category}
                required
                readOnly
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none absolute h-px w-px opacity-0"
              />
            </div>

            {/* Status dropdown */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Status
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isStatusOpen}
                onClick={() => {
                  setIsStatusOpen((prev) => !prev);
                  setIsCategoryOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-gray-800 px-4 py-3 text-left text-sm outline-none transition focus:ring-2 focus:ring-blue-500/20 ${
                  isStatusOpen
                    ? "border-blue-500"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="block font-medium text-white">
                    {currentStatusOption.label}
                  </span>
                </span>

                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                    isStatusOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isStatusOpen && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1.5 shadow-2xl">
                  <div role="listbox" aria-label="News status">
                    {statusOptions.map((option) => {
                      const isSelected = formData.status === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleStatusSelect(option.value)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition ${
                            isSelected ? "bg-blue-500/10" : "hover:bg-gray-700"
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${option.color}`}
                            />

                            <span className="min-w-0">
                              <span className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">
                                  {option.label}
                                </span>
                              </span>
                            </span>
                          </span>

                          {isSelected && (
                            <Check
                              size={17}
                              className="shrink-0 text-blue-400"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <input
                type="text"
                name="status"
                value={formData.status}
                required
                readOnly
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none absolute h-px w-px opacity-0"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="news-summary"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Summary
            </label>

            <textarea
              id="news-summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write a short summary..."
              required
              maxLength={500}
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.summary.length}/500
            </p>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="news-content"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Content
            </label>

            <textarea
              id="news-content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your news content..."
              required
              rows={10}
              className="w-full resize-y rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-gray-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Featured news */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/50 p-4 transition hover:border-gray-600">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-medium text-white">Featured News</p>

              <p className="mt-1 text-xs text-gray-500">
                Show this news as featured content.
              </p>
            </div>
          </label>

          {/* Form buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-700 pt-5">
            <Button onClick={onClose} disabled={loading} value="Cancel" />

            <button
              type="submit"
              disabled={loading || categoryLoading}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />

                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update News"
              ) : (
                "Create News"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsModal;
