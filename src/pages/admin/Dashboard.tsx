import AdminNavbar from "../../components/AdminNavbar";

const Dashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-6">
          <p className="text-xs font-normal">Dashboard</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
