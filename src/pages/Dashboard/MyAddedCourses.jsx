import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MyAddedCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); 

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://server-two-virid.vercel.app/courses");
      const myCourses = res.data.filter(c => c.ownerEmail === userEmail);
      setCourses(myCourses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`https://server-two-virid.vercel.app/courses/${id}`);
      toast.success("Course deleted successfully!");
      fetchCourses();
    } catch (err) {
      toast.error("Failed to delete course.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="pt-0 px-0">
     
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-600">
          My Added Courses
        </h2>
        <p className="text-gray-500 mt-2">
          Manage and update the courses you have added
        </p>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-2xl shadow-lg flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-500 mb-2">৳{course.price}</p>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => navigate(`/courses/${course._id}`)}
                className="bg-indigo-600 text-white py-1 px-3 rounded-lg hover:bg-indigo-700"
              >
                View Details
              </button>
              <button
                onClick={() => navigate(`/update-course/${course._id}`)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
