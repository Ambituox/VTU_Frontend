import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white px-6">
      <div className="relative max-w-md text-center">
        {/* Floating decorative circles */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-12 -right-16 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>

        <h1 className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-500 to-pink-600 drop-shadow-lg">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-semibold tracking-wide drop-shadow-md">
          Oops! Page Not Found
        </h2>

        <p className="mt-4 text-lg text-indigo-200">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>

        <Link
          to="/profile"
          className="mt-8 inline-block bg-yellow-400 text-indigo-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition"
        >
          Go Back Home
        </Link>
      </div>

      {/* Additional subtle floating blobs animation styles */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(15px, -10px) scale(1.1);
          }
          66% {
            transform: translate(-15px, 10px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
