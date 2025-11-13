import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = formData.password;
    if (!/[A-Z]/.test(password))
      return toast.error("Password must have at least one uppercase letter.");
    if (!/[a-z]/.test(password))
      return toast.error("Password must have at least one lowercase letter.");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long.");

    try {
      const res = await axios.post("http://localhost:3000/register", formData);
      toast.success(res.data.message);

    
      localStorage.setItem("userName", formData.name);
      localStorage.setItem("userEmail", formData.email);
      if (res.data.token) localStorage.setItem("token", res.data.token);

      navigate("/login"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
      const res = await axios.post("http://localhost:3000/google-login", userData);
      toast.success(res.data.message);

      
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("token", res.data.token);

      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          name="photoURL"
          placeholder="Photo URL"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all"
        >
          Register
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

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
