import React from "react"; 
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";

const Logo = () => {
  const {setAuth, auth} = useQuizApiContext()
  const navigator = useNavigate()

  // log out handler
  const logOutHandler=()=>{
    localStorage.removeItem('auth')
    setAuth(null)
    navigator("/home/authentication")
  }

  return (
    <div className="flex justify-between items-center space-x-2 p-8">
      <Link to="/home">
        <span className="text-4xl font-bold text-sky-500">Q</span>
        <span className="text-4xl font-bold text-gray-800">uiz</span>
        <span className="text-4xl font-bold text-sky-500">Maker</span>
      </Link>
      {/* <Link to="/home/authentication">LogIn/SignUp</Link> */}
      <div className="flex gap-5">
        {!auth ? (
          <Link
            to="/home/authentication"
            className="font-semibold cursor-pointer text-black"
          >
            LogIn/SignUp
          </Link>
        ) : (
          <button
            className="font-semibold cursor-pointer text-black"
            onClick={logOutHandler}
          >
            Log Out
          </button>
        )}
        <FaUserLarge className="cursor-pointer text-2xl" />
      </div>
    </div>
  );
};

export default Logo;
