import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Eye,
  Flame,
  Menu,
  Newspaper,
  Star,
  TrendingUp,
} from "lucide-react";

import { getAllNews, getFeaturedNews } from "../../api/news.api";

import { getAllCategories } from "../../api/category.api";

import BreakingNews from "../../components/public/BreakingNews";
import NepaliDate from "nepali-date-converter";

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError("");

      const [featuredRes, latestRes, categoryRes] = await Promise.all([
        getFeaturedNews({ limit: 5 }),

        getAllNews({
          page: 1,
          limit: 10,
        }),

        getAllCategories(),
      ]);

    //   console.log("Featured:", featuredRes);
    //   console.log("Latest:", latestRes);
    //   console.log("Categories:", categoryRes);

      // Featured
      const featured = featuredRes?.data || [];

      setFeaturedNews(Array.isArray(featured) ? featured : []);

      // Latest
      const latest = latestRes?.data?.news || [];

      setLatestNews(Array.isArray(latest) ? latest : []);

      // Categories
      const categoryData = categoryRes?.data || [];

      setCategories(
        Array.isArray(categoryData)
          ? categoryData.filter((category) => category.isActive !== false)
          : [],
      );
    } catch (err) {
      console.error("Home page error:", err);

      setError(err?.response?.data?.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* ========== BREAKING NEWS =========== */}
      <BreakingNews news={latestNews} />

      {/* ============= HERO / FEATURED ========= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Section label */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-red-600" />

            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
              Top Story
            </h2>
          </div>

          {featuredNews.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-12">
              {/* ================= MAIN STORY ================ */}
              <div className="lg:col-span-8">
                <Link
                  to={`/news/${featuredNews[0]._id}`}
                  className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    {featuredNews[0].thumbnail ? (
                      <img
                        src={featuredNews[0].thumbnail}
                        alt={featuredNews[0].title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <NewsPlaceholder />
                    )}

                    {/* Image overlay */}

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Featured badge */}

                    <div className="absolute left-5 top-5">
                      <span className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
                        <Flame size={13} />
                        Featured
                      </span>
                    </div>

                    {/* Story content */}

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-white/80">
                        <span className="rounded bg-blue-600 px-2.5 py-1 font-semibold text-white">
                          {getCategoryName(featuredNews[0])}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {formatDate(featuredNews[0].publishedAt)}
                        </span>
                      </div>

                      <h1 className="max-w-4xl text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                        {featuredNews[0].title}
                      </h1>

                      {featuredNews[0].summary && (
                        <p className="mt-3 hidden max-w-3xl line-clamp-2 text-sm leading-6 text-white/80 sm:block">
                          {featuredNews[0].summary}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              {/* ====================== TOP STORIES ================= */}
              <div className="lg:col-span-4">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-red-600" />

                    <h2 className="font-bold text-slate-900">Top Stories</h2>
                  </div>

                  <Link
                    to="/news"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {featuredNews.slice(1, 4).map((news, index) => (
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

      {/* ===========  LATEST NEWS + TRENDING ============= */}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">

            {/* ============= LATEST NEWS ========== */}
            <div className="lg:col-span-8">
              <SectionHeader
                icon={<Newspaper size={19} />}
                title="Latest News"
                link="/news"
                linkText="View all news"
              />

              {latestNews.length > 0 ? (
                <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-4 shadow-sm sm:px-6">
                  {latestNews.map((news) => (
                    <NewsListItem key={news._id} news={news} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>

            {/* ==================== TRENDING ================ */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28">
                <SectionHeader
                  icon={<Flame size={19} className="text-orange-500" />}
                  title="Trending"
                />

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {latestNews.slice(0, 5).map((news, index) => (
                    <Link
                      key={news._id}
                      to={`/news/${news._id}`}
                      className="group flex gap-4 border-b border-slate-100 p-4 transition last:border-0 hover:bg-slate-50"
                    >
                      {/* Number */}

                      <span className="text-2xl font-black text-slate-200 transition group-hover:text-blue-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Content */}

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
                            {news.views || 0}
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

      {/* =================== CATEGORIES ================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeader
            icon={<Menu size={19} />}
            title="Explore Categories"
            link="/categories"
            linkText="All categories"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Newspaper size={18} />
                </div>

                <h3 className="text-sm font-bold text-slate-700 group-hover:text-blue-600">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================ CTA ================ */}
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

            {/* Decoration */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>
        </div>
      </section>
    </main>
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
      to={`/news/${news._id}`}
      className="group flex gap-4 border-b border-slate-200 pb-4 last:border-0"
    >
      {/* Image */}

      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100">
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

      {/* Content */}

      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
          {getCategoryName(news)}
        </span>

        <h3 className="mt-1 line-clamp-3 text-sm font-bold leading-5 text-slate-800 transition group-hover:text-blue-600">
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
    <Link to={`/news/${news._id}`} className="group flex gap-4 py-5">
      {/* Image */}

      <div className="h-28 w-40 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-32 sm:w-52">
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

      {/* Content */}

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
            {news.views || 0} views
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

/* ============================================================
   EMPTY STATE
============================================================ */

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

/* =================== HELPERS ================== */

const getCategoryName = (news) => {
  if (!news?.category) {
    return "News";
  }

  if (typeof news.category === "string") {
    return news.category;
  }

  return news.category.name || news.category.title || "News";
};

const formatDate = (date) => {
  if (!date) {
    return "Recently";
  }
    return new NepaliDate(new Date(date)).format("D MMMM YYYY")
};

/* ============ LOADING SKELETON =========== */
const HomeSkeleton = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="h-105 animate-pulse rounded-xl bg-slate-100 lg:col-span-8" />

          <div className="space-y-4 lg:col-span-4">
            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>

        {/* Latest */}

        <div className="mt-12">
          <div className="mb-5 h-7 w-40 animate-pulse rounded bg-slate-100" />

          <div className="space-y-5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="h-32 w-52 animate-pulse rounded-lg bg-slate-100" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />

                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-100" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
