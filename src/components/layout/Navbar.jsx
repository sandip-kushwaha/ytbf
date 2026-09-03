import {
  Bell,
  Menu,
  UserCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

const Navbar = ({ setIsOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-NP", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-NP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between
        border-b border-gray-800 bg-gray-950/95 px-4 backdrop-blur sm:px-6"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile menu */}
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800
           hover:text-white lg:hidden">
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Admin Dashboard
          </h2>

          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your news website
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Date & Time */}
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-gray-300">
            {formattedTime}
          </p>

          <p className="text-xs text-gray-500">
            {formattedDate}
          </p>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-800 sm:block" />

        {/* Admin profile */}
        <div className="flex items-center gap-2">
          <UserCircle size={34} className="text-gray-400"/>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;