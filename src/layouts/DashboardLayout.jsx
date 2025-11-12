// src/layouts/DashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md ${
      isActive ? "bg-indigo-100 text-indigo-600" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white shadow-md p-5 space-y-3">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Dashboard</h2>
        <NavLink to="/dashboard/enrolled" className={navLinkClass}>
          My Enrolled Courses
        </NavLink>
        <NavLink to="/dashboard/add-course" className={navLinkClass}>
          Add Course
        </NavLink>
        <NavLink to="/dashboard/my-courses" className={navLinkClass}>
          My Added Courses
        </NavLink>
      </aside>

      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
