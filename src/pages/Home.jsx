import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="text-center mt-10 pt-20">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        🎓 Welcome to Online Learning Platform
      </h1>
      <p className="text-gray-600 mb-6">
        You are successfully logged in! Explore and manage your learning journey.
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </div>
  );
}
