import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";
import FormContainer from "../auth_components/FormContainer";

const PrivateRouter = () => {
  // const { authData } = useQuizApiContext();
  auth = JSON.parse(localStorage.getItem('auth')) || null
  console.log("authDAta: ", auth)
  const navigator = useNavigate();
  return auth ? navigator("/dashboard") : <FormContainer />;
};

export default PrivateRouter;
