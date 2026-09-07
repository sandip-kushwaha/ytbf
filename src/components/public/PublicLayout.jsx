import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";
import BreakingNews from "./BreakingNews";

import { getPublishedNews } from "../../api/news.api";

const PublicLayout = () => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await getPublishedNews({
          page: 1,
          limit: 10,
        });

        setLatestNews(response.data?.news || []);
      } catch (error) {
        console.error("Failed to load breaking news:", error);

        setLatestNews([]);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <PublicNavbar />

      <BreakingNews news={latestNews} />

      <main className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
