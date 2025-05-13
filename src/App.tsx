import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/register/user/UserRegister";
import AdminRegister from "./pages/register/admin/AdminRegister";

// providers
import { BarangayProvider } from "./providers/BarangayProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { UsersProvider } from "./providers/UsersProvider";

//users
import Home from "./pages/user/Home";
import UserProfile from "./pages/user/Profile";
import UserNews from "./pages/user/News";

//admin
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminProfile from "./pages/admin/Profile";
import ViewUser from "./pages/admin/user-management/ViewUser";
import EditUser from "./pages/admin/user-management/EditUser";
import AddUser from "./pages/admin/user-management/AddUser";
import AddAdmin from "./pages/admin/user-management/AddAdmin";

function App() {
  return (
    <AuthProvider>
      <BarangayProvider>
        <UsersProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register/user" element={<UserRegister />} />
            <Route path="/register/admin" element={<AdminRegister />} />

            {/* user */}
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/news" element={<UserNews />} />

            {/* admin */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/add/user" element={<AddUser />} />
            <Route path="/admin/users/add/admin" element={<AddAdmin />} />
            <Route path="/admin/users/view" element={<ViewUser />} />
            <Route path="/admin/users/edit" element={<EditUser />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Routes>
        </UsersProvider>
      </BarangayProvider>
    </AuthProvider>
  );
}

export default App;
