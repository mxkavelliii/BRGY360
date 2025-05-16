import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../../providers/BudgetProvider";
import DeleteModal from "../../components/DeleteModal";
import Modal from "../../components/Modal";
import {
  RiCalendarLine,
  RiDeleteBin4Line,
  RiEditLine,
  RiEmotionUnhappyLine,
  RiFilePdf2Fill,
  RiFilePdf2Line,
  RiFilePdfLine,
  RiSearchLine,
} from "react-icons/ri";
import AdminTransparency from "../../components/AdminTransparency";
import AdminNavbar from "../../components/AdminNavbar";

const Budget = () => {
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

  const deleteBudget = async (updateId: string) => {
    if (updateId) {
      try {
        let url = `http://localhost:8080/api/budgets/${updateId}`;

        let response = await axios.delete(url);

        if (response.data.success === true) {
          setError(false);
          showModal(true);
          setMessage(response.data.message);
          setYear("");
          getData();
        }
      } catch (error: any) {
        setError(true);
        showModal(true);
        setMessage(error.response.data.message);
      }
    }
  };

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

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          <AdminTransparency />
          {/* header */}
          <div className="w-full flex flex-col items-start justify-center">
            <p className="text-sm font-semibold">Budget Overview</p>
            <p className="text-xs font-normal">
              overview of brgy budgets over the years
            </p>
          </div>
          {/* year and add */}
          <div className="w-full flex flex-row items-center justify-between">
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
            <div
              className="flex items-center justify-center cursor-pointer text-xs font-normal text-white bg-green-700 p-3 rounded-xl"
              onClick={() => navigate("/admin/transparency/budgets/add")}
            >
              Add New
            </div>
          </div>
          {/* count */}
          <div className="w-full flex items-center justify-start">
            <p className="text-xs font-normal">Count: {budgets.length}</p>
          </div>
          {/* data */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {budgets.length > 0 ? (
              budgets.map((budget: any) => (
                <div
                  className="w-full flex flex-col items-center justify-center p-6 rounded-xl shadow-xl shadow-black/10"
                  key={budget._id}
                >
                  <div className="w-full flex-col flex lg:flex-row items-center justify-between">
                    <div className="w-full lg:w-2/3 flex flex-row items-center justify-start gap-2">
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
                    <div className="w-full lg:w-1/2 flex flex-row items-center justify-end gap-2">
                      <div
                        className="p-3 rounded-xl bg-green-700 text-white cursor-pointer"
                        onClick={() =>
                          navigate("/admin/transparency/budgets/edit", {
                            state: budget._id,
                          })
                        }
                      >
                        <RiEditLine size={16} />
                      </div>
                      <div
                        className="p-3 rounded-xl bg-red-700 text-white cursor-pointer"
                        onClick={() => {
                          showDeleteModal(true);
                          setSelectedBudget(budget._id);
                        }}
                      >
                        <RiDeleteBin4Line size={16} />
                      </div>
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
          {/* pagination */}
          {/* <div className="flex flex-row items-center justify-center space-x-4 py-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (pageNumber) =>
                  pageNumber === page ||
                  pageNumber === page - 1 ||
                  pageNumber === page + 1
              )
              .map((pageNumber) => (
                <p
                  key={pageNumber}
                  className={`cursor-pointer ${
                    page === pageNumber
                      ? "font-semibold text-sm text-green-700"
                      : "font-normal text-xs text-green-700"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </p>
              ))}
          </div> */}
        </div>
        <div className="w-full h-[10vh] lg:hidden"></div>
      </div>
      {deleteModal && (
        <DeleteModal
          onDelete={() => deleteBudget(selectedBudget)}
          onClose={() => showDeleteModal(false)}
        />
      )}
      {modal && (
        <Modal
          message={message}
          error={error}
          onClose={() => {
            showDeleteModal(false);
            showModal(false);
          }}
        />
      )}
    </>
  );
};

export default Budget;
