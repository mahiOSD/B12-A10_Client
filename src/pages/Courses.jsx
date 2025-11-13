import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = category
          ? `https://server-two-virid.vercel.app/courses?category=${category}`
          : "https://server-two-virid.vercel.app/courses";
        const res = await axios.get(url);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [category]);

  const categories = ["All", "Web Development", "Data Science", "Design", "Marketing"];

  return (
    <div className="pt-24 px-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        All Courses
      </h1>
     <div className="flex justify-center gap-4 mb-6 flex-wrap">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setCategory(cat === "All" ? "" : cat)}
      className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 
                  ${
                    category === cat
                      ? "bg-linear-to-r from-indigo-500 to-blue-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                  }`}
    >
      {cat}
    </button>
  ))}
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-2xl shadow-lg flex flex-col">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-indigo-600 mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-gray-500 mb-2">Category: {course.category}</p>
            <p className="text-gray-500 mb-4">Price: ৳{course.price}</p>
            <button
              onClick={() => navigate(`/courses/${course._id}`)} 
               className="px-6 py-3 rounded-lg font-semibold text-white 
             bg-linear-to-r from-indigo-500 to-blue-500 
             hover:from-indigo-600 hover:to-blue-600 
             transition-all"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
