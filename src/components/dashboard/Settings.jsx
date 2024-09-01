import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = ({ isSelected, theme, user }) => {
  return (
    <div>
      <div className="d-flex justify-content-between px-4 pt-4">
        <h4
          className="mb-0"
          style={{ fontSize: "21px", color: theme ? "#eff2f7" : "#000000" }}
        >
          {isSelected}
        </h4>
        <a href="/dashboard" style={{ textDecoration: "none" }}>
          <i
            className="ri-more-2-fill"
            style={{ color: theme ? "#abb4d2" : "#7a7f9a", fontSize: "18px" }}
          ></i>
        </a>
      </div>
      <div
        className="p-4 text-center"
        style={{
          borderBottom: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
        }}
      >
        <div className="mb-4">
          <img
            className="rounded-circle"
            src={user.profile_photo_url}
            alt="profile"
            style={{
              width: "96px",
              height: "96px",
              padding: "4px",
              marginTop: "-2px",
            }}
          />
        </div>
        <h5
          style={{ fontSize: "16px", color: theme ? "#eff2f7" : "#000000" }}
          className="mb-1"
        >
          {user.name}
        </h5>
        <p className="mb-1" style={{ color: "#7a7f9a", fontSize: "15px" }}>
          Active
        </p>
      </div>
      <div className="p-4">
        <div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                style={{
                  backgroundColor: theme ? "#a6b0cf08" : "#49505708",
                  color: theme ? "#eff2f7" : "#000000",
                }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-user-2-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  Personal Info
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
              >
                <div>
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Name
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    {user.name}
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Email
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    {user.email}
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Time
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    11:40 AM
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Location
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    Hyderabad, IND
                  </h5>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header
                style={{ backgroundColor: theme ? "#a6b0cf08" : "#49505708" }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-attachment-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  Privacy
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
              >
                <div>
                  <div className="py-3 d-flex justify-content-between align-items-center">
                    <h5
                      style={{
                        color: theme ? "#eff2f7" : "#000000",
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      Profile photo
                    </h5>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          backgroundColor: theme ? "#36404a" : "#e6ebf5",
                          color: theme ? "#eff2f7" : "#212529",
                          padding: "4px 8px",
                          fontSize: "14px",
                          border: "none",
                        }}
                      >
                        Everyone
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" active>
                          Everyone
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Selected
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Nobody</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="py-3 d-flex justify-content-between align-items-center">
                    <h5
                      style={{
                        color: theme ? "#eff2f7" : "#000000",
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      Last seen
                    </h5>
                    <Form>
                      <Form.Check type="switch" id="custom-switch" />
                    </Form>
                  </div>
                  <div className="py-3 d-flex justify-content-between align-items-center">
                    <h5
                      style={{
                        color: theme ? "#eff2f7" : "#000000",
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      Status
                    </h5>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          backgroundColor: theme ? "#36404a" : "#e6ebf5",
                          color: theme ? "#eff2f7" : "#212529",
                          padding: "4px 8px",
                          fontSize: "14px",
                          border: "none",
                        }}
                      >
                        Everyone
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" active>
                          Everyone
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Selected
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Nobody</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="py-3 d-flex justify-content-between align-items-center">
                    <h5
                      style={{
                        color: theme ? "#eff2f7" : "#000000",
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      Read receipts
                    </h5>
                    <Form>
                      <Form.Check type="switch" id="custom-switch" />
                    </Form>
                  </div>
                  <div className="py-3 d-flex justify-content-between align-items-center">
                    <h5
                      style={{
                        color: theme ? "#eff2f7" : "#000000",
                        fontSize: "14px",
                        fontWeight: "500",
                        margin: "0",
                      }}
                    >
                      Groups
                    </h5>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          backgroundColor: theme ? "#36404a" : "#e6ebf5",
                          color: theme ? "#eff2f7" : "#212529",
                          padding: "4px 8px",
                          fontSize: "14px",
                          border: "none",
                        }}
                      >
                        Everyone
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" active>
                          Everyone
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Selected
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Nobody</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header
                style={{ backgroundColor: theme ? "#a6b0cf08" : "#49505708" }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-attachment-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  Security
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
              >
                <div className="">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5
                      style={{
                        fontSize: "13px",
                        color: theme ? "#eff2f7" : "#343a40",
                        marginBottom: "0",
                      }}
                    >
                      Show security notification
                    </h5>
                    <Form>
                      <Form.Switch
                        style={{}}
                        className={
                          theme
                            ? "switchDark switchDark"
                            : "switchLight switchLight"
                        }
                      />
                    </Form>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header
                style={{ backgroundColor: theme ? "#a6b0cf08" : "#49505708" }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-attachment-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  Help
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{
                  backgroundColor: theme ? "#262e35" : "#fff",
                  padding: "20px",
                }}
              >
                <div
                  className=""
                  style={{
                    color: theme ? "#a6b0cf" : "#495057",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  <div className="py-2 ">
                    <p className="m-0">FAQs</p>
                  </div>
                  <div
                    className="py-2 "
                    style={{
                      borderTop: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
                    }}
                  >
                    <p className="m-0">Contact</p>
                  </div>
                  <div
                    className="py-2 "
                    style={{
                      borderTop: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
                    }}
                  >
                    <p className="m-0">Terms & Privacy</p>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Settings;
