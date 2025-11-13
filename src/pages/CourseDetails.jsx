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
        const res = await axios.get(`http://localhost:3000/courses`);
        const found = res.data.find((c) => c._id === id);
        setCourse(found);
      } catch (err) {
        toast.error("Failed to fetch course");
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    toast.success("Enrolled successfully!");
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
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Enroll Now
      </button>
    </div>
  );
}
