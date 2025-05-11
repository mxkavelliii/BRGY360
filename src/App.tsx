import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/register/user/UserRegister";
import AdminRegister from "./pages/register/admin/AdminRegister";

// providers
import { BarangayProvider } from "./providers/BarangayProvider";
import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BarangayProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register/user" element={<UserRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />

          {/* user */}
          <Route path="/user/home" element={<Home />} />

          {/* admin */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </BarangayProvider>
    </AuthProvider>
  );
}

export default App;
