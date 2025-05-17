import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useChats } from "../../providers/ChatsProvider";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from "axios";

const Chatbot = () => {
  const { adminChats, getAdminChats } = useChats();
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const selectedChat = adminChats.find(
    (chat: any) => chat.user._id === selectedUser
  );

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat]);

  const getData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        await getAdminChats(currUser.barangayId);
      }
    }
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    try {
      let url = `http://localhost:8080/api/chat-bot-messages`;

      let response = await axios.post(url, {
        message: message,
        from: "chatbot",
        userId: selectedUser,
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
    <>
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          {/* header */}
          <div className="w-full flex flex-row items-center justify-start">
            <p className="text-sm font-semibold capitalize">Chatbot</p>
          </div>
          <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-2">
            {adminChats.length > 0 ? (
              <div className="w-full lg:w-1/4 flex flex-col items-center justify-center bg-gray-200 rounded-xl overflow-hidden overflow-y-auto max-h-[20vh] lg:max-h-[60vh]">
                {adminChats.map((chat: any) => {
                  const isSelected = selectedUser === chat.user._id;

                  return (
                    <div
                      className={`w-full flex flex-row items-center justify-start p-4 gap-2 cursor-pointer ${
                        isSelected ? "bg-green-700 text-white" : ""
                      }`}
                      key={chat.user._id}
                      onClick={() => setSelectedUser(chat.user._id)}
                    >
                      <div
                        className="shrink-0 bg-cover bg-center h-[40px] w-[40px] bg-white rounded-full"
                        style={{
                          backgroundImage: `url("http://localhost:8080/api/images/${chat.user.profile}")`,
                        }}
                      ></div>
                      <p className="text-xs font-normal">{`${chat.user.firstName} ${chat.user.lastName}`}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full lg:w-1/4 flex flex-col items-center justify-center bg-gray-200 rounded-xl overflow-hidden overflow-y-auto max-h-[20vh] lg:max-h-[60vh]">
                <div className="w-full flex items-center justify-center p-6">
                  <p className="text-xs font-normal">No Messages Found</p>
                </div>
              </div>
            )}

            {selectedChat ? (
              <div className="w-full lg:w-3/4 flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-200 shadow-xl shadow-black/20 overflow-hidden">
                {/* image and user name */}
                <div className="w-full flex flex-row items-center justify-start gap-2 p-6 bg-white">
                  <div
                    className="shrink-0 bg-cover bg-center h-[40px] w-[40px] bg-gray-200 rounded-full"
                    style={{
                      backgroundImage: selectedChat
                        ? `url("http://localhost:8080/api/images/${selectedChat.user.profile}")`
                        : "",
                    }}
                  ></div>
                  <p className="text-xs font-normal">
                    {selectedChat
                      ? `${selectedChat.user.firstName} ${selectedChat.user.lastName}`
                      : "User Name"}
                  </p>
                </div>

                {/* messages */}
                <div className="w-full flex flex-col items-start justify-start gap-2 p-6 min-h-[60vh] max-h-[60vh] overflow-y-auto">
                  {selectedChat?.messages.map((msg: any, index: number) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl max-w-[75%] ${
                        msg.from === "user"
                          ? "bg-white self-start text-black"
                          : "bg-green-700 self-end text-white"
                      }`}
                    >
                      <p className="text-sm ">{msg.message}</p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* input */}
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
            ) : (
              <div className="w-full lg:w-3/4 flex flex-col items-center justify-center gap-6 rounded-xl bg-white shadow-xl shadow-black/20 overflow-hidden min-h-[60vh]">
                <p>No Selected Chat</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
