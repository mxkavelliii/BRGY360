import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const BarangayContext = createContext<any | null>(null);

export const BarangayProvider = ({ children }: any) => {
  const [barangays, setBarangays] = useState([]);

  const getBarangays = async () => {
    try {
      let url = "http://localhost:8080/api/barangays";

      let response = await axios.get(url);

      if (response.data.success === true) {
        setBarangays(response.data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <BarangayContext.Provider value={{ barangays, getBarangays }}>
      {children}
    </BarangayContext.Provider>
  );
};

export const useBarangay = () => useContext(BarangayContext);
