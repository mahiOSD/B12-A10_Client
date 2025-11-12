import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const featuredCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Learn HTML, CSS, JavaScript, React & Node.js from scratch.",
      image: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010134.jpg",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      description: "Master Python, Pandas, and ML algorithms for data insights.",
      image: "https://img.freepik.com/free-photo/ai-machine-learning-concept_23-2148686048.jpg",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Create stunning designs and user experiences using Figma.",
      image: "https://img.freepik.com/free-photo/ui-ux-designers-working-app_23-2148689040.jpg",
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Grow online presence with SEO, social media & analytics.",
      image: "https://img.freepik.com/free-photo/marketing-digital-strategy-with-icons_53876-94857.jpg",
    },
    {
      id: 5,
      title: "Cybersecurity Basics",
      description: "Understand online threats and learn how to stay secure.",
      image: "https://img.freepik.com/free-photo/hacker-background_53876-101619.jpg",
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Develop Android & iOS apps using React Native.",
      image: "https://img.freepik.com/free-photo/app-development-concept-banner_23-2148684983.jpg",
    },
  ];

  return (
    <div className="mt-24 space-y-24">
     
      <section className="text-center px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Learnify – Your Path to Knowledge 
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Explore expert-led courses, develop real-world skills, and achieve your career goals
          — all from one platform.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/courses")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Explore Courses
        </motion.button>
      </section>

     
      <section className="px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
           Popular Courses
        </motion.h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-indigo-600">{course.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{course.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    
      <section className="bg-indigo-50 py-16 text-center px-6">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
           Why Choose Learnify?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Expert Instructors", desc: "Learn from industry professionals with real experience." },
            { title: "Flexible Learning", desc: "Access courses anytime, anywhere on any device." },
            { title: "Certifications", desc: "Earn certificates to showcase your skills to employers." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-indigo-600">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

     
      <section className="px-6 pb-20 text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          👩‍🏫 Top Instructors
        </motion.h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Sarah Ahmed", role: "Web Development Expert", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "John Smith", role: "Data Science Mentor", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Emily Davis", role: "UI/UX Designer", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
          ].map((instructor, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-indigo-600">{instructor.name}</h3>
              <p className="text-gray-600">{instructor.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
