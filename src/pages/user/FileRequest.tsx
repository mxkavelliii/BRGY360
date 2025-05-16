import React from "react";
import UserNavbar from "../../components/UserNavbar";
import FileIcon from "../../assets/FileIcon.png";
import { useNavigate } from "react-router-dom";
import { RiTimelineView } from "react-icons/ri";

const FileRequest = () => {
  const navigate = useNavigate();

  return (
    <>
      <UserNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center px-4 py-6 gap-6">
          {/* title */}
          <div className="w-full flex flex-col items-start justify-center">
            <p className="text-sm font-semibold">File Request</p>
            <p className="text-xs font-normal">
              choose from the available documents
            </p>
          </div>
          <div className="min-h-[80vh] w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div
              className="w-full lg:w-1/4 flex flex-col items-center justify-center gap-4 cursor-pointer"
              onClick={() =>
                navigate("/user/request/form", { state: "barangay-clearance" })
              }
            >
              <div className="w-[220px] h-[220px] shrink-0 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <img
                  src={FileIcon}
                  alt=""
                  className="w-[60%] h-[60%] object-cover object-center"
                />
              </div>
              <p className="text-md font-semibold text-green-700">
                Barangay Clearance
              </p>
            </div>
            <div
              className="w-full lg:w-1/4 flex flex-col items-center justify-center gap-4 cursor-pointer"
              onClick={() =>
                navigate("/user/request/form", { state: "barangay-indigency" })
              }
            >
              <div className="w-[220px] h-[220px] shrink-0 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <img
                  src={FileIcon}
                  alt=""
                  className="w-[60%] h-[60%] object-cover object-center"
                />
              </div>
              <p className="text-md font-semibold text-green-700">
                Barangay Indigency
              </p>
            </div>
            <div
              className="w-full lg:w-1/4 flex flex-col items-center justify-center gap-4 cursor-pointer"
              onClick={() =>
                navigate("/user/request/form", {
                  state: "certificate-of-residency",
                })
              }
            >
              <div className="w-[220px] h-[220px] shrink-0 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <img
                  src={FileIcon}
                  alt=""
                  className="w-[60%] h-[60%] object-cover object-center"
                />
              </div>
              <p className="text-md font-semibold text-green-700">
                Certificate of Residency
              </p>
            </div>
            <div
              className="w-full lg:w-1/4 flex flex-col items-center justify-center gap-4 cursor-pointer"
              onClick={() =>
                navigate("/user/request/form", {
                  state: "first-time-job-seeker",
                })
              }
            >
              <div className="w-[220px] h-[220px] shrink-0 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <img
                  src={FileIcon}
                  alt=""
                  className="w-[60%] h-[60%] object-cover object-center"
                />
              </div>
              <p className="text-md font-semibold text-green-700">
                First Time Job Seeker
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-end gap-2">
            <button
              className="flex flex-row gap-2 text-xs font-normal text-white bg-green-700 p-3 rounded-xl"
              onClick={() => navigate("/user/request/history")}
            >
              <RiTimelineView size={16} />
              <p>File Requests</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileRequest;
