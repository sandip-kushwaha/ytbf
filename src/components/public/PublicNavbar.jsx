// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Search,
//   Newspaper,
//   Home,
//   Clock3,
//   LayoutGrid,
//   Info,
//   Mail,
//   TrendingUp,
//   Bookmark,
//   ChevronRight,
// } from "lucide-react";

// const PublicNavbar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const mainLinks = [
//     {
//       name: "Home",
//       path: "/",
//       icon: Home,
//     },
//     {
//       name: "Latest News",
//       path: "/news",
//       icon: Clock3,
//     },
//     {
//       name: "Categories",
//       path: "/categories",
//       icon: LayoutGrid,
//     },
//     {
//       name: "Trending",
//       path: "/trending",
//       icon: TrendingUp,
//     },
//   ];

//   const categoryLinks = [
//     {
//       name: "Politics",
//       path: "/categories/politics",
//     },
//     {
//       name: "Technology",
//       path: "/categories/technology",
//     },
//     {
//       name: "Business",
//       path: "/categories/business",
//     },
//     {
//       name: "Sports",
//       path: "/categories/sports",
//     },
//     {
//       name: "Entertainment",
//       path: "/categories/entertainment",
//     },
//     {
//       name: "Health",
//       path: "/categories/health",
//     },
//   ];

//   const bottomLinks = [
//     {
//       name: "About",
//       path: "/about",
//       icon: Info,
//     },  
//     {
//       name: "Contact",
//       path: "/contact",
//       icon: Mail,
//     },
//     {
//       name: "Bookmarks",
//       path: "/bookmarks",
//       icon: Bookmark,
//     },
//   ];

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur">
//         <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//           {/* Logo */}
//           <Link
//             to="/"
//             onClick={closeSidebar}
//             className="flex items-center gap-3"
//           >
//             <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
//               <Newspaper size={21} className="text-white" />
//             </div>

//             <div>
//               <h1 className="text-lg font-bold tracking-tight text-white">
//                 NewsPortal
//               </h1>

//               <p className="hidden text-[10px] uppercase tracking-[0.2em] text-gray-500 sm:block">
//                 Latest News
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden items-center gap-1 md:flex">
//             {mainLinks.slice(0, 3).map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `rounded-lg px-4 py-2 text-sm font-medium transition ${
//                     isActive
//                       ? "bg-blue-500/10 text-blue-400"
//                       : "text-gray-400 hover:bg-gray-800 hover:text-white"
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Right Actions */}
//           <div className="flex items-center gap-2">
//             {/* Search */}
//             <Link
//               to="/search"
//               className="rounded-lg p-2.5 text-gray-400 transition hover:bg-gray-800 hover:text-white"
//               title="Search"
//             >
//               <Search size={20} />
//             </Link>

//             {/* Sidebar Button */}
//             <button
//               type="button"
//               onClick={() => setIsSidebarOpen(true)}
//               className="rounded-lg p-2.5 text-gray-400 transition hover:bg-gray-800 hover:text-white"
//               title="Open menu"
//             >
//               <Menu size={22} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* ================= SIDEBAR OVERLAY ================= */}
//       {isSidebarOpen && (
//         <div
//           onClick={closeSidebar}
//           className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
//         />
//       )}

//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`fixed right-0 top-0 z-70 h-screen w-75 max-w-[85vw] transform border-l border-gray-800 bg-gray-950 shadow-2xl transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5">
//           <div className="flex items-center gap-3">
//             <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600">
//               <Newspaper size={19} className="text-white" />
//             </div>

//             <div>
//               <h2 className="text-sm font-bold text-white">NewsPortal</h2>

//               <p className="text-[10px] uppercase tracking-wider text-gray-500">
//                 Navigation
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={closeSidebar}
//             className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Sidebar Content */}
//         <div className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-5 scrollbar-thumb-gray-500">
//           {/* Main Navigation */}
//           <div>
//             <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
//               Navigation
//             </p>

//             <nav className="space-y-1">
//               {mainLinks.map((link) => {
//                 const Icon = link.icon;

//                 return (
//                   <NavLink
//                     key={link.path}
//                     to={link.path}
//                     onClick={closeSidebar}
//                     className={({ isActive }) =>
//                       `group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition ${
//                         isActive
//                           ? "bg-blue-600/10 text-blue-400"
//                           : "text-gray-400 hover:bg-gray-800 hover:text-white"
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         <div className="flex items-center gap-3">
//                           <Icon size={18} />

//                           <span>{link.name}</span>
//                         </div>

//                         <ChevronRight
//                           size={16}
//                           className={`transition ${
//                             isActive
//                               ? "opacity-100"
//                               : "opacity-0 group-hover:opacity-100"
//                           }`}
//                         />
//                       </>
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* Categories */}
//           <div className="mt-7">
//             <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
//               Categories
//             </p>

//             <nav className="space-y-1">
//               {categoryLinks.map((category) => (
//                 <NavLink
//                   key={category.path}
//                   to={category.path}
//                   onClick={closeSidebar}
//                   className={({ isActive }) =>
//                     `group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
//                       isActive
//                         ? "bg-blue-600/10 text-blue-400"
//                         : "text-gray-500 hover:bg-gray-800 hover:text-white"
//                     }`
//                   }
//                 >
//                   {({ isActive }) => (
//                     <>
//                       <span>{category.name}</span>

