import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const NewsContext = createContext<any | null>(null);

export const NewsProvider = ({ children }: any) => {
  const [news, setNews] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [latestNews, setLatestNews] = useState([]);

  const getNews = async (
    title: string,
    barangayId: string,
    page: number,
    limit: number
  ) => {
    try {
      let url = `http://localhost:8080/api/news-announcements?title=${title}&page=${page}&limit=${limit}&barangayId=${barangayId}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setNews(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        console.log(response.data.data);
        console.log(barangayId);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const getRecentNews = async (barangayId: string, limit: number) => {
    try {
      let url = `http://localhost:8080/api/news-announcements?limit=${limit}&barangayId=${barangayId}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setRecentNews(response.data.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const getLatestNews = async (barangayId: string) => {
    try {
      let url = `http://localhost:8080/api/news-announcements?limit=1&barangayId=${barangayId}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setLatestNews(response.data.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        recentNews,
        totalPages,
        getNews,
        getRecentNews,
        latestNews,
        getLatestNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
