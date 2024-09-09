import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import Dropdown from "react-bootstrap/Dropdown";
import Message from "./Message";
import { toast } from "react-toastify";

const ChatBox = ({
  chatBox,
  setChatBox,
  theme,
  chatUser,
  conversationId,
  user,
}) => {
  const [messages, setMessages] = useState([]);
  const [con, setCon] = useState("");
  const [isPicker, setisPicker] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [file, setFile] = useState({});
  const [image, setImage] = useState({});
  const [isAudioCall, setIsAudioCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const containerRef = useRef(null);
  const fileAttachRef = useRef(null);
  const imageAttachRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;

      try {
        // console.log("first");
        const { data } = await axios.post("http://localhost:3030/getmessages", {
          conversationId,
        });
        setMessages(data);
      } catch (error) {
        toast.error(error.response?.data || "Error fetching messages");
      }
    };

    fetchMessages(); // Initial fetch
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    if (!isUserScrolling) {
      const container = containerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, isUserScrolling]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsUserScrolling(!isAtBottom);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleMessage = async (e) => {
    e.preventDefault();
    setisPicker(false);
    if (
      !(
        image &&
        Object.keys(image).length === 0 &&
        image.constructor === Object
      )
    ) {
      // console.log(image);
      const formdata = new FormData();
      formdata.append("conversationId", conversationId);
      formdata.append("sender", user._id);

      formdata.append("image", image);
      try {
        await axios
          .post("http://localhost:3030/uploadimage", formdata)
          .then((res) => {
            // console.log(res);
            imageAttachRef.current.value = "";
            setImage({});
            // setCon("");
            return;
          });
      } catch (error) {
        toast.error(error.response?.data?.message || "Error sending message");
      }

      return;
    } else if (
      !(file && Object.keys(file).length === 0 && file.constructor === Object)
    ) {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("conversationId", conversationId);
      formdata.append("sender", user._id);

      try {
        await axios
          .post("http://localhost:3030/uploadfile", formdata)
          .then((res) => {
            // console.log(res);
            fileAttachRef.current.value = "";

            setFile({});
            // setCon("");
            return;
          });
      } catch (error) {
        toast.error(error.response?.data?.message || "Error sending message");
      }
      return;
    } else if (!con.trim()) return;

    try {
      await axios.post("http://localhost:3030/sendmessage", {
        content: con,
        sender: user._id,
        conversationId,
      });
      setCon("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  };

  const handleFileAttach = (e) => {
    e.preventDefault();
    console.log("Ameen");
    const file = e.target.files[0];
    // console.log(file);
    setFile(file);
  };

  const handleImageAttach = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div
      id="chatbox"
      className="chat-box"
      style={{
        left: chatBox,
        color: theme ? "#eff2f7" : "#343a40",
        backgroundColor: theme ? "#262e35" : "#ffffff",
        display: chatBox === "100vw" ? "none" : "block",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          borderBottom: `1px solid ${theme ? "#36404a" : "#f0eff5"}`,
        }}
        className="p-4 d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="back-btn"
            onClick={() => setChatBox("100vw")}
            style={{
              background: "transparent",
              border: "none",
              paddingRight: "6px",
              marginRight: "16px",
            }}
          >
            <i
              className="ri-arrow-left-line"
              style={{
                color: theme ? "white" : "black",
                fontSize: "30px",
              }}
            ></i>
          </button>
          <img
            className="rounded-circle"
            style={{ width: "35.19px", height: "35.19px", marginRight: "16px" }}
            src={chatUser?.profile_photo_url}
            alt={chatUser?.name || "Chat User"}
          />
          <h5
            style={{
              fontSize: "16px",
              margin: "0",
              color: theme ? "#eff2f7" : "#343a40",
            }}
          >
            {chatUser?.name}
          </h5>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ color: theme ? "#abb4d2" : "#7a7f9a" }}
        >
          <div style={{ position: "relative" }}>
            <i
              className="ri-search-line"
              style={{ marginRight: "30px", fontSize: "20px" }}
              onClick={() => {
                setIsSearchOpen(true);
              }}
            ></i>
            {isSearchOpen && (
              <div
                className=" "
                onClick={() => {
                  setIsSearchOpen(false);
                }}
                style={{
                  position: "fixed",

                  left: "0",
                  right: "0",
                  top: "0",
                  bottom: "0",
                  background: "transparent",
                  zIndex: "200",
                }}
              >
                <div
                  style={{
                    width: "238px",
                    borderRadius: "3px",
                    marginTop: "65px",
                    right: "250px",
                    padding: "8px",
                    position: "absolute",
                    height: "",
                    backgroundColor: theme ? "#303841" : "#fff",
                    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
                  }}
                  className="d-flex flex-column"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="text"
                    name="search"
                    id=""
                    className={
                      "form-control rounded " + theme
                        ? "phColorDark"
                        : "phColorLight"
                    }
                    placeholder="Search..."
                    style={{
                      backgroundColor: theme ? "#404851" : "#efefef",
                      border: "none",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <i
            className="ri-phone-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
            onClick={() => setIsAudioCall(true)}
          ></i>
          <i
            className="ri-vidicon-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
            onClick={() => setIsVideoCall(true)}
          ></i>
          <i
            className="ri-user-2-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
          ></i>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="profile"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: theme ? "#abb4d2" : "#7a7f9a",
              }}
            >
              <i
                className="ri-more-fill"
                style={{ marginRight: "5px", fontSize: "20px" }}
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div
        className="chatbox-chat p-4"
        ref={containerRef}
        style={{ width: "100%", zIndex: 10, overflowY: "scroll" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {messages.map((message) => (
            <Message
              key={message._id}
              // content={message.content}
              left={message.sender === chatUser._id}
              // sentAt={message.createdAt}
              message={message}
              theme={theme}
              user={user}
              chatUser={chatUser}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          borderTop: `1px solid ${theme ? "#36404a" : "#f0eff5"}`,
          position: "absolute",
          bottom: "0",
        }}
        className="p-4"
      >
        <form
          onSubmit={handleMessage}
          className="d-flex justify-content-between align-items-center"
        >
          <input
            type="text"
            className={`form-control form-control-lg ${
              theme ? "phColorDark" : "phColorLight"
            }`}
            placeholder="Enter Message..."
            style={{
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
              fontSize: "16px",
              border: "none",
            }}
            value={con}
            onChange={(e) => setCon(e.target.value)}
          />
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ position: "relative" }}>
              {isPicker && (
                <div
                  style={{
                    position: "absolute",
                    marginTop: "-470px",
                    marginLeft: "-320px",
                    backgroundColor: "red",
                  }}
                >
                  <EmojiPicker
                    onEmojiClick={(emoji) => setCon(con + emoji.emoji)}
                  />
                </div>
              )}
              <div
                onClick={() => setisPicker(!isPicker)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="ri-emotion-happy-line"
                  style={{
                    marginRight: "30px",
                    fontSize: "16px",
                    marginLeft: "16px",
                    color: "#7269ef",
                  }}
                ></i>
              </div>
            </div>
            <div onClick={() => fileAttachRef.current.click()}>
              <input
                type="file"
                ref={fileAttachRef}
                name="attachment"
                id="attachment"
                // value={file}
                style={{ display: "none" }}
                onChange={handleFileAttach}
              />
              <i
                className="ri-attachment-line"
                style={{
                  marginRight: "35px",
                  fontSize: "16px",
                  color: "#7269ef",
                }}
              ></i>
            </div>
            <div onClick={() => imageAttachRef.current.click()}>
              <input
                type="file"
                ref={imageAttachRef}
                name="attachment"
                id="attachment"
                // value={image}
                style={{ display: "none" }}
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageAttach}
              />
              <i
                className="ri-image-fill"
                style={{
                  marginRight: "20px",
                  fontSize: "16px",
                  color: "#7269ef",
                }}
              ></i>
            </div>
            {/* <p>{file}</p> */}
            <button
              type="submit"
              style={{
                padding: "9px 17px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#7269ef",
              }}
            >
              <i
                className="ri-send-plane-2-fill"
                style={{ fontSize: "16px", color: "#fff" }}
              ></i>
            </button>
          </div>
        </form>
      </div>
      {(isAudioCall || isVideoCall) && (
        <div
          className="d-flex justify-content-center align-items-center "
          onClick={() => {
            setIsAudioCall(false);
            setIsVideoCall(false);
          }}
          style={{
            position: "fixed",

            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.626)",
            zIndex: "200",
          }}
        >
          <div
            style={{
              width: "500px",
              borderRadius: "6px",
              padding: "16px",
              height: "",
              backgroundColor: theme ? "#303841" : "#f7f7ff",
            }}
            className="d-flex flex-column"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="text-center align-items-center"
              style={{
                width: "100%",
                padding: "24px",
              }}
            >
              <div style={{ marginBottom: "24px" }} className="mx-auto">
                <img
                  className="rounded-circle"
                  src={chatUser.profile_photo_url}
                  alt={chatUser.name}
                  style={{
                    width: "96px",
                    height: "96px",
                  }}
                />
              </div>
              <h5
                style={{
                  color: theme ? "#eff2f7" : "#343a40",
                  fontSize: "22px",
                }}
              >
                {chatUser.name}
              </h5>{" "}
              <p style={{ color: theme ? "#abb4d2" : "#7a7f9a" }}>{`Start ${
                isAudioCall ? "Audio" : "Video"
              } Call`}</p>
              <div className="d-flex justify-content-center mt-5">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#ef476f",
                    borderRadius: "50%",
                    color: "white",
                    alignContent: "center",
                  }}
                  onClick={() => {
                    setIsAudioCall(false);
                    setIsVideoCall(false);
                  }}
                >
                  <i className="ri-close-line" style={{ fontSize: "25px" }}></i>
                </div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#06d6a0",
                    borderRadius: "50%",
                    alignContent: "center",
                    marginLeft: "24px",
                    color: "white",
                  }}
                >
                  <i
                    className={`ri-${isAudioCall ? "phone" : "vidicon"}-fill`}
                    style={{ color: theme ? "#eff2f7" : "", fontSize: "25px" }}
                  ></i>
                </div>
              </div>
            </div>
            {/* <div className="p-4">
              <div className="mb-4">
                <label
                  htmlFor="newGroupName"
                  style={{
                    width: "100%",
                    fontWeight: "500",
                    color: theme ? "#a6b0cf" : "",
                  }}
                  className="form-label mb-2"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setNewGroupName(e.target.value)}
                  value={newGroupName}
                  name="newGroupName"
                  placeholder="Enter group name"
                  id="newgroupName"
                  // className="form-control"
                  className={`form-control ${
                    theme ? "phColorDark" : "phColorLight"
                  }`}
                  style={{
                    background: "transparent",
                    border: "1px solid " + (theme ? "#36404a" : "#f0eff5"),

                    padding: "8px 16px",
                    color: theme ? "white" : "black",
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newGroupName"
                  style={{
                    width: "100%",
                    fontWeight: "500",
                    color: theme ? "#a6b0cf" : "",
                  }}
                  className="form-label mb-2"
                >
                  Group Members
                </label>
                <button
                  style={{
                    backgroundColor: theme ? "rgb(68 74 93)" : "#d6dbe5",
                    color: theme ? "#eff2f7" : "",
                    fontSize: "14px",
                    padding: "4px 8px",
                    marginBottom: "12px",
                    border: "none",
                  }}
                  onClick={() => setIsContactsOpen(!isContactsOpen)}
                >
                  Select Members
                </button>
                {isContactsOpen && (
                  <div
                    style={{
                      border: "1px solid " + theme ? "#36404a" : "",
                      backgroundColor: theme ? "#262e35" : "",
                    }}
                  >
                    <div
                      className=""
                      style={{
                        padding: "12px 20px",
                        backgroundColor: theme ? "#a6b0cf08" : "",
                      }}
                    >
                      <h6
                        style={{
                          fontSize: "15px",
                          color: theme ? "#eff2f7" : "",
                          margin: "0",
                        }}
                      >
                        Contacts
                      </h6>
                    </div>
                    <div
                      className="p-2"
                      style={{ maxHeight: "166px", overflowY: "scroll" }}
                    >
                      {Object.keys(contacts)
                        .sort()
                        .map((key, index) => {
                          return (
                            <div className="" key={key}>
                              <div
                                className="p-3"
                                style={{ fontWeight: "500", color: "#7269ef" }}
                              >
                                {key.toUpperCase()}
                              </div>
                              {contacts[key].map((contact, index) => {
                                return (
                                  <div
                                    className=""
                                    style={{ padding: "10px 20px" }}
                                    key={index}
                                  >
                                    <div
                                      className="d-flex align-items-center justify-content-between"
                                      style={{}}
                                    >
                                      <div className="d-flex align-items-center">
                                        <input
                                          type="checkbox"
                                          name="checkbox"
                                          id="index"
                                          style={{
                                            background: "red",
                                            accentColor: "rgb(137 130 237)",
                                          }}
                                        />
                                        <h5
                                          className="align-items-center"
                                          style={{
                                            fontSize: "15px",
                                            margin: "0 8px",
                                            color: theme
                                              ? "#eff2f7"
                                              : "#343a40",
                                          }}
                                        >
                                          {contact}
                                        </h5>
                                      </div>
                                      <i
                                        className="ri-more-2-fill"
                                        style={{
                                          color: theme ? "#abb4d2" : "#7a7f9a",
                                          fontSize: "15px",
                                        }}
                                      ></i>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="newGroupDesc"
                  style={{
                    width: "100%",
                    fontWeight: "500",

                    color: theme ? "#a6b0cf" : "",
                  }}
                  className="form-label mb-2"
                >
                  Description
                </label>
                <textarea
                  type="textarea"
                  name="newGroupDesc"
                  placeholder="Enter description"
                  id="newgroupDesc"
                  className={`form-control ${
                    theme ? "phColorDark" : "phColorLight"
                  }`}
                  style={{
                    background: "transparent",
                    border: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
                    color: theme ? "white" : "black",
                  }}
                />
              </div>
            </div> */}
            {/* <div
              className="d-flex justify-content-end p-3"
              style={{
                borderTop: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
              }}
            >
              <div className="d-flex">
                <button
                  onClick={() => setIsGroupModal(!isGroupModal)}
                  style={{
                    background: "transparent",
                    border: "none",
                    // padding: "none",
                    color: theme ? "#aaa5f5" : "#7269ef",
                    margin: "4px",
                    padding: "8px 12px",
                    // marginRight: "16px",
                  }}
                >
                  Close
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="rounded"
                  style={{
                    background: "#7269ef",
                    color: "#ffffff",
                    border: "none",
                    margin: "4px",
                    fontWeight: "500",
                    padding: "8px 12px",
                  }}
                >
                  Create Group
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
