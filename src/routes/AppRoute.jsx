import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import Login from '../pages/auth/Login'
import AdminDashboard from '../pages/admin/AdminDashboard'

const AppRoute = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        {/* Protected route */}
        <Route element={<ProtectedRoute />}>
           <Route element={<RoleRoute allowedRoles={["admin"]} />} />
           <Route path='/admin' element={<AdminDashboard />} />
        </Route>
    </Routes> 
  )
}

export default AppRoute