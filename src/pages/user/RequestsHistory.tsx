import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useRequests } from "../../providers/RequestsProvider";
import { PDFDocument } from "pdf-lib";
import { useLocation } from "react-router-dom";

const RequestsHistory = () => {
  const [status, setStatus] = useState("");
  const [formType, setFormType] = useState("");
  const { userRequests, getUserRequests, pages } = useRequests();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setStatus(state);
    }
  }, []);

  const getData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        await getUserRequests(currUser._id, status, formType, page, limit);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [status, formType, page]);

  const generateAndPreviewPdf = async (data: any) => {
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
      data.data.validUntil &&
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

  return (
    <>
      <UserNavbar />
      <div className="flex flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          {/* title */}
          <div className="w-full flex flex-row items-center justify-between">
            <div className="w-1/2 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">File Requests</p>
              <p className="text-xs font-normal w-full truncate">
                View, monitor and track your requests
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4 items-center justify-start">
            <select
              className="outline-none bg-green-700 text-white p-3 rounded-xl text-xs font-normal"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="outline-none bg-green-700 text-white p-3 rounded-xl text-xs font-normal"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
            >
              <option value="">All</option>
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
          <table className="w-full border-collapse border border-black/10">
            <thead>
              <tr>
                <th className="border border-black/10 text-left text-sm font-semibold p-2">
                  Request No.
                </th>
                <th className="border border-black/10 text-left hidden lg:table-cell text-sm font-semibold p-2">
                  Requested By
                </th>
                <th className="border border-black/10 text-left hidden lg:table-cell text-sm font-semibold p-2">
                  Document Type
                </th>
                <th className="border border-black/10 text-left text-sm font-semibold p-2">
                  File
                </th>
                <th className="border border-black/10 text-left text-sm font-semibold p-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {userRequests.length > 0 ? (
                userRequests.map((request: any) => (
                  <tr key={request._id}>
                    <td className="border border-black/10 text-left text-xs font-normal p-3">
                      <div className="w-full flex flex-wrap items-center justify-start gap-2">
                        <p className="text-xs font-normal">
                          {request.requestNumber}
                        </p>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell border border-black/10 text-left text-xs font-normal p-3">
                      <p className="text-xs font-normal capitalize">
                        {request.requestedBy
                          ? `${request.requestedBy.firstName} ${request.requestedBy.lastName}`
                          : "Not Found"}
                      </p>
                    </td>
                    <td className="hidden lg:table-cell border border-black/10 text-left text-xs font-normal p-3">
                      {request.requestedDocumentType === "barangay-clearance"
                        ? "Barangay Clearance"
                        : request.requestedDocumentType === "barangay-indigency"
                        ? "Barangay Indigency"
                        : request.requestedDocumentType ===
                          "certificate-of-residency"
                        ? "Certificate of Residency"
                        : request.requestedDocumentType ===
                          "first-time-job-seeker"
                        ? "First Time Job Seeker"
                        : ""}
                    </td>
                    <td className="border border-black/10 text-left p-3">
                      <p
                        className="text-green-700 text-xs font-semibold cursor-pointer"
                        onClick={() => generateAndPreviewPdf(request)}
                      >
                        View File
                      </p>
                    </td>
                    <td className="border border-black/10 text-left text-xs font-normal p-3">
                      {request.status === "pending" ? (
                        <div className="inline-flex p-2 rounded-xl bg-yellow-500 text-white text-xs font-normal">
                          Pending
                        </div>
                      ) : request.status === "approved" ? (
                        <div className="inline-flex p-2 rounded-xl bg-green-700 text-white text-xs font-normal">
                          Approved
                        </div>
                      ) : request.status === "declined" ? (
                        <div className="inline-flex p-2 rounded-xl bg-red-700 text-white text-xs font-normal">
                          Declined
                        </div>
                      ) : request.status === "completed" ? (
                        <div className="inline-flex p-2 rounded-xl bg-yellow-500 text-white text-xs font-normal">
                          Completed
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td
                    className="text-center p-6 text-xs font-normal"
                    colSpan={5}
                  >
                    No Results Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex flex-row items-center justify-center space-x-4 py-6">
            {Array.from({ length: pages }, (_, index) => index + 1)
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
                      ? "font-semibold text-sm"
                      : "font-normal text-xs text-[#6E6E6E]"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestsHistory;
