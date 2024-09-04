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
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const containerRef = useRef(null);
  const fileAttachRef = useRef(null);
  const imageAttachRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;

      try {
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
    //     if (image) {
    //       try {
    //         await axios.post("http://localhost:3030/sendmessage", {
    //           sender: user._id,
    //           conversationId,
    //           image:[image.]
    //         });
    //         setCon("");
    //       } catch (error) {
    //         toast.error(error.response?.data?.message || "Error sending message");
    //       }

    //       return;
    //     } else
    //       if (file) {
    // try {
    //   await axios.post("http://localhost:3030/sendmessage", {
    //     content: con,
    //     sender: user._id,
    //     conversationId,
    //   });
    //   setCon("");
    // } catch (error) {
    //   toast.error(error.response?.data?.message || "Error sending message");
    // }
    //       return;
    //       } else
    if (!con.trim()) return; // Prevent sending empty messages

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
    const file = e.target.files[0];
    console.log(file);
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
              class="ri-arrow-left-line"
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
          <i
            className="ri-search-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
          ></i>
          <i
            className="ri-phone-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
          ></i>
          <i
            className="ri-vidicon-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
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
              content={message.content}
              left={message.sender === chatUser._id}
              sentAt={message.createdAt}
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
                style={{ display: "none" }}
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
    </div>
  );
};

export default ChatBox;
