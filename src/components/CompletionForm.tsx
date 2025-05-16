import axios from "axios";
import { PDFDocument } from "pdf-lib";
import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Modal from "./Modal";

const CompletionForm = ({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) => {
  const [placeOfIssuance, setPlaceOfIssuance] = useState("");

  const [modal, showModal] = useState(false);
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");

  const generateAndPreviewPdf = async () => {
    console.log(data);

    let res;

    if (data.requestedDocumentType === "barangay-clearance") {
      res = await fetch("/BARANGAY CLEARANCE.pdf");
    } else if (data.requestedDocumentType === "barangay-indigency") {
      res = await fetch("/BARANGAY INDIGENCY.pdf");
    } else if (data.requestedDocumentType === "certificate-of-residency") {
      res = await fetch("/CERTIFICATE OF RESIDENCY.pdf");
    } else if (data.requestedDocumentType === "first-time-job-seeker") {
      res = await fetch("/FIRST TIME JOB SEEKER.pdf");
    }

    if (!res) {
      console.error("Invalid form type:", data.requestedDocumentType);
      return;
    }

    const arrayBuffer = await res.arrayBuffer();

    // Load the template
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const form = pdfDoc.getForm();

    const isoDate = data.dateRequested;
    const date = new Date(isoDate);

    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}-${date.getFullYear()}`;

    // Fill in form fields based on form type
    if (data.requestedDocumentType === "barangay-clearance") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("purok")?.setText(data.data.purok);
      form.getTextField("birthdate")?.setText(data.data.birthdate);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
      form
        .getTextField("requestNumber")
        ?.setText(data.requestNumber.toString());
      data.issuanceDate === "N/A"
        ? form.getTextField("issuanceDate")?.setText("")
        : form.getTextField("issuanceDate")?.setText(data.issuanceDate);
      data.placeOfIssuance === "N/A"
        ? form.getTextField("placeOfIssuance")?.setText("")
        : form.getTextField("placeOfIssuance")?.setText(data.placeOfIssuance);
    } else if (data.requestedDocumentType === "barangay-indigency") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
    } else if (data.requestedDocumentType === "certificate-of-residency") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
    } else if (data.requestedDocumentType === "first-time-job-seeker") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("honorifics")?.setText(data.data.honorifics);
      form.getTextField("schoolName")?.setText(data.data.schoolName);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
    }

    // Flatten to make fields non-editable
    form.flatten();

    // Save and preview
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  const printPdf = async (data: any) => {
    console.log(data);

    let res;

    if (data.requestedDocumentType === "barangay-clearance") {
      res = await fetch("/BARANGAY CLEARANCE.pdf");
    } else if (data.requestedDocumentType === "barangay-indigency") {
      res = await fetch("/BARANGAY INDIGENCY.pdf");
    } else if (data.requestedDocumentType === "certificate-of-residency") {
      res = await fetch("/CERTIFICATE OF RESIDENCY.pdf");
    } else if (data.requestedDocumentType === "first-time-job-seeker") {
      res = await fetch("/FIRST TIME JOB SEEKER.pdf");
    }

    if (!res) {
      console.error("Invalid form type:", data.requestedDocumentType);
      return;
    }

    const arrayBuffer = await res.arrayBuffer();

    // Load the template
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const form = pdfDoc.getForm();

    const isoDate = data.dateRequested;
    const date = new Date(isoDate);

    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}-${date.getFullYear()}`;

    // Fill in form fields based on form type
    if (data.requestedDocumentType === "barangay-clearance") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("purok")?.setText(data.data.purok);
      form.getTextField("birthdate")?.setText(data.data.birthdate);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
      form
        .getTextField("requestNumber")
        ?.setText(data.requestNumber.toString());
      data.issuanceDate === "N/A"
        ? form.getTextField("issuanceDate")?.setText("")
        : form.getTextField("issuanceDate")?.setText(data.issuanceDate);
      data.placeOfIssuance === "N/A"
        ? form.getTextField("placeOfIssuance")?.setText("")
        : form.getTextField("placeOfIssuance")?.setText(data.placeOfIssuance);
    } else if (data.requestedDocumentType === "barangay-indigency") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
      form.getTextField("validUntil")?.setText(data.data.validUntil);
    } else if (data.requestedDocumentType === "certificate-of-residency") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
    } else if (data.requestedDocumentType === "first-time-job-seeker") {
      form.getTextField("fullName")?.setText(data.data.fullName);
      form.getTextField("address")?.setText(data.data.address);
      form.getTextField("honorifics")?.setText(data.data.honorifics);
      form.getTextField("schoolName")?.setText(data.data.schoolName);
      form.getTextField("purpose")?.setText(data.data.purpose);
      form.getTextField("dateRequested")?.setText(formattedDate);
    }

    // Flatten to make fields non-editable
    form.flatten();

    // Save and preview
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  const printRequest = async () => {
    try {
      let url = `http://localhost:8080/api/file-requests/${data._id}`;

      const today = new Date();
      const formatted = today.toISOString().split("T")[0];

      const validUntilDate = new Date();
      validUntilDate.setFullYear(validUntilDate.getFullYear() + 1);

      const mm = String(validUntilDate.getMonth() + 1).padStart(2, "0");
      const dd = String(validUntilDate.getDate()).padStart(2, "0");
      const yyyy = validUntilDate.getFullYear();

      const validUntil = `${mm}-${dd}-${yyyy}`;

      let updatedData = {
        ...data.data,
        validUntil: validUntil,
      };

      let response = await axios.put(url, {
        placeOfIssuance: placeOfIssuance,
        status: "completed",
        issuanceDate: formatted,
        data: updatedData,
      });

      if (response.data.success === true) {
        await printPdf(response.data.data);
        showModal(true);
        setError(false);
        setMessage(response.data.message);
      }
    } catch (error: any) {
      setError(true);
      showModal(true);
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-black/20 w-full h-screen flex flex-col items-center justify-start p-6 overflow-y-auto">
        <div className="w-full lg:w-2/5 bg-white p-6 rounded-2xl flex flex-col items-center justify-center gap-6">
          {/* top */}
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-xs font-semibold w-1/2 text-left truncate">
              Completion Form
            </p>
            <RiCloseLine
              size={16}
              color="black"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          {/* input */}
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <p className="text-xs font-normal">Place of Issuance</p>
            <input
              type="text"
              value={placeOfIssuance}
              onChange={(e) => setPlaceOfIssuance(e.target.value)}
              placeholder="place of issuance"
              className="text-xs font-normal outline-none border border-green-700 p-3 rounded-xl w-full"
            />
          </div>
          <div className="w-full flex flex-row items-center justify-end gap-2">
            <button
              className="text-xs font-normal text-white bg-green-700 p-3 rounded-xl"
              onClick={() => generateAndPreviewPdf()}
            >
              Preview
            </button>
            {placeOfIssuance ? (
              <button
                className="text-xs font-normal text-white bg-green-700 p-3 rounded-xl"
                onClick={() => printRequest()}
              >
                Print
              </button>
            ) : (
              <button className="text-xs font-normal text-white bg-green-700/10 p-3 rounded-xl">
                Print
              </button>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          message={message}
          error={error}
          onClose={() => {
            showModal(false);
            if (!error) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default CompletionForm;
