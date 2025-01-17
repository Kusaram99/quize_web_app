import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaShareAltSquare } from "react-icons/fa";
import { LuArrowDownToDot } from "react-icons/lu";
// import { getQuizzesHandler } from "./dashboardRequestHandler";
import {
  toggleLinkSharing,
  getAdminQuizzes,
  deleteQuiz,
} from "./dashboardRequestHandler";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const DashboardTable = () => {
  const [adminData, setAdminData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigator = useNavigate();

  // make long title in short
  function truncateString(str, maxLength = 20) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  }

  // data handler
  const dateHandler = (dateValue) => {
    let date = new Date(dateValue);
    return date.toLocaleDateString();
  };

  // Edit quiz handler
  const editQuiz = (quizId, data, status) => {
    if (status) {
      alert("You can't edit an active quiz");
      return;
    }
    navigator(`/home/edit-quiz/${quizId}`, { state: data });
  };

  // share link handler
  const shareLInkHandler = (status, link) => {
    // check if quiz is deactivated
    if (!status) {
      alert("You can't share a deactivated quiz");
      return;
    }
    // navigate to share link page
    navigator(`/home/share-link`, {
      state: { link: link },
    });
  };

  // navigate handle to the result page
  const navigateHandlerToresultPage = (id) => {
    navigator(`/home/pdf-generator/${id}`);
  };

  // Function to get all quizzes data created by admin
  useEffect(() => {
    const fetchQuizzes = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      // Check if user is not logged in
      if (!auth) return;
      try {
        const result = await getAdminQuizzes(
          `${import.meta.env.VITE_GET_ADMIN_QUIZZES_URL}/${auth.id}`,
          setAdminData
        );
        // update admin data
        // setAdminData(result.data.data);
        // // console.log("Result: ", result);
      } catch (error) {
        console.error("Error fetching quizzes: ", error);
      }
    };

    fetchQuizzes(); // Call the async function
  }, []);

  return (
    <div className="relative h-[calc(100%-65px)] p-4">
      <div className="grid grid-cols-5 gap-10 gap-x-4 p-4 border border-gray-200">
        {/* Header */}
        <div className="bg-gray-100 font-bold p-4 border-b">Title</div>
        <div className="bg-gray-100 font-bold p-4 border-b">Status</div>
        <div className="bg-gray-100 font-bold p-4 border-b">Responses</div>
        <div className="bg-gray-100 font-bold p-4 border-b">Modified</div>
        <div className="bg-gray-100 font-bold p-4 border-b">More</div>

        {/* Rows */}
        {adminData.map((quiz, index) => (
          <React.Fragment key={index}>
            <div className="p-4 border-b" title={quiz.title}>
              {truncateString(quiz.quizInfo.title)}
            </div>
            <div className="border-b flex">
              {/* <div className="inline p-4 font-bold cursor-pointer"> */}
              {/* {quiz.status ? "Active" : "Stop"} */}
              {quiz.status ? (
                <span className="text-green-500 p-4 font-bold">Active</span>
              ) : (
                <span className="text-red-600 p-4 font-bold">Deactivated</span>
              )}
            </div>
            {/* <button className="inline p-4 text-red-500 font-bold cursor-pointer">
              Diactive
            </button>  */}
            {/* </div> */}
            <div className="p-4 border-b">{quiz.response}</div>
            <div className="p-4 border-b">{dateHandler(quiz.createdAt)}</div>
            <div className="p-4 border-b relative group">
              <button className="font-bold text-x2l">...</button>
              <div className="p-5 absolute top-[50%] left-[-100px] gap-3 hidden group-hover:flex bg-white border shadow">
               {/* ================== Delete button ================ */}
                <MdDelete
                  title="Delete Quiz"
                  onClick={() =>
                    deleteQuiz(quiz._id, setAdminData, setIsloading)
                  }
                  className="text-2xl text-red-500 cursor-pointer"
                />

                {/* ================ Edit Button =============== */}
                {quiz.response === 0 && (
                  <FaEdit
                    title="Edit Quiz"
                    onClick={() => editQuiz(quiz._id, quiz, quiz.status)}
                    className="text-2xl text-green-500 cursor-pointer"
                  />
                )}

                {/* ================= Start and Pause buttons ============== */}
                <React.Fragment>
                  {!quiz.status ? (
                    <FaPlay
                      title="Start Sharing"
                      className="text-xl text-blue-600 cursor-pointer"
                      onClick={() =>
                        toggleLinkSharing(
                          { _id: quiz._id, userId: quiz.userId, status: true },
                          setAdminData,
                          setIsloading
                        )
                      }
                    />
                  ) : (
                    <FaRegStopCircle
                      title="Stop Sharing"
                      className="text-2xl text-red-600 cursor-pointer"
                      onClick={() =>
                        toggleLinkSharing(
                          { _id: quiz._id, userId: quiz.userId, status: false },
                          setAdminData,
                          setIsloading
                        )
                      }
                    />
                  )}
                </React.Fragment>

                {/* ================== Share button =============== */}
                <FaShareAltSquare
                  title="Share Link"
                  onClick={() => shareLInkHandler(quiz.status, quiz.link)}
                  className="text-2xl text-blue-500 cursor-pointer"
                />
                {/* ================== Download button show only when student response more than 0 ========= */}
                {quiz.response === 0 ? (
                  ""
                ) : (
                  <LuArrowDownToDot
                    title="Result"
                    onClick={() => navigateHandlerToresultPage(quiz._id)}
                    className="text-2xl text-orange-500 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {adminData.length === 0 && (
        <p className="text-center my-5 font-bold">
          You don't have created quizzes!
        </p>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default DashboardTable;
