import React, { useState } from "react";
import { toast } from "react-toastify";

const Groups = ({
  isSelected,
  theme,
  groupSelected,
  setGroupSelected,
  users,
}) => {
  const [groups, setGroups] = useState([
    { name: "Group1" },
    { name: "Group2" },
    { name: "Group3" },
    { name: "Group4" },
    { name: "Group5" },
    { name: "Group6" },
  ]);
  const [isGroupModal, setIsGroupModal] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const contacts = {};

  users.forEach((user) => {
    const firstLetter = user.name[0].toUpperCase();

    if (!contacts[firstLetter]) {
      contacts[firstLetter] = [];
    }
    contacts[firstLetter].push(
      user.name.charAt(0).toUpperCase() + user.name.slice(1)
    );
  });
  const handleCreateGroup = () => {
    if (!newGroupName)
      return toast.error(
        "Enter Group Name,it should not be empty to create a New Group!!",
        { autoClose: 4000 }
      );
    setGroups((prev) => [...prev, { name: newGroupName }]);
    setNewGroupName("");
    setIsContactsOpen(false);
    setIsGroupModal(!isGroupModal);
  };
  return (
    <div>
      <div className="d-flex flex-column justify-content-between px-4 py-4">
        <div
          className="d-flex justify-content-between mb-4"
          style={{ height: "25.19px" }}
        >
          <h4
            className="mb-0"
            style={{
              fontSize: "21px",
              color: theme ? "#eff2f7" : "#000000",
            }}
          >
            {isSelected}
          </h4>
          <button
            onClick={() => setIsGroupModal(!isGroupModal)}
            style={{
              textDecoration: "none",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <i
              className="ri-group-line"
              style={{
                color: theme ? "#abb4d2" : "#7a7f9a",
                fontSize: "18px",
                marginRight: "16px",
              }}
            ></i>
          </button>
        </div>
        <div className="d-flex">
          <span
            className={theme ? "phColorDark" : "phColorLight"}
            style={{
              padding: "8px 4px 8px 16px",
              fontSize: "18px",
              borderTopLeftRadius: "3px",
              borderBottomLeftRadius: "3px",
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
            }}
          >
            <i className="ri-search-line"></i>
          </span>
          <input
            type="search"
            name="chat-search"
            id={theme ? "gsearchPhDark" : "gsearchPhLight"}
            placeholder="Search groups..."
            color={theme ? "white" : "black"}
            className={
              "form-control " + (theme ? "phColorDark" : "phColorLight")
            }
            style={{
              border: "none",
              borderTopRightRadius: "3px",
              borderBottomRightRadius: "3px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: theme ? "#36404a" : "#e6ebf5",

              height: "45px",
              padding: "6px 30px",

              fontWeight: "400",
            }}
          />
        </div>
      </div>
      <div className="p-4">
        {groups.map((group) => {
          return (
            <div
              className="px-4 py-3"
              style={{
                backgroundColor:
                  groupSelected === group.name
                    ? theme
                      ? "#36404a"
                      : "#e6ebf5"
                    : "transparent",
              }}
            >
              <div
                onClick={() => setGroupSelected(group.name)}
                className="d-flex align-items-center"
              >
                <div className="me-3">
                  <div
                    className="rounded-circle mr-3 justify-content-center align-items-center d-flex"
                    style={{
                      width: "35.19px",
                      height: "35.19px",
                      color: "#7269ef",
                      backgroundColor: theme ? "#7269ef26" : "#e3e1fc",
                    }}
                  >
                    {group.name[0].toUpperCase()}
                  </div>
                </div>
                <div>
                  {" "}
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "15px",
                    }}
                  >
                    {"#" + group.name}
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isGroupModal && (
        <div
          className="d-flex justify-content-center align-items-center "
          onClick={() => {
            setNewGroupName("");
            setIsContactsOpen(false);
            setIsGroupModal(!isGroupModal);
          }}
          style={{
            position: "absolute",

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
              height: "",
              backgroundColor: theme ? "#303841" : "#f7f7ff",
            }}
            className="d-flex flex-column"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="d-flex justify-content-between align-items-center p-3"
              style={{
                width: "100%",
                borderBottom: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
              }}
            >
              <h5
                style={{
                  marginBottom: "0",
                  color: theme ? "#eff2f7" : "black",
                }}
              >
                Create New group
              </h5>{" "}
              <div onClick={() => setIsGroupModal(false)}>
                <i
                  className="ri-close-line"
                  style={{ color: theme ? "#eff2f7" : "" }}
                ></i>
              </div>
            </div>
            <div className="p-4">
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
            </div>
            <div
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const groups = [
//   { name: "Group1" },
//   { name: "Group2" },
//   { name: "Group3" },
//   { name: "Group4" },
//   { name: "Group5" },
//   { name: "Group6" },
// ];

export default Groups;
