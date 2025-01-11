import React from "react"; 
import { useNavigate } from "react-router-dom";
import FormContainer from "../auth_components/FormContainer";

const PublicRouter = ({ children }) => { 
  const auth = JSON.parse(localStorage.getItem("auth")) 
  console.log("auth: ", auth)
  const navigator = useNavigate()

  return auth ? navigator("/") : <FormContainer/>;
};

export default PublicRouter;
