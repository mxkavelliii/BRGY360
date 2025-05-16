import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../../../components/UserNavbar";
import { RiArrowLeftSLine } from "react-icons/ri";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { renderAsync } from "docx-preview";
import { PDFDocument } from "pdf-lib";
import axios from "axios";
import PostModal from "../../../components/PostModal";
import Modal from "../../../components/Modal";

const RequestForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formType, setFormType] = useState("barangay-clearance");
  const [clearanceData, setClearanceData] = useState({
    fullName: "",
    address: "",
    purok: "",
    birthdate: "",
    purpose: "",
  });
  const [requestedBy, setRequestedBy] = useState("");
  const [barangayId, setBarangayId] = useState("");

  const [postModal, showPostModal] = useState(false);
  const [modal, showModal] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        setBarangayId(currUser.barangayId);
        setRequestedBy(currUser._id);
      }
    }

    if (state) {
      setFormType(state);
    }
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const generateAndPreviewPdf = async () => {
    // Fetch your PDF template
    const res = await fetch("/BARANGAY CLEARANCE.pdf");
    const arrayBuffer = await res.arrayBuffer();

    // Load the template
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const form = pdfDoc.getForm();

    // Fill in form fields
    form.getTextField("fullName")?.setText(clearanceData.fullName);
    form.getTextField("address")?.setText(clearanceData.address);
    form.getTextField("purok")?.setText(clearanceData.purok);
    form.getTextField("birthdate")?.setText(clearanceData.birthdate);
    form.getTextField("purpose")?.setText(clearanceData.purpose);

    // Make fields non-editable
    form.flatten();

    // Save the filled PDF
    const pdfBytes = await pdfDoc.save();

    // Create a Blob and open in new tab
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  const submitRequest = async () => {
    try {
      let url = `http://localhost:8080/api/file-requests`;

      let response = await axios.post(url, {
        requestedDocumentType: formType,
        requestedBy: requestedBy,
        data: formType === "barangay-clearance" ? clearanceData : "",
        barangayId: barangayId,
      });

      if (response.data.success === true) {
        setError(false);
        setMessage(response.data.message);
        showModal(true);
      }
    } catch (error: any) {
      showModal(true);
      setError(true);
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center px-4 py-6 gap-6">
          {/* header */}
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-1">
              <RiArrowLeftSLine
                size={24}
                color="black"
                className="cursor-pointer"
                onClick={() => navigate("/user/request")}
              />
              <p className="text-sm font-semibold">File Request</p>
            </div>
            {/* type */}
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="text-xs font-normal outline-none border border-green-700 p-3 rounded-xl"
            >
              <option value="barangay-clearance">Barangay Clearance</option>
              <option value="barangay-indigency">Barangay Indigency</option>
              <option value="certificate-of-residency">
                Certificate of Residency
              </option>
              <option value="first-time-job-seeker">
                First Time Job Seeker
              </option>
            </select>
          </div>
          {/* inputs */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Full Name</p>
              <input
                type="text"
                name="fullName"
                value={clearanceData.fullName}
                onChange={(e) =>
                  setClearanceData({
                    ...clearanceData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full outline-none border border-green-700 text-xs font-normal p-3 rounded-xl"
                placeholder="full name"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Address</p>
              <input
                type="text"
                name="address"
                value={clearanceData.address}
                onChange={(e) =>
                  setClearanceData({
                    ...clearanceData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full outline-none border border-green-700 text-xs font-normal p-3 rounded-xl"
                placeholder="address"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Purok</p>
              <input
                type="text"
                name="purok"
                value={clearanceData.purok}
                onChange={(e) =>
                  setClearanceData({
                    ...clearanceData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full outline-none border border-green-700 text-xs font-normal p-3 rounded-xl"
                placeholder="purok"
              />
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">Address</p>
                <input
                  type="date"
                  name="birthdate"
                  value={clearanceData.birthdate}
                  onChange={(e) =>
                    setClearanceData({
                      ...clearanceData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full outline-none border border-green-700 text-xs font-normal p-3 rounded-xl"
                  placeholder="birth day"
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">Purpose</p>
                <input
                  type="text"
                  name="purpose"
                  value={clearanceData.purpose}
                  onChange={(e) =>
                    setClearanceData({
                      ...clearanceData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full outline-none border border-green-700 text-xs font-normal p-3 rounded-xl"
                  placeholder="purpose"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-center gap-4">
            <button
              className="p-3 rounded-xl bg-green-700 text-xs font-normal text-white"
              onClick={() => showPostModal(true)}
            >
              Submit Request
            </button>
            <button
              onClick={generateAndPreviewPdf}
              className="p-3 bg-green-700 text-white rounded-xl text-xs font-normal"
            >
              Generate & Preview PDF
            </button>
          </div>
        </div>
      </div>
      {postModal && (
        <PostModal
          onClose={() => showPostModal(false)}
          onPost={submitRequest}
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
              navigate("/user/request");
            }
          }}
        />
      )}
    </>
  );
};

export default RequestForm;
