import React from "react";
import UserNavbar from "../../components/UserNavbar";
import UserTransparency from "../../components/UserTransparency";

const Budgets = () => {
  return (
    <>
      <UserNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-start justify-center px-4 py-6 gap-6">
          <UserTransparency />
        </div>
      </div>
    </>
  );
};

export default Budgets;
