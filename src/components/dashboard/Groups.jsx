import React from "react";

const Groups = ({ isSelected, theme, groupSelected, setGroupSelected }) => {
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
    </div>
  );
};

const groups = [
  { name: "Group1" },
  { name: "Group2" },
  { name: "Group3" },
  { name: "Group4" },
  { name: "Group5" },
  { name: "Group6" },
];

export default Groups;
