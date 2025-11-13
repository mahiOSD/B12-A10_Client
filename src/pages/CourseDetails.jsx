import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://server-two-virid.vercel.app/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        toast.error("Failed to fetch course");
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        toast.error("You must be logged in to enroll.");
        return;
      }

      await axios.post(`https://server-two-virid.vercel.app/enroll/${id}`, { email: userEmail });
      toast.success("Enrolled successfully!");
    } catch (err) {
      toast.error("Failed to enroll in course");
    }
  };

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Toaster />
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold text-indigo-600 mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
      <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
      <p className="text-gray-600 mb-2">Category: {course.category}</p>
      <p className="text-gray-600 mb-4">Price: ৳{course.price}</p>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <button
        onClick={handleEnroll}
         className="px-6 py-3 rounded-lg font-semibold text-white 
             bg-linear-to-r from-indigo-500 to-blue-500 
             hover:from-indigo-600 hover:to-blue-600 
             transition-all"
      >
        Enroll Now
      </button>
    </div>
  );
}
