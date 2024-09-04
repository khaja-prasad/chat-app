import React from "react";

const Message = ({ content, left, sentAt, user, theme, chatUser }) => {
  const sentDate = new Date(sentAt);

  return (
    <div
      className="mb-4 w-100 d-flex"
      style={{ justifyContent: left ? "flex-start" : "flex-end" }}
    >
      <div
        className="d-flex"
        style={{ flexDirection: left ? "row" : "row-reverse" }}
      >
        <div className="d-flex">
          <div className="d-flex flex-column justify-content-end">
            <img
              className="rounded-circle"
              src={left ? chatUser.profile_photo_url : user.profile_photo_url}
              alt=""
              style={{ width: "35.19px", height: "35.19px" }}
            />
          </div>
        </div>
        <div className="d-flex flex-column px-3">
          <div
            className="px-3 py-2   d-flex flex-column"
            style={{
              backgroundColor: left
                ? "#7269ef"
                : theme
                ? "rgb(54 64 74)"
                : "#f5f7fb",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                color: left ? "#ffffff" : theme ? "#eff2f7" : "#343a40",
                fontSize: "17px",
                fontWeight: "500",
              }}
            >
              <div>{content}</div>
            </div>
            <div
              className="w-100 d-flex justify-content-end"
              style={{
                fontSize: "13px",
                paddingTop: "5px",
                color: left ? "#ffffff80" : theme ? "#abb4d2" : "#7a7f9a",
              }}
            >
              {sentDate.getHours() + ":" + sentDate.getMinutes()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "13px" }}>
              {left ? chatUser.name : user.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
