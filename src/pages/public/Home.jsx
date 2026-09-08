import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  AlertCircle,
  ArrowRight,
  Clock,
  Eye,
  Flame,
  Newspaper,
  RefreshCw,
  Star,
  TrendingUp,
} from "lucide-react";

import { getFeaturedNews, getPublishedNews } from "../../api/news.api";

import formatDate from "./NepaliDate";

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============== FETCH HOME DATA =========== */
  useEffect(() => {
    let isMounted = true;

    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError("");

        const [featuredRes, latestRes] = await Promise.all([
          getFeaturedNews({
            page: 1,
            limit: 6,
          }),

          getPublishedNews({
            page: 1,
            limit: 10,
          }),
        ]);

        if (!isMounted) return;

        /* ================= FEATURED ================= */
        const featured =
          featuredRes?.data?.news ||
          featuredRes?.data?.data ||
          featuredRes?.data ||
          [];

        /* ================= LATEST ================= */
        const latest =
          latestRes?.data?.news ||
          latestRes?.data?.data ||
          latestRes?.data ||
          [];

        const parsedFeatured = Array.isArray(featured) ? featured : [];

        const parsedLatest = Array.isArray(latest) ? latest : [];

        /* ================ FALLBACK
           If no featured news exists,
           use latest news for hero section.
           ============= */
        if (parsedFeatured.length === 0 && parsedLatest.length > 0) {
          setFeaturedNews(parsedLatest);
        } else {
          setFeaturedNews(parsedFeatured);
        }

        setLatestNews(parsedLatest);
      } catch (err) {
        if (isMounted) {
          console.error("Home page data fetch error:", err);

          setError(
            err?.response?.data?.message ||
              "समाचार लोड गर्न सकिएन। कृपया आफ्नो नेटवर्क जाँच गर्नुहोस्।",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ============ LOADING =========== */
  if (loading) {
    return <HomeSkeleton />;
  }

  /* =========== FEATURED DATA ============ */
  const mainHeroStory = featuredNews[0];

  const sideFeaturedStories = featuredNews.slice(1, 4);

  const remainingFeaturedStories = featuredNews.slice(4);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* ============= ERROR NOTICE ============= */}
      {error && (
        <div className="border-b border-red-100 bg-red-50 px-4 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-xs font-semibold text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />

              <span>{error}</span>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1 underline hover:text-red-900"
            >
              <RefreshCw size={12} />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* =============== HERO / FEATURED TOP STORIES ======== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Section title */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-red-600" />

            <h2 className="font-bold uppercase tracking-widest text-slate-900">
              मुख्य समाचार
            </h2>
          </div>

          {featuredNews.length > 0 && mainHeroStory ? (
            <div className="grid gap-6 lg:grid-cols-12">

              {/* =========== MAIN HERO ========== */}
              <div className="lg:col-span-8">
                <Link
                  to={`/news/${mainHeroStory.slug}`}
                  className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
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

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Featured badge */}
                    <div className="absolute left-5 top-5">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-red-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                        <Flame size={13} />
                        मुख्य समाचार
                      </span>
                    </div>

                    {/* Hero content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-base text-white/80">
                        <span className="rounded bg-blue-600 px-2.5 py-1 font-semibold text-white">
                          {getCategoryName(mainHeroStory)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={16} />

                          {formatDate(mainHeroStory.publishedAt)}
                        </span>
                      </div>

                      <h1 className="max-w-4xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                        {mainHeroStory.title}
                      </h1>

                      {mainHeroStory.summary && (
                        <p className="mt-2 max-w-3xl line-clamp-2 text-lg leading-7 text-white/80 sm:text-xl md:text-2xl">
                          {mainHeroStory.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              {/* ========== TOP STORIES SIDEBAR =========== */}
              <div className="lg:col-span-4">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-red-600" />

                    <h2 className="font-bold text-slate-900">
                      मुख्य समाचारहरू
                    </h2>
                  </div>

                  <Link
                    to="/news"
                    className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    सबै हेर्नुहोस्
                    <ArrowRight size={13} />
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

      {/* ============= MORE FEATURED COVERAGE ========== */}
      {remainingFeaturedStories.length > 0 && (
        <section className="border-b border-slate-200 bg-slate-50/50 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={<Star size={19} className="text-amber-500" />}
              title="विशेष कभरेज"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingFeaturedStories.map((news) => (
                <FeaturedGridCard key={news._id} news={news} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ LATEST NEWS + TRENDING ============ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">

            {/* ======== LATEST NEWS ========= */}
            <div className="lg:col-span-8">
              <SectionHeader
                icon={<Newspaper size={19} />}
                title="ताजा खबर"
                link="/news"
                linkText="सबै समाचार हेर्नुहोस्"
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

            {/* ======== TRENDING ========= */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <SectionHeader
                  icon={<Flame size={19} className="text-orange-500" />}
                  title="ट्रेन्डिङ"
                />

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {latestNews.slice(0, 5).map((news, index) => (
                    <Link
                      key={news._id}
                      to={`/news/${news.slug}`}
                      className="group flex gap-4 border-b border-slate-100 p-4 transition last:border-0 hover:bg-slate-50"
                    >
                      <span className="text-xl font-black text-slate-200 transition group-hover:text-blue-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                          {getCategoryName(news)}
                        </span>

                        <h3 className="mt-1 line-clamp-2 text-xl font-bold leading-7 text-slate-800 transition group-hover:text-blue-600">
                          {news.title}
                        </h3>

                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
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
      {/* ================ CTA ============== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 sm:px-10">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Star size={22} />
              </div>

              <h2 className="text-2xl font-black leading-tight text-white sm:text-4xl">
                सधैँ सूचित रहनुहोस् |
                <br />
                कुनै पनि समाचार नछुटाउनुहोस्।
              </h2>

              <p className="mt-3 max-w-xl text-lg leading-6 text-slate-400">
                ताजा समाचार, महत्वपूर्ण अपडेट र चर्चित खबरहरू—सबै एकै ठाउँमा
                पाउनुहोस्।
              </p>

              <Link
                to="/news"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-lg font-bold text-white transition hover:bg-blue-500"
              >
                सबै समाचार खोज्नुहोस् |
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

/* ========= FEATURED GRID CARD ======= */
const FeaturedGridCard = ({ news }) => {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
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
          धेरैले पढेको
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
              {getCategoryName(news)}
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} />

              {formatDate(news.publishedAt)}
            </span>
          </div>

          <h3 className="line-clamp-2 text-xl font-bold text-slate-800 group-hover:text-blue-600">
            {news.title}
          </h3>

          {news.summary && (
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
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

/* ========== SECTION HEADER ======== */
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

/* ================= FEATURED SIDE CARD ================ */
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
        <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
          {getCategoryName(news)}
        </span>

        <h3 className="mt-1 line-clamp-3 text-xl font-bold leading-7 text-slate-800 transition group-hover:text-blue-600">
          {news.title}
        </h3>

        <p className="mt-2 text-xs text-slate-400">
          {formatDate(news.publishedAt)}
        </p>
      </div>
    </Link>
  );
};

/* ============ NEWS LIST ITEM =========== */
const NewsListItem = ({ news }) => {
  return (
    <Link to={`/news/${news.slug}`} className="group flex gap-4 py-5">
      <div className="h-28 w-42 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-40 sm:w-52">
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
          <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold uppercase tracking-wide text-blue-600">
            {getCategoryName(news)}
          </span>

          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} />

            {formatDate(news.publishedAt)}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-black leading-7 text-slate-800 transition group-hover:text-blue-600 sm:text-xl">
          {news.title}
        </h3>

        {news.summary && (
          <p className="mt-2 hidden line-clamp-2 text-lg leading-6 text-slate-500 sm:block">
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

/* ================NEWS PLACEHOLDER ============= */
const NewsPlaceholder = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <Newspaper size={30} className="text-slate-300" />
    </div>
  );
};

/* ========= EMPTY STATE============= */
const EmptyState = () => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <Newspaper size={35} className="mx-auto text-slate-300" />

      <h3 className="mt-3 font-bold text-slate-700">कुनै समाचार उपलब्ध छैन।</h3>

      <p className="mt-1 text-sm text-slate-400">
        Check back later for the latest stories.
      </p>
    </div>
  );
};

/* =========GET CATEGORY NAME ======== */
const getCategoryName = (news) => {
  if (!news?.category) {
    return "General";
  }

  if (typeof news.category === "string") {
    return news.category;
  }

  return news.category.name || news.category.title || "General";
};

/* ================== HOME SKELETON ================== */
const HomeSkeleton = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-6 w-1 animate-pulse rounded-full bg-slate-300" />

          <div className="h-4 w-24 animate-pulse rounded bg-slate-300" />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="aspect-video animate-pulse bg-slate-300" />

              <div className="space-y-3 p-5">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-300" />

                <div className="h-7 w-4/5 animate-pulse rounded bg-slate-300" />

                <div className="h-4 w-3/5 animate-pulse rounded bg-slate-300" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="h-5 w-28 animate-pulse rounded bg-slate-300" />

              <div className="h-3 w-14 animate-pulse rounded bg-slate-300" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 border-b border-slate-200 pb-4"
                >
                  <div className="h-24 w-32 shrink-0 animate-pulse rounded-lg bg-slate-300" />

                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-300" />

                    <div className="h-4 w-full animate-pulse rounded bg-slate-300" />

                    <div className="h-4 w-4/5 animate-pulse rounded bg-slate-300" />

                    <div className="h-3 w-24 animate-pulse rounded bg-slate-300" />
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
