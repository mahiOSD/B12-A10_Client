import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaBook, FaPlusCircle, FaClipboardList } from "react-icons/fa";

export default function DashboardLayout() {
  const location = useLocation(); 

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
        : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
    }`;

  const showPlaceholder = location.pathname === "/dashboard"; 

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      
      <aside className="w-64 bg-white text-white shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard/enrolled" className={navLinkClass}>
            <FaBook /> My Enrolled Courses
          </NavLink>
          <NavLink to="/dashboard/add-course" className={navLinkClass}>
            <FaPlusCircle /> Add Course
          </NavLink>
          <NavLink to="/dashboard/my-courses" className={navLinkClass}>
            <FaClipboardList /> My Added Courses
          </NavLink>
        </nav>
      </aside>

      
      <main className="flex-1 p-10 flex flex-col justify-center items-center">
        <Outlet />

        {showPlaceholder && (
          <div className="w-full max-w-lg mt-10 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl p-12 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="text-8xl mb-6 animate-bounce">📚</div>
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">
              Welcome to your Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Select an option from the sidebar to start exploring your courses.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
