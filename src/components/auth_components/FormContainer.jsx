import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import LogIn from "./LogIn";
import "../loader.css";
import axios from "axios"; 
import { useQuizApiContext } from "../useContexAPI/ContextAPI";

const signupInputs = [
  { label: "User Name", type: "text", id: "username" },
  { label: "Email", type: "email", id: "email" },
  { label: "Password", type: "password", id: "password" },
  { label: "Re-Enter Password", type: "password", id: "repassword" },
];

const loginInputs = [
  { label: "User Name", type: "text", id: "username" },
  { label: "Password", type: "password", id: "password" },
];

const FormContainer = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginData, setloginData] = useState({});
  const [signupnData, setSignupnData] = useState({});
  const [loginFields] = useState(loginInputs);
  const [signupFields] = useState(signupInputs);
  const navigator = useNavigate(); 
  const {auth,setAuth} = useQuizApiContext()
  const [loadeHandler, setLoaderHandler] = useState({
    login: false,
    signup: false,
  });

  // onchange handler to login
  const handleChangeToLogin = (e, id) => {
    setloginData((prev) => ({ ...prev, [id]: e.target.value }));
  };

  // onchange handler to signup page
  const handleChangeToSignup = (e, id) => {
    setSignupnData((prev) => ({ ...prev, [id]: e.target.value }));
  };

  // handle signUp data
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    // // console.log("SignUp Data Submitted:", signupnData);
    // if any data is empty
    if (
      !signupnData.email ||
      !signupnData.username ||
      !signupnData.password ||
      !signupnData.repassword
    ) {
      alert("All field are required");
    } else if (signupnData.password !== signupnData.repassword) {
      alert("Please re-check your password!");
    } else {
      setLoaderHandler((prev) => ({ ...prev, signUp: true }));
      // delete repassword propertie
      delete signupnData.repassword;
      // sending data to requestHanlder function to send request to server
      requestHandler(
        import.meta.env.VITE_USER_SIGNUP_URL,
        signupnData,
        "signup"
      );
      // setAuth()
      setSignupnData({});
    }
  };

  // handle login data
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    // // console.log("Login Data Submitted:", loginData);
    // if input boxes data are empty
    if (!loginData.username || !loginData.password) {
      alert("Please fill all input box!");
    } else {
      setLoaderHandler((prev) => ({ ...prev, login: true }));
      // sending data to requestHanlder function to send request to server
      requestHandler(import.meta.env.VITE_USER_LOGIN_URL, loginData, "login");
      // setloginData({});
    }
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  // api request handler as submit of logIn and signUp data
  const requestHandler = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      // check response
      // console.log("Successfully authenticated!: ", response); 
      localStorage.setItem("auth", JSON.stringify({id: response.data.data.user._id }))
      setAuth({id: response.data.data.user._id })
      navigator("/home/dashboard");
    } catch (err) {
      setLoaderHandler((prev) => ({ ...prev, signUp: false }));
      setLoaderHandler((prev) => ({ ...prev, login: false }));
      console.error(
        "postRequestHandler Error: ",
        err.response?.data || err.message
      );
      alert("Please fill currect data") 
      throw err; // Re-throw the error for further handling if needed
    }
  };

  // check user is login or not
  useEffect(()=>{ 
    if(auth){  
      navigator('/home')
    }
  },[])

  return (
    <>
      <div className="bg-blue-500 h-screen w-screen py-20 px-3 flex items-center fixed top-0 left-0 z-20">
        {isSignup ? (
          <Signup
            inputs={signupFields}
            handleSubmit={handleSubmitSignup}
            handleChange={handleChangeToSignup}
            toggleForm={toggleForm}
            loadeHandler={loadeHandler}
          />
        ) : (
          <LogIn
            inputs={loginFields}
            handleSubmit={handleSubmitLogin}
            handleChange={handleChangeToLogin}
            toggleForm={toggleForm}
            loadeHandler={loadeHandler}
          />
        )}
      </div>
    </>
  );
};

export default FormContainer;
