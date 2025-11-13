import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AddCourse() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    instructor: "",
    imageBase64: "",
    isFeatured: false,
  });

  
  const categories = ["Web Development", "Data Science", "Design", "Marketing", "Cybersecurity", "Mobile App Development"];

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setCourseData(prev => ({ ...prev, instructor: userName }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData({
      ...courseData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () =>
      setCourseData({ ...courseData, imageBase64: reader.result.split(",")[1] });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      toast.error("Please login first!");
      return;
    }

    const newCourse = {
      ...courseData,
      ownerEmail: userEmail,
    };

    try {
      await axios.post("https://server-two-virid.vercel.app/courses", newCourse);
      toast.success("Course added successfully!");
      setCourseData({
        title: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        instructor: localStorage.getItem("userName") || "",
        imageBase64: "",
        isFeatured: false,
      });
    } catch (err) {
      toast.error("Failed to add course");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={courseData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name"
          value={courseData.instructor}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={courseData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 10 hours)"
          value={courseData.duration}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

       
        <select
          name="category"
          value={courseData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={courseData.isFeatured}
            onChange={handleChange}
          />
          Featured Course
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
