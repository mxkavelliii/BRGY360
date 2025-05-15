import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const AchievementsContext = createContext<any>(null);

export const AchievementsProvider = ({ children }: any) => {
  const [achievements, setAchievements] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [recentAchievements, setRecentAchievements] = useState([]);

  const getAchievements = async (
    title: string,
    barangayId: string,
    page: number,
    limit: number
  ) => {
    try {
      let url = `http://localhost:8080/api/accomplishments-achievements?title=${title}&barangayId=${barangayId}&page=${page}&limit=${limit}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setAchievements(response.data.data);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const getRecentAchievements = async (barangayId: string, limit: number) => {
    try {
      let url = `http://localhost:8080/api/accomplishments-achievements?limit=${limit}&barangayId=${barangayId}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setRecentAchievements(response.data.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AchievementsContext.Provider
      value={{
        getAchievements,
        achievements,
        totalPages,
        recentAchievements,
        getRecentAchievements,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementsContext);
