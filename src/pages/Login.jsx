import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://server-two-virid.vercel.app/login",
        formData
      );

      
      toast.success(res.data.message, { duration: 3000 });

     
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", res.data.name || formData.email);

      
      setTimeout(() => navigate("/"), 3000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", { duration: 3000 });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      const res = await axios.post(
        "https://server-two-virid.vercel.app/google-login",
        userData
      );

      toast.success(res.data.message, { duration: 3000 });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.displayName);

      setTimeout(() => navigate("/"), 3000);

    } catch (err) {
      console.error(err);
      toast.error("Google login failed", { duration: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
     
      <Toaster position="top-center" />
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md transition-all">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Login
        </h2>

    
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-xl mt-4 bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
            alt="Google logo"
            className="w-6 h-6"
          />
          Sign in with Google
        </button>

        
        <p className="text-center text-sm mt-4 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
