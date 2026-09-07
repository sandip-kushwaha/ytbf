import { useEffect, useState } from "react";
import { X, Loader2, ImagePlus } from "lucide-react";

import { createNews, updateNews } from "../../api/news.api";

import { getAllCategories } from "../../api/category.api";
import Button from "../common/Button";

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

  
  // Load Existing News
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
  }, [news, isOpen]);

  
  // Get Categories
  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await getAllCategories();

        setCategories(response.data || []);
      } catch (error) {
        console.error("Failed to load categories:", error);

        setError(error.response?.data?.message || "Failed to load categories");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  
  // Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };


  // Thumbnail Change
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Thumbnail must be less than 2MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    setPreview(URL.createObjectURL(file));

    setError("");
  };


  // Submit
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-s">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 text-white shadow-2xl scrollbar-thin">
        {/* ==== Header ====*/}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 bg-gray-900 px-6 py-5">
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
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* ========== Form ========= */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* ========= Thumbnail ========= */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              News Thumbnail
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-35 w-48 overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
                {preview ? (
                  <img
                    src={preview}
                    alt="News thumbnail"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-500">
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
                  JPG, PNG, WEBP • Maximum 2MB
                </p>
              </div>
            </div>
          </div>

          {/* ========== Title ========= */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter news title..."
              required
              minLength={3}
              maxLength={200}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.title.length}/200
            </p>
          </div>

          {/* ========== Category + Status ========= */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={categoryLoading}
                className="w-full cursor-pointer rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  {categoryLoading
                    ? "Loading categories..."
                    : "Select category"}
                </option>

                {categories
                  .filter((category) => category.isActive)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="draft">Draft</option>

                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* ============ Summary =========== */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Summary
            </label>

            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write a short summary..."
              required
              maxLength={500}
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.summary.length}/500
            </p>
          </div>

          {/* =========== Content =========== */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Content
            </label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your news content..."
              required
              rows={10}
              className="w-full resize-y rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
            />
          </div>

          {/* ========= Featured ========== */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/50 p-4">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-medium text-white">Featured News</p>

              <p className="text-xs text-gray-500">
                Show this news as featured content
              </p>
            </div>
          </label>

          {/* ======== Buttons ======== */}
          <div className="flex justify-end gap-3 border-t border-gray-700 pt-5">
            <Button onClick={onClose} disabled={loading} value="Cancel" />

            <button
              type="submit"
              disabled={loading}
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
