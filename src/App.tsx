import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/register/user/UserRegister";
import AdminRegister from "./pages/register/admin/AdminRegister";

// providers
import { BarangayProvider } from "./providers/BarangayProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { UsersProvider } from "./providers/UsersProvider";
import { NewsProvider } from "./providers/NewsProvider";

//users
import Home from "./pages/user/Home";
import UserProfile from "./pages/user/Profile";
import UserNews from "./pages/user/News";
import AllNews from "./pages/user/news/AllNews";
import ViewNews from "./pages/user/news/ViewNews";

//admin
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminProfile from "./pages/admin/Profile";
import ViewUser from "./pages/admin/user-management/ViewUser";
import EditUser from "./pages/admin/user-management/EditUser";
import AddUser from "./pages/admin/user-management/AddUser";
import AddAdmin from "./pages/admin/user-management/AddAdmin";
import AdminNews from "./pages/admin/News";
import AddNews from "./pages/admin/news/AddNews";
import EditNews from "./pages/admin/news/EditNews";

function App() {
  return (
    <AuthProvider>
      <BarangayProvider>
        <NewsProvider>
          <UsersProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register/user" element={<UserRegister />} />
              <Route path="/register/admin" element={<AdminRegister />} />

              {/* user */}
              <Route path="/user/home" element={<Home />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/news" element={<UserNews />} />
              <Route path="/user/news/all" element={<AllNews />} />
              <Route path="/user/news/view" element={<ViewNews />} />

              {/* admin */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/users/add/user" element={<AddUser />} />
              <Route path="/admin/users/add/admin" element={<AddAdmin />} />
              <Route path="/admin/users/view" element={<ViewUser />} />
              <Route path="/admin/users/edit" element={<EditUser />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/news/add" element={<AddNews />} />
              <Route path="/admin/news/edit" element={<EditNews />} />
            </Routes>
          </UsersProvider>
        </NewsProvider>
      </BarangayProvider>
    </AuthProvider>
  );
}

export default App;
