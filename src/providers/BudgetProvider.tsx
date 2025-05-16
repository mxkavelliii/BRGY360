import axios, { mergeConfig } from "axios";
import React, { createContext, useContext, useState } from "react";

const BudgetContext = createContext<any>(null);

export const BudgetProvider = ({ children }: any) => {
  const [budgets, setBudgets] = useState([]);
  const [years, setYears] = useState([]);

  const getBudgets = async (year: string, barangayId: string) => {
    if (barangayId) {
      try {
        let url = `http://localhost:8080/api/budgets?barangayId=${barangayId}&date=${year}`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          if (response.data.data.length > 0) {
            setYears(response.data.years);
          } else {
            setYears([]);
          }
          setBudgets(response.data.data);
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <BudgetContext.Provider value={{ budgets, years, getBudgets }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
