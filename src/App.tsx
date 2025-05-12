import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/register/user/UserRegister";
import AdminRegister from "./pages/register/admin/AdminRegister";

// providers
import { BarangayProvider } from "./providers/BarangayProvider";
import { AuthProvider } from "./providers/AuthProvider";

//users
import Home from "./pages/user/Home";

//admin
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

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
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </BarangayProvider>
    </AuthProvider>
  );
}

export default App;
