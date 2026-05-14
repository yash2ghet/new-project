import { Link, Outlet } from "react-router";

const Private = () => {

  const storage = localStorage.getItem("token");

  return (
    <div className="h-full">
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
          <Link className="hover:underline" to="/login" onClick={() => localStorage.removeItem("token")}>
            Logout
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Private;