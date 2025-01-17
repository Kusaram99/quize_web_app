import React from "react";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";
import { handleQuizUpdateRequest } from "./quizRequestHandler";
import { useNavigate } from "react-router-dom";

const UpdateBtn = ({ quizId }) => {
  const { subjectCategories, auth, collectQuizInfo } = useQuizApiContext();
  const navigate = useNavigate();

  // update quiz handler
  const updateQuiz = async () => { 
    // check category data empty or not
    if (subjectCategories.length === 0) {
      return alert("Please select a category and Add Questions to the Quiz");
    }
    const data = {
      subjectCategories,
      userId: auth.id,
      collectQuizInfo,
      quizId: quizId._id,
    };
    const response = await handleQuizUpdateRequest(data);
    alert(response);
    navigate("/home/dashboard");
  };

  return (
    <div className="flex gap-4 mt-4 justify-end">
      {/* ============================== Pending ======================= */}
      {/* <button
        className="bg-gradient-to-bl from-sky-500 to-blue-400 px-6 py-3 text-white font-bold"
        onClick={() => alert("Previewing Quiz")}
      >
        Preview
      </button> */}
      <button
        className="bg-gradient-to-bl from-blue-500 to-sky-400 px-6 py-3 text-white font-bold"
        onClick={updateQuiz}
      >
        Update Quiz
      </button>
    </div>
  );
};

export default UpdateBtn;
