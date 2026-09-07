import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  Eye,
  Flame,
  Menu,
  Newspaper,
  RefreshCw,
  Star,
  TrendingUp,
} from "lucide-react";

import { getFeaturedNews, getPublishedNews } from "../../api/news.api";
import { getAllCategories } from "../../api/category.api";
import NepaliDate from "nepali-date-converter";

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError("");

        const [featuredRes, latestRes, categoryRes] = await Promise.all([
          getFeaturedNews({ page: 1, limit: 6 }),
          getPublishedNews({ page: 1, limit: 10 }),
          getAllCategories(),
        ]);

        if (!isMounted) return;

        // Parse pagination response structures (res.data vs res.data.news vs res.data.data)
        const featured =
          featuredRes?.data?.news ||
          featuredRes?.data?.data ||
          featuredRes?.data ||
          [];

        const latest =
          latestRes?.data?.news ||
          latestRes?.data?.data ||
          latestRes?.data ||
          [];

        const categoryData =
          categoryRes?.data?.categories ||
          categoryRes?.data?.data ||
          categoryRes?.data ||
          [];

        const parsedFeatured = Array.isArray(featured) ? featured : [];
        const parsedLatest = Array.isArray(latest) ? latest : [];

        // Fallback: If no dedicated featured news exists, use latest news for hero display
        if (parsedFeatured.length === 0 && parsedLatest.length > 0) {
          setFeaturedNews(parsedLatest);
        } else {
          setFeaturedNews(parsedFeatured);
        }

        setLatestNews(parsedLatest);
        setCategories(
          Array.isArray(categoryData)
            ? categoryData.filter((category) => category.isActive !== false)
            : [],
        );
      } catch (err) {
        if (isMounted) {
          console.error("Home page data fetch error:", err);
          setError(
            err?.response?.data?.message ||
              "Failed to load news content. Please check your network connection.",
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  // Extract the main hero story and secondary top stories
  const mainHeroStory = featuredNews[0];
  const sideFeaturedStories = featuredNews.slice(1, 4);
  const remainingFeaturedStories = featuredNews.slice(4);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Error Notice Bar (if any sub-request fails or error state occurs) */}
      {error && (
        <div className="bg-red-50 border-b border-red-100 py-3 px-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs font-semibold text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1 underline hover:text-red-900"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        </div>
      )}

      {/* ============= HERO / FEATURED TOP STORIES ========= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-red-600" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
              Top Story
            </h2>
          </div>

          {featuredNews.length > 0 && mainHeroStory ? (
            <div className="grid gap-6 lg:grid-cols-12">
              {/* MAIN HERO STORY */}
              <div className="lg:col-span-8">
                <Link
                  to={`/news/${mainHeroStory.slug}`}
                  className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    {mainHeroStory.thumbnail ? (
                      <img
                        src={mainHeroStory.thumbnail}
                        alt={mainHeroStory.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <NewsPlaceholder />
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute left-5 top-5">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-xs">
                        <Flame size={13} />
                        Featured
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-white/80">
                        <span className="rounded bg-blue-600 px-2.5 py-1 font-semibold text-white">
                          {getCategoryName(mainHeroStory)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {formatDate(mainHeroStory.publishedAt)}
                        </span>
                      </div>

                      <h1 className="max-w-4xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                        {mainHeroStory.title}
                      </h1>

                      {mainHeroStory.summary && (
                        <p className="mt-2 max-w-3xl line-clamp-2 text-lg leading-7 text-white/80 sm:text-xl md:text-2xl md:leading-9 lg:text-3xl lg:leading-11">
                          {mainHeroStory.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              {/* TOP STORIES SIDEBAR */}
              <div className="lg:col-span-4">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-red-600" />
                    <h2 className="font-bold text-slate-900">Top Stories</h2>
                  </div>

                  <Link
                    to="/news"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {sideFeaturedStories.map((news, index) => (
                    <FeaturedSideCard
                      key={news._id}
                      news={news}
                      index={index + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* ================= MORE FEATURED COVERAGE SECTION ================= */}
      {remainingFeaturedStories.length > 0 && (
        <section className="border-b border-slate-200 bg-slate-50/50 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={<Star size={19} className="text-amber-500" />}
              title="Featured Coverage"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingFeaturedStories.map((news) => (
                <FeaturedGridCard key={news._id} news={news} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========== LATEST NEWS + TRENDING SECTION ============= */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* LATEST NEWS LIST */}
            <div className="lg:col-span-8">
              <SectionHeader
                icon={<Newspaper size={19} />}
                title="Latest News"
                link="/news"
                linkText="View all news"
              />

              {latestNews.length > 0 ? (
                <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-4 shadow-xs sm:px-6">
                  {latestNews.map((news) => (
                    <NewsListItem key={news._id} news={news} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>

            {/* TRENDING SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <SectionHeader
                  icon={<Flame size={19} className="text-orange-500" />}
                  title="Trending"
                />

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                  {latestNews.slice(0, 5).map((news, index) => (
                    <Link
                      key={news._id}
                      to={`/news/${news.slug}`}
                      className="group flex gap-4 border-b border-slate-100 p-4 transition last:border-0 hover:bg-slate-50"
                    >
                      <span className="text-2xl font-black text-slate-200 transition group-hover:text-blue-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
                          {getCategoryName(news)}
                        </span>

                        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition group-hover:text-blue-600">
                          {news.title}
                        </h3>

                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                          <span>{formatDate(news.publishedAt)}</span>

                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {Number(news.views || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =================== CATEGORIES EXPLORER ================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeader
            icon={<Menu size={19} />}
            title="Explore Categories"
            link="/search"
            linkText="All categories"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.slice(0, 6).map((category) => {
              const categorySlug =
                category.slug || category.name?.toLowerCase() || category._id;

              return (
                <Link
                  key={category._id}
                  to={`/search?category=${categorySlug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Newspaper size={18} />
                  </div>

                  <h3 className="text-sm font-bold text-slate-700 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================ CALL TO ACTION (CTA) ================ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 sm:px-10">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Star size={22} />
              </div>

              <h2 className="text-2xl font-black text-white sm:text-3xl">
                Stay informed.
                <br />
                Never miss a story.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Get the latest news, important updates, and trending stories all
                in one place.
              </p>

              <Link
                to="/news"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Explore News
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
};

/* ================= FEATURED GRID CARD ================= */
const FeaturedGridCard = ({ news }) => {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {news.thumbnail ? (
          <img
            src={news.thumbnail}
            alt={news.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <NewsPlaceholder />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          <Flame size={11} />
          Featured
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
              {getCategoryName(news)}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} />
              {formatDate(news.publishedAt)}
            </span>
          </div>

          <h3 className="line-clamp-2 text-base font-bold text-slate-800 group-hover:text-blue-600">
            {news.title}
          </h3>

          {news.summary && (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
              {news.summary}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Eye size={13} />
            {Number(news.views || 0).toLocaleString()} views
          </span>
        </div>
      </div>
    </Link>
  );
};

/* ==================== SECTION HEADER ================= */
const SectionHeader = ({ icon, title, link, linkText }) => {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
      <div className="flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{title}</h2>
      </div>

      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-xs font-bold text-blue-600 transition hover:text-blue-700"
        >
          {linkText || "View all"}
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
};

/* ================ FEATURED SIDE CARD ============= */
const FeaturedSideCard = ({ news, index }) => {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group flex gap-4 border-b border-slate-200 pb-4 last:border-0"
    >
      <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        {news.thumbnail ? (
          <img
            src={news.thumbnail}
            alt={news.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <NewsPlaceholder />
        )}

        <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs font-bold text-white">
          {index}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
          {getCategoryName(news)}
        </span>

        <h3 className="mt-1 line-clamp-3 text-lg font-bold leading-5 text-slate-800 transition group-hover:text-blue-600">
          {news.title}
        </h3>

        <p className="mt-2 text-[11px] text-slate-400">
          {formatDate(news.publishedAt)}
        </p>
      </div>
    </Link>
  );
};

/* ============ NEWS LIST ITEM ============== */
const NewsListItem = ({ news }) => {
  return (
    <Link to={`/news/${news.slug}`} className="group flex gap-4 py-5">
      <div className="h-28 w-42 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-32 sm:w-52">
        {news.thumbnail ? (
          <img
            src={news.thumbnail}
            alt={news.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <NewsPlaceholder />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600">
            {getCategoryName(news)}
          </span>

          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock size={12} />
            {formatDate(news.publishedAt)}
          </span>
        </div>

        <h3 className="line-clamp-2 text-base font-black leading-6 text-slate-800 transition group-hover:text-blue-600 sm:text-lg">
          {news.title}
        </h3>

        {news.summary && (
          <p className="mt-2 hidden line-clamp-2 text-sm leading-5 text-slate-500 sm:block">
            {news.summary}
          </p>
        )}

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Eye size={13} />
            {Number(news.views || 0).toLocaleString()} views
          </span>
        </div>
      </div>
    </Link>
  );
};

/* =========== PLACEHOLDER ============= */
const NewsPlaceholder = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <Newspaper size={30} className="text-slate-300" />
    </div>
  );
};

/* ================= EMPTY STATE ================= */
const EmptyState = () => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <Newspaper size={35} className="mx-auto text-slate-300" />
      <h3 className="mt-3 font-bold text-slate-700">No news available</h3>
      <p className="mt-1 text-sm text-slate-400">
        Check back later for the latest stories.
      </p>
    </div>
  );
};

/* ================= HELPERS ================= */
const getCategoryName = (news) => {
  if (!news?.category) {
    return "General";
  }
  if (typeof news.category === "string") {
    return news.category;
  }

  return news.category.name || news.category.title || "General";
};

// Date Formatter
const formatDate = (date) => {
  if (!date) return "—";

  try {
    return new NepaliDate(new Date(date)).format("D MMMM YYYY");
  } catch {
    return "—";
  }
};

/* ============ LOADING SKELETON =========== */
const HomeSkeleton = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-6 w-1 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="aspect-video animate-pulse bg-slate-200" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-7 w-4/5 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-14 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 border-b border-slate-200 pb-4"
                >
                  <div className="h-24 w-32 shrink-0 animate-pulse rounded-lg bg-slate-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
