import { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = category
          ? `http://localhost:3000/courses?category=${category}`
          : "http://localhost:3000/courses";
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
      <div className="flex justify-center gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === "All" ? "" : cat)}
            className={`px-4 py-2 rounded-md font-semibold ${
              category === cat ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
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
            <button className="mt-auto bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
