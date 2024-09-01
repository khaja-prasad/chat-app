import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import Forgot from "./components/Forgot";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState();

  const openSignUpPage = () => {
    setIsLogin(false);
    setIsSignUp(true);
  };

  const openLoginPage = () => {
    setIsLogin(true);
    setIsSignUp(false);
  };

  const forgot = () => {
    setIsLogin(false);
    setIsSignUp(false);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div
                className="App d-flex justify-content-center align-items-center "
                style={{
                  backgroundColor: "#f7f7ff",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                {isLogin ? (
                  <Login
                    signUp={openSignUpPage}
                    forgot={forgot}
                    user={user}
                    setUser={(user) => setUser(user)}
                  />
                ) : isSignUp ? (
                  <SignUp login={openLoginPage} />
                ) : (
                  <Forgot login={openLoginPage} user={user} />
                )}
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard user={user} setUser={(e) => setUser(e)} />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
