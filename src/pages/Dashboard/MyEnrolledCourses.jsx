import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function MyEnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolled = async () => {
    try {
      setLoading(true);
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        toast.error("You must be logged in to view enrolled courses.");
        setCourses([]);
        return;
      }

      const res = await axios.get(
        `https://server-two-virid.vercel.app/enrolled-courses?email=${userEmail}`
      );
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolled();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!courses.length)
    return (
      <p className="text-center mt-10 text-gray-600">
        You have not enrolled in any courses yet.
      </p>
    );

  return (
    <div className="pt-24 px-6">
      <Toaster />

     
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-600">
          My Enrolled Courses
        </h2>
        <p className="text-gray-500 mt-2">
          Browse the courses you are currently enrolled in
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-5 flex flex-col transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-xl text-indigo-600 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              Instructor: {course.instructor}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              Duration: {course.duration}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Price: ৳{course.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
