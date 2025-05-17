import React, { useEffect, useState } from "react";
import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";
import { useChats } from "../../providers/ChatsProvider";
import axios from "axios";

const Chatbot = ({ onClose }: { onClose: () => void }) => {
  const { userChats, getUserChats } = useChats();
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        console.log(currUser._id);
        setUserId(currUser._id);
        await getUserChats(currUser._id);
      }
    }
  };

  const sendMessage = async () => {
    try {
      let url = `http://localhost:8080/api/chat-bot-messages`;

      let response = await axios.post(url, {
        message: message,
        from: "user",
        userId: userId,
      });

      if (response.data.success === true) {
        console.log(response.data);
        await getData();
        setMessage("");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="fixed bottom-20 lg:bottom-2 left-2 lg:left-[100px] bg-green-700 rounded-xl w-[300px] lg:w-[600px] z-20 shadow-xl shadow-black/10 overflow-hidden">
      <div className="w-full flex flex-row items-center justify-between p-6">
        <p className="text-xs font-normal text-white">BRGY 360 Chatbot</p>
        <RiCloseLine
          size={16}
          color="white"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="w-full bg-white min-h-[30vh] max-h-[30vh] p-6 overflow-y-auto flex flex-col gap-4">
        {userChats.map((chat: any) => (
          <div
            key={chat._id}
            className={`p-3 rounded-xl flex max-w-[60%] mb-2 ${
              chat.from === "user"
                ? "bg-gray-200 self-end text-right"
                : "bg-green-700 self-start text-left text-white"
            }`}
          >
            <p className="text-xs font-normal">{chat.message}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-between gap-4 p-6 bg-white">
        <input
          type="text"
          className="text-xs font-normal outline-none border border-green-700 p-3 rounded-xl w-full"
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <RiSendPlaneFill
          size={24}
          color="green"
          className="cursor-pointer"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chatbot;
