import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const ChatsContext = createContext<any>(null);

export const ChatsProvider = ({ children }: any) => {
  const [userChats, setUserChats] = useState([]);
  const [adminChats, setAdminChats] = useState([]);

  const getUserChats = async (userId: string) => {
    try {
      let url = `http://localhost:8080/api/chat-bot-messages?userId=${userId}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setUserChats(response.data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getAdminChats = async (barangayId: string) => {
    try {
      let url = `http://localhost:8080/api/chat-bot-messages?grouped=true&barangayId=${barangayId}`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setAdminChats(response.data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ChatsContext.Provider
      value={{ getUserChats, userChats, adminChats, getAdminChats }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => useContext(ChatsContext);
