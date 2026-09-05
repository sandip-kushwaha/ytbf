import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";
import BreakingNews from "./BreakingNews";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <PublicNavbar />
      

      <main className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
