import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import MyEnrolledCourses from "./pages/Dashboard/MyEnrolledCourses";
import AddCourse from "./pages/Dashboard/AddCourse";
import MyAddedCourses from "./pages/Dashboard/MyAddedCourses";
import UpdateCourse from "./pages/Dashboard/UpdateCourse";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-[80vh] pt-20 px-4">
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/courses/:id"
            element={
              <PrivateRoute>
                <CourseDetails />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

       
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
            <Route
              path="update-course/:id"
              element={
                <PrivateRoute>
                  <UpdateCourse />
                </PrivateRoute>
              }
            />
          </Route>

          
          <Route
            path="/update-course/:id"
            element={
              <PrivateRoute>
                <UpdateCourse />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;
