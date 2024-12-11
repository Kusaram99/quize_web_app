import React, { useState } from "react";
import Signup from "./Signup";
import LogIn from "./LogIn";

const signupInputs = [
  { label: "User Name", type: "text", id: "name" },
  { label: "Email", type: "email", id: "email" },
  { label: "Password", type: "password", id: "password" },
  { label: "Re-Enter Password", type: "password", id: "repassword" },
];

const loginInputs = [
  { label: "User Name", type: "text", id: "name" },
  { label: "Password", type: "password", id: "password" },
];

const FormContainer = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginData, setloginData] = useState({});
  const [signupnData, setSignupnData] = useState({});
  const [loginFields] = useState(loginInputs);
  const [signupFields] = useState(signupInputs);

  // onchange handler to login
  const handleChangeToLogin = (e, id) => {
    setloginData((prev) => ({ ...prev, [id]: e.target.value }));
  };

  // onchange handler to signup page
  const handleChangeToSignup = (e, id) => {
    setSignupnData((prev) => ({ ...prev, [id]: e.target.value }));
  };

  // handle signUp data
  const handleSubmitSignup = (e) => {
    e.preventDefault();
    console.log("SignUp Data Submitted:", signupnData);
    setSignupnData({});
  };

  // handle login data
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", loginData);
    setloginData({});
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <>
      <div className="my-10">
        {isSignup ? (
          <Signup
            inputs={signupFields}
            handleSubmit={handleSubmitSignup}
            handleChange={handleChangeToSignup}
            toggleForm={toggleForm}
          />
        ) : (
          <LogIn
            inputs={loginFields}
            handleSubmit={handleSubmitLogin}
            handleChange={handleChangeToLogin}
            toggleForm={toggleForm}
          />
        )}
      </div>
    </>
  );
};

export default FormContainer;
