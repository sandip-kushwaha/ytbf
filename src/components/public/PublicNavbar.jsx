import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Newspaper,
  Home,
  Clock3,
  LayoutGrid,
  TrendingUp,
  Star,
  Info,
  Mail,
  ChevronRight,
} from "lucide-react";

import { getAllCategories } from "../../api/category.api";

const PublicNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categoryLinks, setCategoryLinks] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // Category menu open state
  const [categoriesMegaOpen, setCategoriesMegaOpen] = useState(false);

  // Used to prevent hover flickering
  const closeTimerRef = useRef(null);

  // =========================================================
  // MAIN LINKS
  // =========================================================

  const mainLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Latest",
      path: "/news",
      icon: Clock3,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: LayoutGrid,
    },
    {
      name: "Trending",
      path: "/trending",
      icon: TrendingUp,
    },
  ];

  // MORE LINKS
  const moreLinks = [
    {
      name: "Featured",
      path: "/featured",
      icon: Star,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
    },
  ];

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCategories();

      const categoryData = response.data || [];

      const activeCategories = Array.isArray(categoryData)
        ? categoryData.filter((category) => category.isActive)
        : [];

      setCategoryLinks(activeCategories);
    } catch (error) {
      console.error("Failed to load categories:", error);

      setError(error?.response?.data?.message || "Failed to load categories");

      setCategoryLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CLOSE SIDEBAR
  const closeSidebar = () => {
    setSidebarOpen(false);
    setCategoriesMegaOpen(false);
  };

  // OPEN CATEGORY MENU
  const openCategoriesMega = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setCategoriesMegaOpen(true);
  };

  // CLOSE CATEGORY MENU WITH SMALL DELAY
  const closeCategoriesMegaWithDelay = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setCategoriesMegaOpen(false);
    }, 150);
  };

  // KEEP CATEGORY MENU OPEN
  const keepCategoriesMegaOpen = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setCategoriesMegaOpen(true);
  };

  // CLEANUP TIMER
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* ==========TOP NAVBAR ===== */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur-xl">
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* =========== LOGO========= */}
          <Link
            to="/"
            onClick={closeSidebar}
            className="group flex items-center gap-3"
          >
            {/* Logo Icon */}
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 transition group-hover:bg-blue-500">
              <Newspaper size={21} strokeWidth={2.2} className="text-white" />
            </div>

            {/* Logo Text */}
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-white">
                समाचार पोर्टल
              </h1>

              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gray-500">
                Stay Informed
              </p>
            </div>
          </Link>

          {/* =======DESKTOP NAVIGATION ====== */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainLinks
              .filter((link) => link.name !== "Categories")
              .map((link) => {
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-600/10 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
          </nav>

          {/* ======== RIGHT ACTIONS ======== */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <Link
              to="/search"
              className="rounded-xl p-2.5 text-gray-400 transition hover:bg-gray-800 hover:text-white"
              title="Search news"
            >
              <Search size={20} />
            </Link>

            {/* Divider */}
            <div className="mx-1 hidden h-6 w-px bg-gray-800 sm:block" />

            {/* Menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2.5 text-gray-400 transition hover:bg-gray-800 hover:text-white"
              title="Open navigation"
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ============ OVERLAY ======== */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-60 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ${
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ================ SIDE NAVIGATION ============ */}
      <aside
        className={`fixed right-0 top-0 z-70 h-screen w-[320px] max-w-[88vw] border-l border-gray-800 bg-gray-950 shadow-2xl transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ========== SIDEBAR HEADER ======== */}
        <div className="flex h-17 items-center justify-between border-b border-gray-800 px-5">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600">
              <Newspaper size={19} className="text-white" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">NewsPortal</h2>

              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
                Navigation
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
            aria-label="Close navigation"
          >
            <X size={21} />
          </button>
        </div>

        {/* =========== SIDEBAR BODY ========= */}
        <div className="h-[calc(100vh-68px)] overflow-y-auto px-4 py-6">
          {/* ============== MAIN ============= */}
          <SidebarSection title="Main">
            {mainLinks.map((link) => {
              const Icon = link.icon;

              {
                /* ============== CATEGORIES SPECIAL ITEM =========== */
              }
              if (link.name === "Categories") {
                return (
                  <div
                    key={link.path}
                    onMouseEnter={openCategoriesMega}
                    onMouseLeave={closeCategoriesMegaWithDelay}
                  >
                    {/* Categories Button */}
                    <button
                      type="button"
                      onClick={() => setCategoriesMegaOpen((prev) => !prev)}
                      className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition ${
                        categoriesMegaOpen
                          ? "bg-blue-600/10 text-blue-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={18}
                          strokeWidth={1.9}
                          className={
                            categoriesMegaOpen
                              ? "text-blue-400"
                              : "text-gray-500 group-hover:text-gray-300"
                          }
                        />

                        <span>Categories</span>
                      </div>

                      <ChevronRight
                        size={15}
                        className={`transition-transform duration-200 ${
                          categoriesMegaOpen
                            ? "rotate-90 text-blue-400"
                            : "text-gray-500"
                        }`}
                      />
                    </button>

                    {/* ============ MOBILE CATEGORY LIST ========= */}
                    <div
                      className={`overflow-hidden transition-all duration-300 md:hidden ${
                        categoriesMegaOpen
                          ? "mt-2 max-h-150 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 space-y-1 border-l border-gray-800 pl-3">
                        {/* Loading */}

                        {loading ? (
                          [1, 2, 3, 4, 5].map((item) => (
                            <div
                              key={item}
                              className="h-9 animate-pulse rounded-lg bg-gray-800"
                            />
                          ))
                        ) : error ? (
                          /* Error */
                          <div className="rounded-lg bg-red-950/30 px-3 py-3">
                            <p className="text-xs text-red-400">{error}</p>
                          </div>
                        ) : categoryLinks.length === 0 ? (
                          /* Empty */
                          <div className="rounded-lg bg-gray-900 px-3 py-3">
                            <p className="text-xs text-gray-500">
                              No categories available
                            </p>
                          </div>
                        ) : (
                          /* Category List */
                          categoryLinks.map((category) => (
                            <NavLink
                              key={category._id}
                              to={`/categories/${category.slug}`}
                              onClick={closeSidebar}
                              className={({ isActive }) =>
                                `group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                                  isActive
                                    ? "bg-blue-600/10 text-blue-400"
                                    : "text-gray-500 hover:bg-gray-800 hover:text-white"
                                }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  <span>{category.name}</span>

                                  <ChevronRight
                                    size={14}
                                    className={`transition ${
                                      isActive
                                        ? "translate-x-0 text-blue-400 opacity-100"
                                        : "-translate-x-1 text-gray-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                    }`}
                                  />
                                </>
                              )}
                            </NavLink>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              {
                /* ============== NORMAL LINKS ============ */
              }
              return (
                <SidebarLink
                  key={link.path}
                  link={link}
                  icon={Icon}
                  onClick={closeSidebar}
                  end={link.path === "/"}
                />
              );
            })}
          </SidebarSection>

          {/* ============ MORE =============== */}
          <SidebarSection title="More" className="mt-8">
            {moreLinks.map((link) => {
              const Icon = link.icon;

              return (
                <SidebarLink
                  key={link.path}
                  link={link}
                  icon={Icon}
                  onClick={closeSidebar}
                />
              );
            })}
          </SidebarSection>

          {/* ============ SEARCH CARD ========== */}
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gray-800 p-2">
                <Search size={18} className="text-blue-400" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Search News
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Find the latest stories, articles and updates.
                </p>
              </div>
            </div>

            <Link
              to="/search"
              onClick={closeSidebar}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Search size={16} />
              Search
            </Link>
          </div>

          {/* ========== FOOTER ==== */}
          <div className="mt-8 border-t border-gray-800 pt-5">
            <p className="text-center text-[11px] text-gray-600">
              © {new Date().getFullYear()} NewsPortal
            </p>
          </div>
        </div>
      </aside>

      {/* =====================================================
          DESKTOP CATEGORY MEGA MENU

          Hidden on mobile.
      ====================================================== */}

      {sidebarOpen && categoriesMegaOpen && (
        <div
          onMouseEnter={keepCategoriesMegaOpen}
          onMouseLeave={closeCategoriesMegaWithDelay}
          className="fixed right-83 top-26 z-100 hidden w-75 md:block"
        >
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Header */}

            <div className="mb-3 flex items-center gap-2 border-b border-gray-800 pb-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600/10">
                <LayoutGrid size={17} className="text-blue-400" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">All Categories</h3>

                <p className="text-[10px] text-gray-500">
                  Browse news categories
                </p>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-10 animate-pulse rounded-lg bg-gray-800"
                  />
                ))}
              </div>
            ) : error ? (
              /* Error */
              <div className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-5 text-center">
                <p className="text-xs font-medium text-red-400">{error}</p>
              </div>
            ) : categoryLinks.length === 0 ? (
              /* Empty */

              <div className="rounded-xl bg-gray-900 px-4 py-7 text-center">
                <LayoutGrid size={23} className="mx-auto mb-2 text-gray-600" />

                <p className="text-xs font-medium text-gray-400">
                  No categories available
                </p>
              </div>
            ) : (
              /* ============ CATEGORY LIST ONLY ======= */
              <div className="space-y-1">
                {categoryLinks.map((category) => (
                  <NavLink
                    key={category._id}
                    to={`/categories/${category.slug}`}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                        isActive
                          ? "bg-blue-600/10 text-blue-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <div
                            className={`grid h-7 w-7 place-items-center rounded-md transition ${
                              isActive
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-gray-900 text-gray-600 group-hover:bg-blue-600/10 group-hover:text-blue-400"
                            }`}
                          >
                            <LayoutGrid size={14} />
                          </div>

                          <span className="font-medium">{category.name}</span>
                        </div>

                        <ChevronRight
                          size={15}
                          className={`transition-all ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

/* ============= SIDEBAR SECTION ============= */
const SidebarSection = ({ title, children, className = "" }) => {
  return (
    <section className={className}>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600">
        {title}
      </p>

      <nav className="space-y-1">{children}</nav>
    </section>
  );
};

/* =========== SIDEBAR LINK ========== */
const SidebarLink = ({
  link,
  icon: Icon,
  onClick,
  end = false,
  hasArrow = true,
}) => {
  return (
    <NavLink
      to={link.path}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition ${
          isActive
            ? "bg-blue-600/10 text-blue-400"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <Icon
              size={18}
              strokeWidth={1.9}
              className={
                isActive
                  ? "text-blue-400"
                  : "text-gray-500 group-hover:text-gray-300"
              }
            />

            <span>{link.name}</span>
          </div>

          {hasArrow && (
            <ChevronRight
              size={15}
              className={`transition ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

export default PublicNavbar;
