import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import Message from "../components/Message";
import group from "../static/grp.jpg";
import { getAuth } from "firebase/auth";

const Messenger = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [chatBox, setChatBox] = useState(false);
  const [currentChat, setCurrentChat] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { projects } = useSelector((state) => state.getprojects);
  const socket = useRef();
  const scrollRef = useRef();

  let API_URL1 = "https://procolab.herokuapp.com/";
  let API_URL = "/api/";
  if (process.env.REACT_APP_ENV === "dev") {
    API_URL1 = process.env.REACT_APP_API_PREFIX;
    API_URL = process.env.REACT_APP_API_PREFIX + API_URL;
  }
  // useEffect(() => {
  //   socket.current = io(API_URL1);
  //   if (user) {
  //     socket.current.on("getMessage", (data) => {
  //       setMessages((prev) => {
  //         return [
  //           ...prev,
  //           {
  //             senderId: data.senderId,
  //             text: data.text,
  //             createdAt: Date.now(),
  //           },
  //         ];
  //       });
  //     });
  //   }
  // }, []);

  const handleJoinUser = () => {
    if (user) {
      socket.current.emit("addUser", {
        userId: user.userId,
        currentChat: currentChat,
      });
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}messages/${currentChat}`, {
          headers: {
            "x-auth-token": user.token,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user && currentChat) {
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.current.emit("sendMessage", {
      senderId: user.userId,
      currentChat: currentChat,
      text: newMessage,
    });

    try {
      const message = {
        sender: user.userId,
        projectId: currentChat,
        text: newMessage,
      };
      const res = await axios.post(`${API_URL}messages`, message, {
        headers: {
          "x-auth-token": user.token,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {!chatBox ? (
        <div class="flex h-full relative ">
          <div class="bg-blue-500 w-px "></div>
          {user ? (
            <div class="fixed">
              <div class="ml-20 text-2xl text-purple-700 mb-4 ">
                Chat with your teams!{" "}
              </div>
              <h1 class="flex ml-28">List of all joined projects</h1>
              <div class="bg-blue-500 mt-4 h-px w-full "> </div>
              <div class="overflow-y-auto flex flex-col ">
                {projects.map((project) => {
                  if (
                    project.colaborators.find(
                      (c) => c.toString() === user.userId
                    )
                  ) {
                    return (
                      <div
                        class="ml-2 shadow-md mt-2 mb-2 cursor-pointer hover:bg-gray-200  "
                        onClick={() => {
                          handleJoinUser();
                          setCurrentChat(project._id);
                          setChatBox(true);
                        }}
                      >
                        <div class="flex">
                          <img
                            src={group}
                            class="h-10 rounded-full"
                            alt=""
                          ></img>
                          <div class="text-lg text-gray-800 ml-4 font-semibold">
                            {project.name}
                          </div>
                        </div>
                        <div class="flex flex-row ml-16">
                          <div class="text-sm">Colaborators: &nbsp;</div>
                          {project.colaboratorsUsername.map((colaborator) => (
                            <div>
                              <div class="text-sm text-gray-400">
                                {colaborator},
                              </div>
                            </div>
                          ))}
                        </div>
                        <div class="bg-blue-300 mt-4 h-px shadow-lg "> </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <h1 class="ml-4 mt-4">Please login to chat with your teams...</h1>
          )}
        </div>
      ) : (
        <div class="flex fixed bg-blue-100  h-full w-full">
          <button
            class="absolute ml-72 top-0 border-2 border-dotted border-gray-300 px-3 mt-2"
            onClick={() => {
              setChatBox(false);
            }}
          >
            Back
          </button>
          <div class="flex flex-col justify-between w-full overflow-scroll">
            <div class="flex flex-col">
              {messages.map((m) => (
                <div ref={scrollRef} class="flex ">
                  <Message message={m} own={m.sender === user.userId} />
                </div>
              ))}
            </div>
            <div class="flex sticky bottom-0 py-5">
              <textarea
                class="w-64 h-24 px-3 ml-2 py-2 rounded-md"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button
                class="w-16 h-10 border-2  bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-md focus:outline-none focus:shadow-outline ml-2 "
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Messenger;
