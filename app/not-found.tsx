import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Link Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The short link you're looking for doesn't exist or may have been
          deleted.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
