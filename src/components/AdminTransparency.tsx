import React, { useEffect, useState } from "react";
import {
  RiFolderChartLine,
  RiFundsBoxLine,
  RiMedalLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const AdminTransparency = () => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("/admin/transparency/budgets")) {
      setActiveTab("budgets");
      document.title = "Budgets Overview";
    } else if (location.pathname.includes("/admin/transparency/updates")) {
      setActiveTab("updates");
      document.title = "Project Updates";
      console.log("shit");
    } else if (location.pathname.includes("/admin/transparency/achievements")) {
      setActiveTab("achievements");
      document.title = "Accomplishment and Achievements";
      console.log("shit");
    } else if (location.pathname.includes("/admin/transparency")) {
      setActiveTab("transparency");
      document.title = "Transparency Dashboard";
    }
  }, [location.pathname]);

  return (
    <div className="w-full sticky top-0 flex items-center justify-start gap-4">
      {activeTab === "transparency" ? (
        <div className="flex flex-row gap-2 p-3 rounded-xl bg-green-700 text-white cursor-pointer">
          <RiFundsBoxLine size={16} />
          <p className="hidden lg:block text-xs font-normal">
            Transparency Dashboard
          </p>
        </div>
      ) : (
        <div
          className="flex flex-row gap-2 p-3 rounded-xl bg-gray-200 cursor-pointer"
          onClick={() => navigate("/admin/transparency")}
        >
          <RiFundsBoxLine size={16} />
          <p className="hidden lg:block text-xs font-normal">
            Transparency Dashboard
          </p>
        </div>
      )}

      {activeTab === "budgets" ? (
        <div className="flex flex-row gap-2 p-3 rounded-xl bg-green-700 text-white cursor-pointer">
          <RiMoneyDollarCircleLine size={16} />
          <p className="hidden lg:block text-xs font-normal">Budget Overview</p>
        </div>
      ) : (
        <div
          className="flex flex-row gap-2 p-3 bg-gray-200 rounded-xl cursor-pointer"
          onClick={() => navigate("/admin/transparency/budgets")}
        >
          <RiMoneyDollarCircleLine size={16} />
          <p className="hidden lg:block text-xs font-normal">Budget Overview</p>
        </div>
      )}

      {activeTab === "updates" ? (
        <div className="flex flex-row gap-2 p-3 rounded-xl bg-green-700 text-white cursor-pointer">
          <RiFolderChartLine size={16} />
          <p className="hidden lg:block text-xs font-normal">Project Updates</p>
        </div>
      ) : (
        <div
          className="flex flex-row gap-2 p-3 rounded-xl bg-gray-200 cursor-pointer"
          onClick={() => navigate("/admin/transparency/updates")}
        >
          <RiFolderChartLine size={16} />
          <p className="hidden lg:block text-xs font-normal">Project Updates</p>
        </div>
      )}

      {activeTab === "achievements" ? (
        <div className="flex flex-row gap-2 p-3 rounded-xl bg-green-700 text-white cursor-pointer">
          <RiMedalLine size={16} />
          <p className="hidden lg:block text-xs font-normal">Achievements</p>
        </div>
      ) : (
        <div
          className="flex flex-row gap-2 p-3 rounded-xl bg-gray-200 cursor-pointer"
          onClick={() => navigate("/admin/transparency/achievements")}
        >
          <RiMedalLine size={16} />
          <p className="hidden lg:block text-xs font-normal">Achievements</p>
        </div>
      )}
    </div>
  );
};

export default AdminTransparency;
