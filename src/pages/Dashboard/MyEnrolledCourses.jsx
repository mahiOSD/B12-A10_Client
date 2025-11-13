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
        `http://localhost:3000/enrolled-courses?email=${userEmail}`
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!courses.length)
    return (
      <p className="text-center mt-10">
        No enrolled courses yet. <button onClick={fetchEnrolled} className="text-blue-600 underline">Refresh</button>
      </p>
    );

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-semibold mb-4">📘 My Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border p-4 rounded shadow">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">{course.title}</h3>
            <p className="text-gray-600">Instructor: {course.instructor}</p>
            <p className="text-gray-600">Duration: {course.duration}</p>
            <p className="text-gray-600">Price: ৳{course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
