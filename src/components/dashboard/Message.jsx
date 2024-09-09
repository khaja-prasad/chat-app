import React from "react";

const Message = ({ message, left, user, theme, chatUser }) => {
  const sentDate = new Date(message.createdAt);

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
            {message.image ? (
              <div className="image rounded d-flex flex-column" style={{}}>
                <p
                  style={{
                    marginLeft: "auto",
                    marginBottom: "0",
                    color: left ? "#ffffff" : theme ? "#eff2f7" : "#343a40",
                  }}
                >
                  Image
                </p>
                <img
                  src={`http://localhost:3030/${message.image.filename}`}
                  style={{
                    maxHeight: "150px",
                    maxWidth: "200px",
                    backgroundColor: "lightblue",
                  }}
                  alt={message.image.originalname}
                />
                <a
                  href={
                    "http://localhost:3030/download/" +
                    message.image.filename +
                    "/" +
                    message.image.originalname
                  }
                  style={{
                    textDecoration: "none",
                    color: left ? "#ffffff" : theme ? "#eff2f7" : "#343a40",
                  }}
                  download
                >
                  Download
                </a>
              </div>
            ) : message.file ? (
              <div className="file">
                <div className="d-flex">
                  <p
                    style={{
                      marginLeft: left ? "" : "auto",
                      marginRight: left ? "auto" : "",
                      marginBottom: "0",
                      color: left ? "#ffffff" : theme ? "#eff2f7" : "#343a40",
                    }}
                  >
                    File
                  </p>
                </div>
                <div
                  className="p-2 d-flex"
                  style={{
                    // marginBottom: "8px",
                    width: "320px",
                    border:
                      "1px solid" +
                      (left ? "#a2a7af" : theme ? "#47518b" : "#e0dee4"),
                  }}
                >
                  <div
                    className="align-items-center d-flex justify-content-center rounded"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: left
                        ? "rgb(0 12 105)"
                        : theme
                        ? "rgb(114 105 239 / 15%)"
                        : "#e3e1fc",
                      fontSize: "20px",
                      marginRight: "16px",
                    }}
                  >
                    <i
                      className="ri-file-text-fill"
                      style={{ color: "#7269EF" }}
                    ></i>
                  </div>
                  <div style={{ width: "50%" }}>
                    <h5
                      style={{
                        fontSize: "14px",
                        marginBottom: "4px",
                        color: left ? "#ffffff" : theme ? "#eff2f7" : "#343a40",
                        fontWeight: "500",
                      }}
                    >
                      {message.file.originalname}
                    </h5>
                    <p
                      style={{
                        fontSize: "13px",
                        marginBottom: "0",
                        color: left
                          ? "#ffffff80"
                          : theme
                          ? "#abb4d2"
                          : "#7a7f9a",
                      }}
                    >
                      {message.file.size}
                    </p>
                  </div>
                  <div className="ms-4" style={{ width: "60px" }}>
                    <ul
                      className=" list-inline d-flex align-items-center justify-content-between mb-0 mt-2 "
                      style={{ fontSize: "18px" }}
                    >
                      <li className="list-inline-item mr-2">
                        <a
                          href={
                            "http://localhost:3030/download/" +
                            message.file.filename +
                            "/" +
                            message.file.originalname
                          }
                          download
                          style={{ textDecoration: "none" }}
                        >
                          <i
                            className="ri-download-2-line"
                            style={{
                              color: left
                                ? "#fff"
                                : theme
                                ? "#abb4d2"
                                : "#7a7f9a",
                            }}
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              message.content && (
                <div
                  style={{
                    color: left ? "#ffffff" : theme ? "#eff2f7" : "#343a40",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}
                >
                  <div>{message.content}</div>
                </div>
              )
            )}
            <div
              className="w-100 d-flex justify-content-end"
              style={{
                fontSize: "13px",
                paddingTop: "5px",
                color: left ? "#ffffff80" : theme ? "#abb4d2" : "#7a7f9a",
              }}
            >
              <p
                style={{
                  marginBottom: "0",
                  marginleft: left ? "auto" : "",
                  marginRight: left ? "" : "auto",
                }}
              >
                <i className="ri-time-line" style={{}}></i>
                {sentDate.getHours() + ":" + sentDate.getMinutes()}
              </p>
            </div>
          </div>
          <div>
            <div
              className="d-flex"
              style={{
                fontSize: "13px",
              }}
            >
              <p
                style={{
                  marginBottom: "0",
                  marginLeft: left ? "" : "auto",
                  marginRight: left ? "auto" : "",
                  fontWeight: "500",
                  color: theme ? "#a6b0cf" : "#495057",
                }}
              >
                {left ? chatUser.name : user.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
