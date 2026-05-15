import { Link, Outlet } from "react-router";

const Private = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08060d] px-4">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-2xl">
          <h1 
            className="mb-3 text-4xl font-bold"
            style={{ color: "#111111", opacity: 1 }}
            >
            Unauthorized
          </h1>

          <p className="mb-6 text-sm text-gray-600">
            You need to log in to access this page.
          </p>

          <a
            href="/login"
            className="inline-flex mt-2 rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-500"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-5 py-3 bg-gray-800 text-white flex items-center justify-between">
        <h1>My App</h1>

        <div className="flex gap-3 items-center">
          <Link className="hover:underline" to="/app/dashboard">
            Home
          </Link>

          <Link className="hover:underline" to="/app/settings">
            Settings
          </Link>

          <Link className="hover:underline" to="/app/profile">
            Profile
          </Link>

          <Link
            className="hover:underline"
            to="/login"
            onClick={() => localStorage.removeItem("token")}
          >
            Logout
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Private;