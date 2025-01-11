import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const DashboardTable = () => {
  const quizzes = [
    // { title: "rwrrerwe", status: "Active", responses: 0, modified: "Dec 02, 2024" },
    {
      title: "No Title: Nov 28, 2024 No Title: Nov 28, 2024",
      status: "Active",
      responses: 0,
      modified: "Dec 02, 2024",
    },
    {
      title: "No Title: Nov 28, 2024",
      status: "Active",
      responses: 2,
      modified: "Nov 28, 2024",
    },
  ];

  function truncateString(str, maxLength = 20) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  }

  return (
    <div className="grid grid-cols-5 gap-10 gap-x-4 p-4 border border-gray-200">
      {/* Header */}
      <div className="bg-gray-100 font-bold p-4 border-b">Title</div>
      <div className="bg-gray-100 font-bold p-4 border-b">Status</div>
      <div className="bg-gray-100 font-bold p-4 border-b">Responses</div>
      <div className="bg-gray-100 font-bold p-4 border-b">Modified</div>
      <div className="bg-gray-100 font-bold p-4 border-b">More</div>

      {/* Rows */}
      {quizzes.map((quiz, index) => (
        <React.Fragment key={index}>
          <div className="p-4 border-b" title={quiz.title}>
            {truncateString(quiz.title)}
          </div>
          <div className="border-b flex">
            <div className="inline p-4 text-green-500 font-bold cursor-pointer">
              {quiz.status}
            </div>
            {/* <button className="inline p-4 text-red-500 font-bold cursor-pointer">
              Diactive
            </button>  */}
          </div>
          <div className="p-4 border-b">{quiz.responses}</div>
          <div className="p-4 border-b">{quiz.modified}</div>
          <div className="p-4 border-b relative group">
            <button className="font-bold text-x2l">...</button>
            <div className="p-5 absolute top-[50%] left-0 gap-3 hidden group-hover:flex bg-white border shadow">
              <MdDelete className="text-2xl text-red-500 cursor-pointer" />
              <FaEdit className="text-2xl text-green-500 cursor-pointer" />
              <FaRegStopCircle className="text-2xl text-red-600 cursor-pointer" />
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DashboardTable;
