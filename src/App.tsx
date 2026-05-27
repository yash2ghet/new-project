import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Private from "./pages/private";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import OtpVerify from "./pages/OTP-Verification";

function App() {
  return (
    <div className="h-screen">
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/app" element={<Private />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </div>
  );
}

export default App;