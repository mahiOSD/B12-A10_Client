import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    instructor: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses/${id}`);
        
        setCourseData({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category || "",
          price: res.data.price || "",
          duration: res.data.duration || "",
          instructor: res.data.instructor || "",
        });
      } catch (err) {
        toast.error("Failed to load course details.");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, courseData);
      toast.success("Course updated successfully!");
      navigate("/dashboard/my-courses");
    } catch (err) {
      toast.error("Failed to update course.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={courseData.title || ""}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="instructor"
          value={courseData.instructor || ""}
          onChange={handleChange}
          placeholder="Instructor"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={courseData.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="duration"
          value={courseData.duration || ""}
          onChange={handleChange}
          placeholder="Duration"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={courseData.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={courseData.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}
