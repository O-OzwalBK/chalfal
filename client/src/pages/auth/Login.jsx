import { Link } from "react-router";
import { toggleTheme } from "../../theme/theme.js";
export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome Back
          </h1>

          <button
            onClick={toggleTheme}
            className="text-sm text-gray-600 dark:text-gray-300 hover:opacity-80"
          >
            🌗
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Sign in to continue
        </p>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-neutral-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
