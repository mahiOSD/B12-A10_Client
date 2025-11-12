export default function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-10 py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-3">
          <span className="text-indigo-600 font-bold text-xl">🎓 Learnify</span>
        </div>
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Learnify. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-3">
          <a href="#" className="text-gray-600 hover:text-indigo-500">Facebook</a>
          <a href="#" className="text-gray-600 hover:text-indigo-500">Twitter</a>
          <a href="#" className="text-gray-600 hover:text-indigo-500">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
