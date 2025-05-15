import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBudget } from "../../../providers/BudgetProvider";
import Modal from "../../../components/Modal";
import PostModal from "../../../components/PostModal";
import { RiAddLine, RiArrowLeftSLine } from "react-icons/ri";
import AdminNavbar from "../../../components/AdminNavbar";

const EditBudgets = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postModal, showPostModal] = useState(false);
  const [modal, showModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [barangayId, setBarangayId] = useState("");
  const [year, setYear] = useState("");
  const { years, getBudgets } = useBudget();
  const [budgetYear, setBudgetYear] = useState<any>("");
  const { state } = useLocation();
  const [fileChanged, setFileChanged] = useState(false);
  const [currentDate, setCurrentDate] = useState<any>("");

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => currentYear - i
  ).filter((year) => !years.includes(year));

  useEffect(() => {
    const getData = async () => {
      try {
        let url = `http://localhost:8080/api/budgets/${state}`;

        let response = await axios.get(url);

        if ((response.data.success = true)) {
          setTitle(response.data.data.title);
          const yearOnly = new Date(response.data.data.date).getFullYear();
          setCurrentDate(yearOnly);
          setBudgetYear(yearOnly);

          setFile(response.data.data.file);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    const getYears = async () => {
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
              console.log(years);
            }
          } catch (error: any) {
            console.log(error.response.data);
          }
        }
      }
    };

    getYears();
    getData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileChanged(true);
    }
  };

  const updateBudget = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        try {
          let url = `http://localhost:8080/api/users/${currUser._id}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            const barangayId = response.data.data.barangayId;

            try {
              let url = `http://localhost:8080/api/budgets/${state}`;

              const formData = new FormData();
              formData.append("title", title);
              formData.append("barangayId", barangayId);
              formData.append("date", budgetYear);

              if (!fileChanged) {
                if (file !== "N/A") {
                  let url = `http://localhost:8080/api/files/${encodeURIComponent(
                    file
                  )}`;

                  const response = await fetch(url);
                  const blob = await response.blob();

                  formData.append("file", blob, file);
                } else {
                  formData.append("file", "");
                }
              } else {
                formData.append("file", file);
              }

              const response = await axios.put(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              if (response.data.success === true) {
                showModal(true);
                setError(false);
                setMessage(response.data.message);
              }
            } catch (error: any) {
              setError(true);
              showModal(true);
              setMessage(error.response.data.message);
            }
          }
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          {/* header */}
          <div className="w-full flex flex-row items-center justify-start gap-1">
            <RiArrowLeftSLine
              size={24}
              color="black"
              className="cursor-pointer"
              onClick={() => navigate("/admin/transparency/budgets")}
            />
            <p className="text-sm font-semibold text-green-700">
              Budget Overview
            </p>
          </div>
          {/* image */}
          <div className="w-full h-[240px] lg:h-[660px] bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden relative">
            {file && (
              <iframe
                src={
                  typeof file === "string"
                    ? `http://localhost:8080/api/files/${file}`
                    : URL.createObjectURL(file)
                }
                title="PDF Preview"
                className="border rounded w-full h-full"
              />
            )}
            <label className="absolute bottom-4 right-4 p-3 rounded-xl bg-white cursor-pointer">
              <RiAddLine size={16} color="black" />
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {/* text */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Year</p>
              <select
                className="w-full p-3 rounded-xl outline-none border border-green-700 text-xs font-normal"
                onChange={(e) => {
                  setBudgetYear(e.target.value);
                  console.log(e.target.value);
                }}
                value={budgetYear}
              >
                <option value="" disabled>
                  choose year
                </option>
                <option value={currentDate}>{currentDate}</option>
                {yearOptions.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </select>
            </div>
            {/* title */}
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Title</p>
              <input
                type="text"
                placeholder="header or title"
                className="outline-none text-xs font-normal capitalize p-3 border border-green-700 rounded-xl w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          {/* button */}
          <div className="w-full flex flex-row items-center justify-end">
            <div
              className="p-3 rounded-xl bg-green-700 text-white text-xs font-normal cursor-pointer"
              onClick={() => showPostModal(true)}
            >
              Post Budget
            </div>
          </div>
        </div>
        <div className="w-full h-[10vh] lg:hidden"></div>
      </div>
      {postModal && (
        <PostModal
          onClose={() => showPostModal(false)}
          onPost={() => updateBudget()}
        />
      )}
      {modal && (
        <Modal
          message={message}
          error={error}
          onClose={() => {
            showModal(false);
            showPostModal(false);
            if (!error) {
              navigate("/admin/transparency/budgets");
            }
          }}
        />
      )}
    </>
  );
};

export default EditBudgets;
