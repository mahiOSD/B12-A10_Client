import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium ${
      isActive ? "text-indigo-600 underline" : "text-gray-700 hover:text-indigo-500"
    }`;

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Learnify
        </Link>

        <nav className="flex gap-4">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/courses" className={navLinkClass}>
            Courses
          </NavLink>
          {token && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
