import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
// import { toast } from "react-toastify";
import MenuDesc from "./MenuDesc";
import ChatBox from "./ChatBox";

const Dashboard = ({ user, setUser }) => {
  const [isSelected, setIsSelected] = useState("Chats");
  const [chatUser, setchatUser] = useState("Khaja1");
  const [users, setUsers] = useState([]);
  const [theme, setTheme] = useState(false);
  const [chatBox, setChatBox] = useState("0");
  const [conversationId, setConversationId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!user) navigate("/");
      const userss = (
        await axios.get("http://localhost:3030/users")
      ).data.filter((userr) => userr?._id !== user?._id);

      setUsers(userss);
      setchatUser(userss[0]);
    })();
    return () => {};
  }, []);

  return (
    <>
      <div
        className="conta"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: theme ? "#303841" : "#f1f1ff",
        }}
      >
        <Sidebar
          setThemee={() => setTheme(!theme)}
          theme={theme}
          isSelected={isSelected}
          user={user}
          setUser={(e) => setUser(e)}
          setIsSelected={(e) => setIsSelected(e)}
        />

        <MenuDesc
          chatUser={chatUser}
          setChatUser={(e) => setchatUser(e)}
          setChatBox={setChatBox}
          theme={theme}
          user={user}
          setConversationId={(e) => setConversationId(e)}
          users={users}
          isSelected={isSelected}
        />
        <ChatBox
          chatBox={chatBox}
          setChatBox={setChatBox}
          theme={theme}
          conversationId={conversationId}
          user={user}
          chatUser={chatUser}
        />
      </div>
    </>
  );
};

export default Dashboard;
