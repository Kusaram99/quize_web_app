import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="basis-[200px] bg-gray-800 text-white w-64 min-h-screen">
      {/* Header Section */}
      <h2 className="font-bold p-4 text-2xl cursor-pointer">Quizmaker</h2>
      <hr className="" />
      <div className="flex flex-col gap-10 justify-between p-4">
        <nav className="flex flex-col gap-3 mt-8">
          <Link
            to="/home/dashboard"
            className="flex gap-4 items-center cursor-pointer"
          >
            <IoMdHome />
            DASHBOARD
          </Link>
          <Link
            to="/home/create-quiz"
            className="flex gap-4 items-center cursor-pointer"
          >
            <FaPlus />
            AI QUIZ
          </Link>
          <Link
            to="/home/create-quiz"
            className="flex gap-4 items-center cursor-pointer"
          >
            <FaPlus />
            NEW QUIZ
          </Link>
        </nav>

        {/* Other options */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center cursor-pointer">
            <TbCircleNumber1 className="text-2xl" />
            ADITOR
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <TbCircleNumber2 className="text-2xl" />
            SHARE
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <TbCircleNumber3 className="text-2xl" />
            RESULTS
          </div>
        </div>

        {/* Account Section */}
        <div className="flex gap-4 items-center cursor-pointer">
          <MdAccountCircle className="text-2xl" />
          <Link to="updateacccount">
            <h1>ACCOUNT</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
