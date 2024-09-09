import React from "react";

const Contacts = ({ isSelected, theme, users }) => {
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
              className="ri-user-add-line"
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
            placeholder="Search contacts..."
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
      <div className="p-4" style={{ overflowY: "auto", height: "85vh" }}>
        <div style={{ overflowY: "auto" }}>
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
                          <h5
                            className="align-items-center"
                            style={{
                              fontSize: "15px",
                              color: theme ? "#eff2f7" : "#343a40",
                            }}
                          >
                            {contact}
                          </h5>
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
    </div>
  );
};

// const contacts = {
//   a: ["Alex Smith", "Annie Besant"],
//   b: ["Blakely Smith", "Brandon Wells"],
//   c: ["Craig Smiley"],
//   d: ["Daniel Clay", "Doris Brown"],
//   i: ["Iris Wells"],
//   j: ["Juan Flakes", "Jhon Hills", "Joy Southern"],
// };

export default Contacts;
