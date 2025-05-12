import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

const Users = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-6">
          Users
        </div>
      </div>
    </>
  );
};

export default Users;
