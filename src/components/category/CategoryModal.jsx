import { useEffect, useState } from "react";
import { X, Loader2, ImagePlus } from "lucide-react";
import { createCategory, updateCategory } from "../../api/category.api";
import Button from "../common/Button";

const CategoryModal = ({ isOpen, onClose, category, onSuccess }) => {

  const isEdit = Boolean(category);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset / Load Category
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: null,
      });

      setPreview(category.image || "");
    } else {
      setFormData({
        name: "",
        description: "",
        image: null,
      });

      setPreview("");
    }

    setError("");
  }, [category, isOpen]);

  if (!isOpen) return null;

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Image Change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    // Check image size
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
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

      data.append("name", formData.name.trim());
      data.append("description", formData.description.trim());

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (isEdit) {
        await updateCategory(category._id, data);
      } else {
        await createCategory(data);
      }

      await onSuccess();

      onClose();
    } catch (error) {
      console.error("Category error:", error);

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
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 text-white shadow-2xl scrollbar-thin">
        {/* ================= Header ================= */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Category" : "Add Category"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {isEdit ? "Update category information" : "Create a new news category"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= Form ================= */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* ================= Image ================= */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Category Image
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Preview */}
              <div className="h-35 w-48 shrink-0 overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
                {preview ? (
                  <img
                    src={preview}
                    alt="Category preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-500">
                   <ImagePlus />
                    <span className="mt-2 text-xs">No Image</span>
                  </div>
                )}
              </div>

              {/* Upload */}
              <div>
                <label className="inline-block cursor-pointer rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-600">
                  Choose Image
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <p className="mt-2 text-xs text-gray-500">
                  JPG, PNG, WEBP • Maximum 2MB
                </p>
              </div>
            </div>
          </div>

          {/* ================= Name ================= */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Technology, Politics..."
              required
              minLength={2}
              maxLength={50}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.name.length}/50
            </p>
          </div>

          {/* ================= Description ================= */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              maxLength={300}
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.description.length}/300
            </p>
          </div>

          {/* ================= Buttons ================= */}
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
              ) : (
                <>{isEdit ? "Update Category" : "Create Category"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
