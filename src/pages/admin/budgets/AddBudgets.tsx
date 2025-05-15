import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostModal from "../../../components/PostModal";
import Modal from "../../../components/Modal";
import { RiAddLine, RiArrowLeftSLine } from "react-icons/ri";
import AdminNavbar from "../../../components/AdminNavbar";
import { useBudget } from "../../../providers/BudgetProvider";

const AddBudgets = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postModal, showPostModal] = useState(false);
  const [modal, showModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [barangayId, setBarangayId] = useState("");
  const [year, setYear] = useState("");
  const { years, getBudgets } = useBudget();
  const [budgetYear, setBudgetYear] = useState("");

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => currentYear - i
  ).filter((year) => !years.includes(year));

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
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const postBudget = async () => {
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
              let url = "http://localhost:8080/api/budgets";

              console.log(budgetYear);

              const formData = new FormData();
              formData.append("title", title);
              formData.append("barangayId", barangayId);
              file && formData.append("file", file);
              formData.append("date", budgetYear);
              !file && formData.append("file", "");

              const response = await axios.post(url, formData, {
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
                src={URL.createObjectURL(file)}
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
                onChange={(e) => setBudgetYear(e.target.value)}
                value={budgetYear}
              >
                <option value="" disabled>
                  choose year
                </option>
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
          onPost={() => postBudget()}
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

export default AddBudgets;
