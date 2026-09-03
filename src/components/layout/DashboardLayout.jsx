import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main area */}
      <div className="lg:ml-64">

        {/* Navbar */}
        <Navbar setIsOpen={setIsOpen} />

        {/* Page content */}
        <main className="min-h-[calc(100vh-128px)] p-4 sm:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};

export default DashboardLayout;