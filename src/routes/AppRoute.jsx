import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import DashboardLayout from "../components/layout/DashboardLayout";

import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import News from "../pages/admin/News";
import Profile from "../pages/admin/Profile";
import Analysis from "../pages/admin/Analysis";

//Public
import PublicLayout from "../components/public/PublicLayout";
import Home from "../pages/public/Home";
import PublicNews from "../pages/public/PublicNews";
import NewsDetails from "../pages/public/NewsDetails";
import CategoryNews from "../pages/public/CategoryNews";
import Search from "../pages/public/Search";

const AppRoute = () => {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<PublicNews />} />
        <Route path="/news/:id" element={<NewsDetails />} />

        {/* <Route path="/categories" element={<CategoryNews />} /> */}
        <Route path="/categories/:slug" element={<CategoryNews />} />

        <Route path="/trending" element={<h1>Trending</h1>} />
        <Route path="/search" element={<Search />} />

        <Route path="/bookmarks" element={<h1>Bookmarks</h1>} />

        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Route>

      {/* LOGIN  */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

      {/* ADMIN */}
      {/* Protected route */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/news" element={<News />} />
          <Route path="/admin/analytics" element={<Analysis />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
