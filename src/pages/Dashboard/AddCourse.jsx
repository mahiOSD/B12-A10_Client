import { useState } from "react";
import axios from "axios";

export default function AddCourse() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    instructor: "",
    imageBase64: ""
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
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
    await axios.post("http://localhost:3000/courses", courseData);
    alert("Course added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="instructor"
        placeholder="Instructor"
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input type="file" accept="image/*" onChange={handleImage} required />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add Course
      </button>
    </form>
  );
}
