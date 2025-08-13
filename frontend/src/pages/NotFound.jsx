// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white text-center px-4">
      <h1 className="text-9xl font-bold text-yellow-500">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mt-4">
        Oops! Page not found.
      </h2>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
