import {
  BarChart3,
  FileText,
  Folder,
  Home,
  LogOut,
  UserPen,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      end: true,
      icon: Home,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Folder,
    },
    {
      name: "News",
      path: "/admin/news",
      icon: FileText,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Profile",
      path: "/admin/profile",
      end: true,
      icon: UserPen,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64
          border-r border-gray-800 bg-gray-950 text-white
          transition-transform duration-300 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5">
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white">
              <img
                src={logo}
                alt="NewsPortal Logo"
                className="h-full w-full object-contain "
              />
            </div>

            {/* Logo Text */}
            <div>
              <div className="flex items-end">
                <h1 className="text-[27px] font-black leading-none tracking-tight">
                  <span className="text-blue-400">युथ</span>
                  <span className="ml-1.5 text-red-500">ब्रेन</span>
                </h1>

                <span className="text-[9px] font-extrabold tracking-widest text-blue-800 shadow-sm">
                  न्युज
                </span>
              </div>

              <p className="mt-1.5 text-[8px] font-medium uppercase tracking-[0.3em] text-gray-500">
                सधैं सत्य • सधैं अगाडि
              </p>
            </div>
          </div>

          {/* Close button mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex h-[calc(100vh-64px)] flex-col px-3 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3
                    text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Bottom section */}
          <div className="mt-auto border-t border-gray-800 pt-4">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium
                text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={19} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
