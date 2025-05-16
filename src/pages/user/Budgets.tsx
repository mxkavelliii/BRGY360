import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import UserTransparency from "../../components/UserTransparency";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../../providers/BudgetProvider";
import {
  RiCalendarLine,
  RiDeleteBin4Line,
  RiDownloadCloud2Line,
  RiEditLine,
  RiEmotionUnhappyLine,
  RiFilePdf2Line,
} from "react-icons/ri";
import axios from "axios";

const Budgets = () => {
  const { budgets, years, getBudgets } = useBudget();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const limit = 10;
  const [barangayId, setBarangayId] = useState("");

  const [deleteModal, showDeleteModal] = useState(false);
  const [modal, showModal] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const navigate = useNavigate();

  const activeIndex = years.findIndex((y: any) => y === year);

  const mappedYears = [
    "All",
    ...(activeIndex > 0 ? [years[activeIndex - 1]] : []),
    ...(activeIndex !== -1 ? [years[activeIndex]] : []),
    ...(activeIndex < years.length - 1 ? [years[activeIndex + 1]] : []),
  ];

  const getData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        try {
          let url = `http://localhost:8080/api/users/${currUser._id}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setBarangayId(response.data.data.barangayId);
            await getBudgets(year, response.data.data.barangayId);
          }
        } catch (error: any) {
          console.log(error.response.data);
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, [year]);

  const handleDownload = (file: string) => {
    const url = `http://localhost:8080/api/files/${file}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <UserNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-start justify-center px-4 py-6 gap-6">
          <UserTransparency />
          {years.length > 0 ? (
            <div className="flex flex-row items-center justify-center gap-2 bg-gray-200 p-2 rounded-2xl">
              {mappedYears.map((budgetYear: any) => {
                const value = budgetYear === "All" ? "" : budgetYear;
                const isActive = value === year;

                return (
                  <div
                    className={`${
                      isActive
                        ? "p-3 rounded-xl bg-green-700 text-xs font-normal text-white cursor-pointer"
                        : "p-3 rounded-xl text-xs font-normal cursor-pointer"
                    }`}
                    key={budgetYear}
                    onClick={() => setYear(value)}
                  >
                    {budgetYear}
                  </div>
                );
              })}
            </div>
          ) : null}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {budgets.length > 0 ? (
              budgets.map((budget: any) => (
                <div
                  className="w-full flex flex-col items-center justify-center p-6 rounded-xl shadow-xl shadow-black/10"
                  key={budget._id}
                >
                  <div className="w-full flex-col flex items-center justify-between">
                    <div className="w-full flex flex-row items-center justify-start gap-2">
                      <div className="p-3 rounded-full bg-green-700 flex items-center justify-center">
                        <RiFilePdf2Line size={16} color="white" />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-2">
                        <p className="line-clamp-1 text-sm font-normal cursor-pointer">
                          {budget.title}
                        </p>
                        <div className="w-full flex flex-row items-center justify-start gap-1">
                          <RiCalendarLine size={14} color="black" />
                          <p className="text-xs font-normal">
                            {new Date(budget.date).toLocaleDateString("en-US", {
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-row items-center justify-end gap-2">
                      {budget.file !== "N/A" ? (
                        <div
                          className="p-3 rounded-xl bg-green-700 text-white cursor-pointer"
                          onClick={() => handleDownload(budget.file)}
                        >
                          <RiDownloadCloud2Line size={16} />
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-green-700/20 text-white cursor-pointer">
                          <RiDownloadCloud2Line size={16} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-row items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center justify-center text-green-700 gap-4">
                  <RiEmotionUnhappyLine size={46} />
                  <p className="text-xs font-semibold">No Results Found</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Budgets;
