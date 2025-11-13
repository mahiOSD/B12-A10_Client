import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png"; 

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-10 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        
     
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img src={logo} alt="Learnify Logo" className="w-10 h-10 object-contain" />
          <span className="text-indigo-600 font-bold text-xl">Learnify</span>
        </div>

       
        <p className="text-gray-600 text-center md:text-left">
          &copy; {new Date().getFullYear()} Learnify. All rights reserved.
        </p>

       
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-500 transition"
            target="_blank"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-500 transition"
            target="_blank"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-500 transition"
            target="_blank"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
