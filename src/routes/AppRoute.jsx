import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import Categories from "../pages/category/Categories";
import News from "../pages/news/News";
import Profile from "../pages/profile/Profile";
import Analysis from "../pages/analysis/Analysis";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

      {/* Protected route */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/categories" element={<Categories/>} />
          <Route path="/admin/news" element={<News />} />
          <Route path="/admin/analytics" element={<Analysis />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoute;