//                       <ChevronRight
//                         size={15}
//                         className={`transition ${
//                           isActive
//                             ? "opacity-100"
//                             : "opacity-0 group-hover:opacity-100"
//                         }`}
//                       />
//                     </>
//                   )}
//                 </NavLink>
//               ))}
//             </nav>
//           </div>

//           {/* Other */}
//           <div className="mt-7">
//             <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
//               More
//             </p>

//             <nav className="space-y-1">
//               {bottomLinks.map((link) => {
//                 const Icon = link.icon;

//                 return (
//                   <NavLink
//                     key={link.path}
//                     to={link.path}
//                     onClick={closeSidebar}
//                     className={({ isActive }) =>
//                       `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
//                         isActive
//                           ? "bg-blue-600/10 text-blue-400"
//                           : "text-gray-400 hover:bg-gray-800 hover:text-white"
//                       }`
//                     }
//                   >
//                     <Icon size={18} />
//                     {link.name}
//                   </NavLink>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* Search Card */}
//           <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/70 p-4">
//             <div className="flex items-start gap-3">
//               <div className="rounded-lg bg-gray-800 p-2">
//                 <Search size={18} className="text-gray-300" />
//               </div>

//               <div className="min-w-0">
//                 <h3 className="text-sm font-semibold text-white">Find News</h3>

//                 <p className="mt-1 text-xs leading-5 text-gray-500">
//                   Search articles, categories and latest stories.
//                 </p>
//               </div>
//             </div>

//             <Link
//               to="/search"
//               onClick={closeSidebar}
//               className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
//             >
//               Search News
//             </Link>
//           </div>

//           {/* Footer */}
//           <div className="mt-8 border-t border-gray-800 pt-5">
//             <p className="text-center text-xs text-gray-600">
//               © {new Date().getFullYear()} NewsPortal
//             </p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default PublicNavbar;

import { useState } from "react";
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
  Bookmark,
  ChevronRight,
} from "lucide-react";

const PublicNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const categoryLinks = [
    {
      name: "Politics",
      path: "/categories/politics",
    },
    {
      name: "Technology",
      path: "/categories/technology",
    },
    {
      name: "Business",
      path: "/categories/business",
    },
    {
      name: "Sports",
      path: "/categories/sports",
    },
    {
      name: "Entertainment",
      path: "/categories/entertainment",
    },
    {
      name: "Health",
      path: "/categories/health",
    },
  ];

  const moreLinks = [
    {
      name: "Featured",
      path: "/featured",
      icon: Star,
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
      icon: Bookmark,
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
    },
  ];

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur-xl">
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeSidebar}
            className="group flex items-center gap-3"
          >
            {/* Logo Icon */}
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 transition group-hover:bg-blue-500">
              <Newspaper
                size={21}
                strokeWidth={2.2}
                className="text-white"
              />
            </div>

            {/* Logo Text */}
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-white">
                NewsPortal
              </h1>

              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gray-500">
                Stay Informed
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
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

      {/* =====================================================
          OVERLAY
      ====================================================== */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-60 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ${
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* =====================================================
          SIDE NAVIGATION
      ====================================================== */}
      <aside
        className={`fixed right-0 top-0 z-70 h-screen w-[320px] max-w-[88vw] border-l border-gray-800 bg-gray-950 shadow-2xl transition-transform duration-300 ease-out ${
          sidebarOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* ================= SIDEBAR HEADER ================= */}
        <div className="flex h-17 items-center justify-between border-b border-gray-800 px-5">

          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600">
              <Newspaper
                size={19}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">
                NewsPortal
              </h2>

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

        {/* ================= SIDEBAR BODY ================= */}
        <div className="h-[calc(100vh-68px)] overflow-y-auto px-4 py-6">

          {/* ================= MAIN ================= */}
          <SidebarSection title="Main">
            {mainLinks.map((link) => {
              const Icon = link.icon;

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

          {/* ================= CATEGORIES ================= */}
          <SidebarSection title="Top Categories" className="mt-8">
            <div className="space-y-1">
              {categoryLinks.map((category) => (
                <NavLink
                  key={category.path}
                  to={category.path}
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
                      <span>{category.name}</span>

                      <ChevronRight
                        size={15}
                        className={`transition ${
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
          </SidebarSection>

          {/* ================= MORE ================= */}
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

          {/* ================= SEARCH CARD ================= */}
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/60 p-4">

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gray-800 p-2">
                <Search
                  size={18}
                  className="text-blue-400"
                />
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

          {/* ================= FOOTER ================= */}
          <div className="mt-8 border-t border-gray-800 pt-5">
            <p className="text-center text-[11px] text-gray-600">
              © {new Date().getFullYear()} NewsPortal
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};


/* ============================================================
   SIDEBAR SECTION
============================================================ */

const SidebarSection = ({
  title,
  children,
  className = "",
}) => {
  return (
    <section className={className}>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600">
        {title}
      </p>

      <nav className="space-y-1">
        {children}
      </nav>
    </section>
  );
};


/* ============================================================
   SIDEBAR LINK
============================================================ */

const SidebarLink = ({
  link,
  icon: Icon,
  onClick,
  end = false,
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

          <ChevronRight
            size={15}
            className={`transition ${
              isActive
                ? "translate-x-0 opacity-100"
                : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            }`}
          />
        </>
      )}
    </NavLink>
  );
};

export default PublicNavbar;