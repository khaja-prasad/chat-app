import React, { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  theme,
  setThemee,
  isSelected,
  setIsSelected,
  user,
  setUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const nav = useNavigate();
  const arr = ["My Profile", "Chats", "Groups", "Contacts", "Settings"];

  const toggleDropup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      id="sidebar"
      className=" sidebar"
      style={{ backgroundColor: theme ? "#36404a" : "#ffffff" }}
    >
      <div id="topLogo">
        <SidebarIcon
          icon={<i className="ri-chat-voice-fill"></i>}
          theme={theme}
          arr={"logo"}
        />
      </div>
      <div id="sidebarMiddleIcons" className="">
        <SidebarIcon
          icon={
            <i
              className="ri-user-2-line"
              style={{ color: theme ? "" : "" }}
            ></i>
          }
          fontSize={"25px"}
          theme={theme}
          isSelected={isSelected}
          arr={arr[0]}
          setIsSelected={() => setIsSelected(arr[0])}
        />
        <SidebarIcon
          icon={<i className="ri-message-3-line"></i>}
          theme={theme}
          isSelected={isSelected}
          arr={arr[1]}
          setIsSelected={() => setIsSelected(arr[1])}
        />
        <SidebarIcon
          icon={<i className="ri-group-line"></i>}
          theme={theme}
          isSelected={isSelected}
          arr={arr[2]}
          setIsSelected={() => setIsSelected(arr[2])}
        />
        <SidebarIcon
          icon={<i className="ri-contacts-line"></i>}
          theme={theme}
          isSelected={isSelected}
          arr={arr[3]}
          setIsSelected={() => setIsSelected(arr[3])}
        />
        <SidebarIcon
          icon={<i className="ri-settings-2-line"></i>}
          theme={theme}
          isSelected={isSelected}
          arr={arr[4]}
          setIsSelected={() => setIsSelected(arr[4])}
        />
      </div>
      <div id="bottomIcons" className="lastIcons">
        <SidebarIcon
          setIsSelected={() => setThemee()}
          icon={
            theme ? (
              <i className="ri-sun-line"></i>
            ) : (
              <i className="ri-moon-line"></i>
            )
          }
          theme={theme}
          isSelected={isSelected}
        />
        <SidebarIcon
          theme={theme}
          icon={
            <div className="dropup">
              <button className="dropbtn" onClick={toggleDropup}>
                <img
                  src={user.profile_photo_url}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: "35.19px", height: "35.19px" }}
                />
              </button>
              {isOpen && (
                <div className="dropup-content">
                  <div
                    className="text-center rounded"
                    onClick={() => {
                      setUser("");
                      nav("/");
                    }}
                    style={{
                      cursor: "pointer",
                      color: theme ? "#eff2f7" : "#343a40",
                      backgroundColor: theme ? "black" : "white",
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          }
          isSelected={isSelected}
          arr="profile-main"
          setIsSelected={toggleDropup}
        />
      </div>
    </div>
  );
};

export default Sidebar;
