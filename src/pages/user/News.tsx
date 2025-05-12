import React from "react";
import UserNavbar from "../../components/UserNavbar";

const News = () => {
  return (
    <>
      <UserNavbar />
      <div className="flex flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-6">
          News
        </div>
      </div>
    </>
  );
};

export default News;
