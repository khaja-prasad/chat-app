import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

const SignUp = ({ login, user }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/dashboard");
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    //Check empty inputs and toasting
    if (!email && !password && !name) {
      toast.error("Email , Password and Name should not be empty!", {
        position: "top-right",
      });
    } else {
      //try signUp
      const body = { email: email, password: password, name: name };
      try {
        axios
          .post("http://localhost:3030/signup", body)
          .then((res) => {
            toast.success(
              "SignUp Successfull! Login with the registered details to enjoy Chatting!!",
              {
                positon: "top-right",
                autoClose: 5000,
              }
            );
            login();
          })
          .catch((res) => {
            if (res.status === "404" || "401")
              toast.error(res.response?.data?.message);
            else
              toast.error(
                "Sorry, Server is in Maintenance!! We will look into it ASAP."
              );
          });
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="container justify-content-center">
      <div className="row   d-flex justify-content-center">
        <div
          className="col-lg-5 col-xl-4 col-md-7 col-sm-9 d-flex flex-column justify-content-center"
          style={{ padding: "0" }}
        >
          <div className="header-inner text-center ">
            <div
              style={{ marginBottom: "3rem" }}
              className="d-flex align-items-center justify-content-center"
            >
              <i
                className="ri-chat-voice-fill"
                style={{
                  color: "#7269ef",
                  fontSize: "1.55rem",
                  marginRight: "0rem",
                }}
              ></i>
              <h4 className="m-1"> Chatvia</h4>
            </div>
            <div>
              <h4 className="m-1">Register </h4>
              <p style={{ color: "lightslategrey", marginBottom: "4rem" }}>
                Get your Chatvia account now.
              </p>
            </div>
          </div>

          <div
            className=" d-flex flex-column "
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem 1rem",
              marginTop: "-2.5rem",
              borderRadius: "7px",
            }}
          >
            <form className=" " onSubmit={handleSignUp}>
              <Input
                {...{
                  type: "email",
                  placeholder: "Enter Email...",
                  name: "email",
                  value: email,
                  label: "Email",
                  icon: <i className="ri-mail-line"></i>,
                }}
                onChange={(e) => setEmail(e)}
              />
              <Input
                {...{
                  type: "text",
                  name: "username",
                  value: name,
                  placeholder: "Enter Username...",
                  label: "Username",
                  icon: <i className="ri-user-2-line"></i>,
                }}
                onChange={(e) => setName(e)}
              />
              <Input
                {...{
                  type: "password",
                  name: "password",
                  value: password,
                  placeholder: "Enter Password...",
                  label: "Password",
                  icon: <i className="ri-lock-password-line"></i>,
                }}
                onChange={(e) => setPassword(e)}
              />

              <input
                type="submit"
                value={"Register"}
                className="form-control "
                style={{
                  backgroundColor: "#7269ef",
                  color: "white",
                  fontWeight: "400",
                  marginTop: "2rem",
                }}
              />
            </form>
            <div className="d-flex justify-content-center mt-4 text-center">
              <p style={{ marginBottom: "0", color: "grey" }}>
                By registering you agree to the Chatvia
                <button
                  onClick={() => {}}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#7269ef",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Terms of Use.
                </button>
              </p>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between text-center mt-5">
            <p>
              Already have an account ?{" "}
              <button
                onClick={() => login()}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#7269ef",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                Sign In now
              </button>
            </p>
            <p>
              © 2024 Chatvia. Crafted with{" "}
              <i className="ri-heart-fill" style={{ color: "red" }}></i> by
              Khaja
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
