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
  const navigate = useNavigate();

  const sections = [
    { name: "My Profile", icon: "ri-user-2-line" },
    { name: "Chats", icon: "ri-message-3-line" },
    { name: "Groups", icon: "ri-group-line" },
    { name: "Contacts", icon: "ri-contacts-line" },
    { name: "Settings", icon: "ri-settings-2-line" },
  ];

  const handleLogout = () => {
    setUser("");
    navigate("/");
  };

  return (
    <div
      id="sidebar"
      className="sidebar"
      style={{ backgroundColor: theme ? "#36404a" : "#ffffff" }}
    >
      <div id="topLogo">
        <SidebarIcon
          icon={<i className="ri-chat-voice-fill"></i>}
          theme={theme}
          arr={"logo"}
        />
      </div>

      <div id="sidebarMiddleIcons">
        {sections.map(({ name, icon }) => (
          <SidebarIcon
            key={name}
            icon={<i className={icon}></i>}
            fontSize="25px"
            theme={theme}
            isSelected={isSelected}
            arr={name}
            setIsSelected={() => setIsSelected(name)}
          />
        ))}
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
              <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <img
                  src={user?.profile_photo_url}
                  alt={user?.name || "User"}
                  className="rounded-circle"
                  style={{ width: "35.19px", height: "35.19px" }}
                />
              </button>
              {isOpen && (
                <div className="dropup-content">
                  <div
                    className="text-center rounded"
                    onClick={handleLogout}
                    style={{
                      cursor: "pointer",
                      color: theme ? "#eff2f7" : "#343a40",
                      backgroundColor: theme ? "#000" : "#fff",
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
          setIsSelected={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
