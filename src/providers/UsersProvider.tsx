import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const UsersContext = createContext<any | null>(null);

export const UsersProvider = ({ children }: any) => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getUsers = async (
    search: string,
    barangayId: string,
    page: number,
    limit: number,
    status: string,
    role: string
  ) => {
    if (barangayId) {
      try {
        let url = `http://localhost:8080/api/users?search=${search}&barangayId=${barangayId}&page=${page}&limit=${limit}&status=${status}&role=${role}`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          console.log(response.data.data);
          setUsers(response.data.data);
          setTotalPages(response.data.meta.totalPages);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <UsersContext.Provider value={{ users, getUsers, totalPages }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
