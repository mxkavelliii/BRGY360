import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/register/user/UserRegister";
import AdminRegister from "./pages/register/admin/AdminRegister";

// providers
import { BarangayProvider } from "./providers/BarangayProvider";

function App() {
  return (
    <BarangayProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />
      </Routes>
    </BarangayProvider>
  );
}

export default App;
