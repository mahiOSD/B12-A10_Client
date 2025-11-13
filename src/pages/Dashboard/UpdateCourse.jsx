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
    instructor: "",
    imageBase64: ""
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/courses`);
        const course = res.data.find(c => c._id === id);
        if (course) {
          setCourseData({
            title: course.title,
            description: course.description,
            category: course.category,
            price: course.price,
            instructor: course.instructor,
            imageBase64: course.image
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = e => setCourseData({ ...courseData, [e.target.name]: e.target.value });

  const handleImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setCourseData({ ...courseData, imageBase64: reader.result.split(",")[1] });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, courseData);
      toast.success("Course updated successfully!");
      navigate("/dashboard/my-courses");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4">
      <input type="text" name="title" value={courseData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
      <textarea name="description" value={courseData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="category" value={courseData.category} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="number" name="price" value={courseData.price} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="instructor" value={courseData.instructor} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="file" onChange={handleImage} />
      <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
        Update Course
      </button>
    </form>
  );
}
