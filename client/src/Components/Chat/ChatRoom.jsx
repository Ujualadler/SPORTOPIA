import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import UserAxios from "../../Axios/userAxios";

function ChatRoom() {
  const userAxios = UserAxios();
  const clubId = useSelector((state) => state.Club.userClubId);
  console.log(clubId+'clubID')
  const userData = useSelector((state) => state.User.UserData);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesHolder = useRef(null)

  useEffect(() => {
    messagesHolder.current.scrollTop = messagesHolder.current.scrollHeight;
  }, [messages])

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000/chat");
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [clubId]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", clubId);

      socket.on("message", (message, receivedClubId) => {
        if (receivedClubId === clubId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
      socket.on("error", (err) => {
        console.log("error", err);
      });
    }
  }, [socket]);

  useEffect(() => {
    try {
      const messageDetails = async () => {
        const response = await userAxios.post("/getMessage", { clubId });
        if (response) {
          const updatedMessages = response?.data?.msg;
          setMessages(updatedMessages);
        }
      };
      messageDetails();
    } catch (error) {}
  }, []);

  const sendMessage = async () => {
    if (message.length !== 0 && socket) {
      try {
        const response = await userAxios.post("/addMessage", {
          message,
          clubId,
        });
        const updatedMessages = response?.data?.msg;
        console.log(updatedMessages, "alefdhadsiufhaidjfhil");
        setMessage("");
        socket.emit("chatMessage", clubId, updatedMessages);
      } catch (error) {
        // Handle error
        console.log(error, "kkkkkkkk");
      }
    }
  };

  return (
    <>
      <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
        <div className="flex bg-gray-600 bg-opacity-60 sm:items-center justify-between py-3 rounded-xl border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4 ml-2">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src={
                  userData.image
                    ? userData.image
                    : "https://cdn-icons-png.flaticon.com/512/47/47774.png"
                }
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-100 mr-3">{userData?.name}</span>
              </div>
              <span className="text-lg text-gray-100">{userData?.email}</span>
            </div>
          </div>
        </div>
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {/* Chat messages go here */}
          <div
            ref={messagesHolder}
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages?.map((msg, index) => (
              <div className="chat-message">
                {msg?.sender?._id == userData?._id ? (
                  <div className="flex justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 ">
                    <div className="relative mr-3 w-full text-sm bg-green-400 py-2 px-4 shadow rounded-xl">
                          <div className="break-words text-gray-900">{msg?.message}</div>
                          <small className="text-xs text-gray-700">
                            {" "}
                            {new Date(msg?.createdAt).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </small>
                        </div>  
                    </div>
                    <img
                      src={
                        msg.sender.image
                          ? msg.sender.image
                          : "https://freepngimg.com/convert-png/62681-flat-icons-face-computer-design-avatar-icon"
                      }
                      alt=""
                      className="w-8 h-8 rounded-full order-1"
                    />
                  </div>
                ) : (
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div className="relative mr-3 w-full text-sm bg-gray-400 py-2 px-4 shadow rounded-xl">
                          <div className="break-words text-gray-900">{msg?.message}</div>
                          <small className="text-xs text-gray-700">
                            {" "}
                            {new Date(msg?.createdAt).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </small>
                        </div>
                    </div>
                    <img
                      src={
                        msg.sender.image
                          ? msg.sender.image
                          : "https://freepngimg.com/convert-png/62681-flat-icons-face-computer-design-avatar-icon"
                      }
                      alt="My profile"
                      className="w-8 h-8 rounded-full order-1"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                    Your error message says permission denied, npm global
                    installs must be given root privileges.
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-2"
              />
            </div>
          </div> */}

            {/* Repeat the above structure for each chat message */}
          </div>
        </div>
        <div className="border-t-2 border-gray-200  px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                </svg>
              </button>
            </span>
            <input
              type="text"
              onKeyDown={(e)=>{if(e.key==='Enter') {
                sendMessage()
              } }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0  sm:flex">
              {/* <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button> */}
              {/* Other buttons */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                {/* Icon */}
              </button>
              {/* Send button */}
              <button
                type="button"
                onClick={sendMessage}
                className="inline-flex items-center justify-center rounded-lg px-4 py-3  transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">
                  Send
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
