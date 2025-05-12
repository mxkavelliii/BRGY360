import React, { useState } from "react";
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiChat4Line,
  RiDashboardLine,
  RiFilePdf2Line,
  RiFundsBoxLine,
  RiGroupLine,
  RiLogoutBoxRLine,
  RiNewsLine,
  RiUser4Line,
} from "react-icons/ri";
import Logo from "../assets/Logo.png";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [expand, setExpand] = useState(false);
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full fixed top-0 left-0 flex flex-col items-center justify-center text-white p-2">
        <div className="relative h-full flex flex-col items-center justify-between p-4 lg:p-6 rounded-2xl bg-green-700">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-full flex items-center justify-start">
              <img src={Logo} alt="/" className="h-[30px] w-[30px]" />
            </div>
            <div
              className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer"
              onClick={() => navigate("/admin/dashboard")}
            >
              <RiDashboardLine
                size={22}
                color="white"
                className="cursor-pointer"
              />
              {expand ? <p className="text-sm font-normal">Dashboard</p> : null}
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              <RiUser4Line size={22} color="white" className="cursor-pointer" />
              {expand ? <p className="text-sm font-normal">Profile</p> : null}
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              <RiFilePdf2Line
                size={22}
                color="white"
                className="cursor-pointer"
              />
              {expand ? (
                <p className="text-sm font-normal">File Requests</p>
              ) : null}
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              <RiNewsLine size={22} color="white" className="cursor-pointer" />
              {expand ? (
                <p className="text-sm font-normal">News & Announcements</p>
              ) : null}
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              <RiFundsBoxLine
                size={22}
                color="white"
                className="cursor-pointer"
              />
              {expand ? (
                <p className="text-sm font-normal">Transparency Dashboard</p>
              ) : null}
            </div>

            <div
              className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer"
              onClick={() => navigate("/admin/users")}
            >
              <RiGroupLine size={22} color="white" className="cursor-pointer" />
              {expand ? (
                <p className="text-sm font-normal">User Management</p>
              ) : null}
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-6">
            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              <RiChat4Line size={22} color="white" className="cursor-pointer" />
              {expand ? <p className="text-sm font-normal">Chatbot</p> : null}
            </div>

            <div
              className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer"
              onClick={onLogout}
            >
              <RiLogoutBoxRLine
                size={22}
                color="white"
                className="cursor-pointer"
              />
              {expand ? <p className="text-sm font-normal">Logout</p> : null}
            </div>
          </div>
        </div>

        <div
          className="absolute right-[-4%] p-1 rounded-full bg-white shadow-xl shadow-black/20 cursor-pointer"
          onClick={() => setExpand(!expand)}
        >
          {expand ? (
            <RiArrowDropLeftLine size={24} color="black" />
          ) : (
            <RiArrowDropRightLine size={24} color="black" />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
