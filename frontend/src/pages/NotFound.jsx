import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-lg mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
