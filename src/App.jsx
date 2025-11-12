import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import MyEnrolledCourses from "./pages/Dashboard/MyEnrolledCourses";
import AddCourse from "./pages/Dashboard/AddCourse";
import MyAddedCourses from "./pages/Dashboard/MyAddedCourses";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-[80vh] pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="enrolled" element={<MyEnrolledCourses />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyAddedCourses />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
