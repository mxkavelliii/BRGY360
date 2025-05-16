import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const RequestsContext = createContext<any>(null);

export const RequestsProvider = ({ children }: any) => {
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [userRequests, setUserRequests] = useState([]);
  const [pages, setPages] = useState(0);

  const getRequests = async (
    search: string,
    barangayId: string,
    status: string,
    requestedDocumentType: string,
    page: number,
    limit: number
  ) => {
    try {
      let url = `http://localhost:8080/api/file-requests?search=${search}&barangayId=${barangayId}&status=${status}&requestedDocumentType=${requestedDocumentType}&page=${page}&limit=${limit}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setRequests(response.data.data);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUserRequests = async (
    userId: string,
    status: string,
    requestedDocumentType: string,
    page: number,
    limit: number
  ) => {
    try {
      let url = `http://localhost:8080/api/file-requests?requestedBy=${userId}&status=${status}&requestedDocumentType=${requestedDocumentType}&page=${page}&limit=${limit}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        console.log(url);
        setUserRequests(response.data.data);
        setPages(response.data.meta.totalPages);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <RequestsContext.Provider
      value={{
        requests,
        getRequests,
        totalPages,
        getUserRequests,
        userRequests,
        pages,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
