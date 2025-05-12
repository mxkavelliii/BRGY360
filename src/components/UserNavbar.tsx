import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiChat4Fill,
  RiChat4Line,
  RiDashboardFill,
  RiDashboardLine,
  RiFilePdf2Fill,
  RiFilePdf2Line,
  RiFundsBoxFill,
  RiFundsBoxLine,
  RiGroupFill,
  RiGroupLine,
  RiHome6Fill,
  RiHome6Line,
  RiLogoutBoxRLine,
  RiNewsFill,
  RiNewsLine,
  RiUser4Fill,
  RiUser4Line,
} from "react-icons/ri";
import Logo from "../assets/Logo.png";

const UserNavbar = () => {
  const [expand, setExpand] = useState(false);
  const { onLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState("dashboard");

  useEffect(() => {
    if (location.pathname.includes("/user/home")) {
      setActiveRoute("home");
      document.title = "Home";
    } else if (location.pathname.includes("/user/profile")) {
      setActiveRoute("profile");
      document.title = "Profile";
    } else if (location.pathname.includes("/user/requests")) {
      setActiveRoute("requests");
      document.title = "File Requests";
    } else if (location.pathname.includes("/user/news")) {
      setActiveRoute("news");
      document.title = "News and Announcements";
    } else if (location.pathname.includes("/user/transparency")) {
      setActiveRoute("transparency");
      document.title = "Transparency Dashboard";
    } else if (location.pathname.includes("/user/chatbot")) {
      setActiveRoute("chatbot");
      document.title = "Chat Bot";
    }
  }, [location.pathname]);

  return (
    <>
      <div className="w-full lg:w-auto lg:h-full fixed bottom-0 lg:top-0 left-0 flex flex-col items-center justify-center text-white p-2 z-20">
        <div className="relative w-auto lg:h-full flex flex-row lg:flex-col items-center justify-center gap-4 lg:justify-between p-4 lg:p-6 rounded-2xl bg-green-700">
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-6">
            <div className="hidden w-full lg:flex items-center justify-start">
              <img
                src={Logo}
                alt="/"
                className="h-[30px] w-[30px] cursor-pointer"
                onClick={() => navigate("/user/home")}
              />
            </div>

            <div
              className="w-full flex lg:hidden flex-row items-center justify-start gap-2 cursor-pointer"
              onClick={() => navigate("/user/home")}
            >
              {activeRoute === "home" ? (
                <RiHome6Fill
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              ) : (
                <RiHome6Line
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              )}
              {expand ? <p className="text-sm font-normal">Profile</p> : null}
            </div>

            <div
              className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer"
              onClick={() => navigate("/user/profile")}
            >
              {activeRoute === "profile" ? (
                <RiUser4Fill
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              ) : (
                <RiUser4Line
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              )}
              {expand ? <p className="text-sm font-normal">Profile</p> : null}
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              {activeRoute === "requests" ? (
                <RiFilePdf2Fill
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              ) : (
                <RiFilePdf2Line
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              )}
              {expand ? (
                <p className="text-sm font-normal">File Requests</p>
              ) : null}
            </div>

            <div
              className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer"
              onClick={() => navigate("/user/news")}
            >
              {activeRoute === "news" ? (
                <RiNewsFill
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              ) : (
                <RiNewsLine
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              )}
              {expand ? (
                <p className="text-sm font-normal">News & Announcements</p>
              ) : null}
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              {activeRoute === "transparency" ? (
                <RiFundsBoxFill
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              ) : (
                <RiFundsBoxLine
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              )}
              {expand ? (
                <p className="text-sm font-normal">Transparency Dashboard</p>
              ) : null}
            </div>
          </div>

          <div className="w-auto lg:w-full flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-6">
            <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
              {activeRoute === "chatbot" ? (
                <RiChat4Fill
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              ) : (
                <RiChat4Line
                  size={22}
                  color="white"
                  className="cursor-pointer"
                />
              )}
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
          className="hidden lg:block absolute right-[-4%] p-1 rounded-full bg-white shadow-xl shadow-black/20 cursor-pointer"
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

export default UserNavbar;
