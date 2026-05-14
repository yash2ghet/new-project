import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Private from "./pages/private";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";

function App() {
  return (
    <div className="h-screen">
      <Routes>

        <Route
          path="/"
          element={
            <div className="flex h-screen items-center justify-center bg-[#08060d] px-4">
              <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-2xl opacity-100">
                <h1 
                className="mb-3 text-4xl font-bold "
                style={{ color: "#111111", opacity: 1 }}
                >
                  Unauthorized
                </h1>

                <p 
                  className="mb-6 text-sm text-gray-600"
                  style={{ color: "#525252", opacity: 1 }}
                >
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
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        
        <Route path="/app" element={<Private />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;