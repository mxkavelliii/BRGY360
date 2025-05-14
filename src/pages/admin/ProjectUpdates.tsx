import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminTransparency from "../../components/AdminTransparency";

const ProjectUpdates = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          <AdminTransparency />
        </div>
      </div>
    </>
  );
};

export default ProjectUpdates;
