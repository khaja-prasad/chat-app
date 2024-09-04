import React, { useState } from "react";
import ChatMenu from "./ChatMenu";
import Profile from "./Profile";
import Groups from "./Groups";
import Contacts from "./Contacts";
import Settings from "./Settings";

const MenuDesc = ({
  setChatBox,
  theme,
  isSelected,
  chatUser,
  setConversationId,
  setChatUser,
  user,
  users,
}) => {
  const [groupSelected, setGroupSelected] = useState("");

  return (
    <div
      id="middle"
      className="menudesc"
      style={{
        backgroundColor: theme ? "#303841" : "#f7f7ff",
        overflow: "hidden",
      }}
    >
      {isSelected === "My Profile" && (
        <Profile isSelected={isSelected} theme={theme} user={user} />
      )}
      {isSelected === "Chats" && (
        <ChatMenu
          isSelected={isSelected}
          theme={theme}
          chatUser={chatUser}
          users={users}
          setChatBox={(e) => setChatBox(e)}
          setChatUser={(e) => setChatUser(e)}
        />
      )}
      {isSelected === "Groups" && (
        <Groups
          isSelected={isSelected}
          theme={theme}
          groupSelected={groupSelected}
          setGroupSelected={(e) => setGroupSelected(e)}
        />
      )}
      {isSelected === "Contacts" && (
        <Contacts
          isSelected={isSelected}
          theme={theme}
          user={user}
          users={users}
        />
      )}
      {isSelected === "Settings" && (
        <Settings isSelected={isSelected} theme={theme} user={user} />
      )}
    </div>
  );
};

export default MenuDesc;
