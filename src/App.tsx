import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/register/user/UserRegister";
import AdminRegister from "./pages/register/admin/AdminRegister";

// providers
import { BarangayProvider } from "./providers/BarangayProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { UsersProvider } from "./providers/UsersProvider";
import { NewsProvider } from "./providers/NewsProvider";
import { UpdatesProvider } from "./providers/UpdatesProvider";
import { AchievementsProvider } from "./providers/AchievementsProvider";
import { BudgetProvider } from "./providers/BudgetProvider";
import { ChatsProvider } from "./providers/ChatsProvider";
import { RequestsProvider } from "./providers/RequestsProvider";

//users
import Home from "./pages/user/Home";
import UserProfile from "./pages/user/Profile";
import UserNews from "./pages/user/News";
import AllNews from "./pages/user/news/AllNews";
import ViewNews from "./pages/user/news/ViewNews";
import TransparencyDashboard from "./pages/user/TransparencyDashboard";
import ProjectUpdates from "./pages/user/ProjectUpdates";
import ViewUpdates from "./pages/user/updates/ViewUpdates";
import Achievements from "./pages/user/Achievements";
import ViewAchievements from "./pages/user/achievements/ViewAchievements";
import Budgets from "./pages/user/Budgets";
import FileRequest from "./pages/user/FileRequest";
import RequestForm from "./pages/user/request/RequestForm";
import RequestsHistory from "./pages/user/RequestsHistory";

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
import AdminTransparency from "./pages/admin/TransparencyDashboard";
import AdminProjectUpdates from "./pages/admin/ProjectUpdates";
import AddUpdates from "./pages/admin/project-updates/AddUpdates";
import EditUpdates from "./pages/admin/project-updates/EditUpdates";
import AdminAchievements from "./pages/admin/Achievements";
import AddAchievements from "./pages/admin/achievements/AddAchievements";
import EditAchievements from "./pages/admin/achievements/EditAchievements";
import AdminBudget from "./pages/admin/Budget";
import AddBudgets from "./pages/admin/budgets/AddBudgets";
import EditBudgets from "./pages/admin/budgets/EditBudgets";
import FileRequests from "./pages/admin/FileRequests";
import AdminChatbot from "./pages/admin/Chatbot";

function App() {
  return (
    <AuthProvider>
      <BarangayProvider>
        <NewsProvider>
          <UsersProvider>
            <UpdatesProvider>
              <AchievementsProvider>
                <BudgetProvider>
                  <RequestsProvider>
                    <ChatsProvider>
                      <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                          path="/register/user"
                          element={<UserRegister />}
                        />
                        <Route
                          path="/register/admin"
                          element={<AdminRegister />}
                        />
                        {/* user */}
                        <Route path="/user/home" element={<Home />} />
                        <Route path="/user/profile" element={<UserProfile />} />
                        <Route path="/user/news" element={<UserNews />} />
                        <Route path="/user/news/all" element={<AllNews />} />
                        <Route path="/user/news/view" element={<ViewNews />} />
                        <Route
                          path="/user/transparency"
                          element={<TransparencyDashboard />}
                        />
                        <Route
                          path="/user/transparency/updates"
                          element={<ProjectUpdates />}
                        />
                        <Route
                          path="/user/transparency/updates/view"
                          element={<ViewUpdates />}
                        />
                        <Route
                          path="/user/transparency/achievements"
                          element={<Achievements />}
                        />
                        <Route
                          path="/user/transparency/achievements/view"
                          element={<ViewAchievements />}
                        />
                        <Route
                          path="/user/transparency/budgets"
                          element={<Budgets />}
                        />
                        <Route path="/user/request" element={<FileRequest />} />
                        <Route
                          path="/user/request/form"
                          element={<RequestForm />}
                        />
                        <Route
                          path="/user/request/history"
                          element={<RequestsHistory />}
                        />

                        {/* admin */}
                        <Route
                          path="/admin/dashboard"
                          element={<Dashboard />}
                        />
                        <Route path="/admin/users" element={<Users />} />
                        <Route
                          path="/admin/users/add/user"
                          element={<AddUser />}
                        />
                        <Route
                          path="/admin/users/add/admin"
                          element={<AddAdmin />}
                        />
                        <Route
                          path="/admin/users/view"
                          element={<ViewUser />}
                        />
                        <Route
                          path="/admin/users/edit"
                          element={<EditUser />}
                        />
                        <Route
                          path="/admin/profile"
                          element={<AdminProfile />}
                        />
                        <Route path="/admin/news" element={<AdminNews />} />
                        <Route path="/admin/news/add" element={<AddNews />} />
                        <Route path="/admin/news/edit" element={<EditNews />} />
                        <Route
                          path="/admin/transparency"
                          element={<AdminTransparency />}
                        />
                        <Route
                          path="/admin/transparency/updates"
                          element={<AdminProjectUpdates />}
                        />
                        <Route
                          path="/admin/transparency/updates/add"
                          element={<AddUpdates />}
                        />
                        <Route
                          path="/admin/transparency/updates/edit"
                          element={<EditUpdates />}
                        />
                        <Route
                          path="/admin/transparency/achievements"
                          element={<AdminAchievements />}
                        />
                        <Route
                          path="/admin/transparency/achievements/add"
                          element={<AddAchievements />}
                        />
                        <Route
                          path="/admin/transparency/achievements/edit"
                          element={<EditAchievements />}
                        />
                        <Route
                          path="/admin/transparency/budgets"
                          element={<AdminBudget />}
                        />
                        <Route
                          path="/admin/transparency/budgets/add"
                          element={<AddBudgets />}
                        />
                        <Route
                          path="/admin/transparency/budgets/edit"
                          element={<EditBudgets />}
                        />
                        <Route
                          path="/admin/requests"
                          element={<FileRequests />}
                        />
                        <Route
                          path="/admin/chatbot"
                          element={<AdminChatbot />}
                        />
                      </Routes>
                    </ChatsProvider>
                  </RequestsProvider>
                </BudgetProvider>
              </AchievementsProvider>
            </UpdatesProvider>
          </UsersProvider>
        </NewsProvider>
      </BarangayProvider>
    </AuthProvider>
  );
}

export default App;
