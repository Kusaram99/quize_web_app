import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";

const Header = () => {
  const {setAuth, auth} = useQuizApiContext()
  const navigator = useNavigate()


  // log out handler
  const logOutHandler=()=>{
    localStorage.removeItem('auth')
    setAuth(null)
    navigator("/home/authentication")
  }

  return (
    <header className="h-[64px] flex justify-between items-center px-10 py-4 bg-gradient-to-bl from-sky-500 to-blue-400">
      <h1 className="text-lg"></h1>
      <div className="flex gap-5">
        {!auth ? (
          <Link
            to="/home/authentication"
            className="font-semibold cursor-pointer text-white"
          >
            LogIn/SignUp
          </Link>
        ):
        (
          <button className="font-semibold cursor-pointer text-white"
          onClick={logOutHandler}>Log Out</button>
        )}
        <FaUserLarge className="cursor-pointer text-2xl" />
      </div>
    </header>
  );
};

export default Header;
