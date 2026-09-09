import { useEffect, useState } from "react";
import { ArrowRight, Menu, Newspaper } from "lucide-react";
import { Link, } from "react-router-dom";

import { getAllCategories } from "../../api/category.api";

const NewsCategories = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllCategories();

        console.log("Categories API response:", response);

        const categoryData =
          response?.data?.categories ||
          response?.data?.data ||
          response?.data ||
          [];

        if (!isMounted) return;

        const parsedCategories = Array.isArray(categoryData)
          ? categoryData.filter((category) => category?.isActive !== false)
          : [];

        setCategories(parsedCategories);
      } catch (err) {
        if (isMounted) {
          console.error("Categories fetch error:", err);

          setError(err?.response?.data?.message || "विषयहरू लोड गर्न सकिएन।");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
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

            <span className="truncate text-blue-600">विषयहरू</span>
               
          </div>
        </div>
      </nav>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* ================= SECTION HEADER ================= */}
          <SectionHeader
            icon={<Menu size={25} />}
            title="विषयहरू खोज्नुहोस्"
            link="/search"
            linkText="सबै विषयहरू हेर्नुहोस्"
          />

          {/* ================= ERROR ================= */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-center text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* ================= LOADING ================= */}
          {loading ? (
            <CategorySkeleton />
          ) : categories.length > 0 ? (
            /* ================= CATEGORIES ================= */
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map((category) => {
                const categorySlug =
                  category?.slug ||
                  category?.name?.toLowerCase().trim().replace(/\s+/g, "-") ||
                  category?._id;

                return (
                  <Link
                    key={category?._id}
                    to={`/search?category=${encodeURIComponent(categorySlug)}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    {/* Icon */}
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Newspaper size={18} />
                    </div>

                    {/* Category Name */}
                    <h3 className="line-clamp-2 text-sm font-bold text-slate-700 transition group-hover:text-blue-600">
                      {category?.name || "विषय"}
                    </h3>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* ================= EMPTY STATE ================= */
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
              <Newspaper size={35} className="mx-auto text-slate-300" />

              <h3 className="mt-3 font-bold text-slate-700">
                कुनै विषय उपलब्ध छैन।
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                पछि फेरि प्रयास गर्नुहोस्।
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ======= SECTION HEADER ========= */
const SectionHeader = ({ icon, title, link, linkText }) => {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
      <div className="flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>

        <h2 className="text-2xl font-black text-slate-900">{title}</h2>
      </div>

      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-sm font-bold text-blue-600 transition hover:text-blue-700"
        >
          {linkText || "View all"}

          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
};

/* ========= CATEGORY SKELETON ========= */
const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white p-5"
        >
          {/* Icon skeleton */}
          <div className="mx-auto mb-3 h-11 w-11 animate-pulse rounded-full bg-slate-300" />

          {/* Text skeleton */}
          <div className="mx-auto h-4 w-20 animate-pulse rounded bg-slate-300" />
        </div>
      ))}
    </div>
  );
};

export default NewsCategories;
