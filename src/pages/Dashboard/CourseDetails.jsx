import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        toast.error("Failed to fetch course");
      } finally {
        setLoading(false);
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

      await axios.post(`http://localhost:3000/enroll/${id}`, { email: userEmail });
      toast.success("Enrolled successfully!");
    } catch (err) {
      toast.error("Enrollment failed.");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-center mt-10">Course not found.</p>;

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
