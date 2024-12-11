import React from "react";
import QuizTopButton from "./QuizTopButton";
import QuizTitleInfo from "./QuizTitleInfo";
import CheckBoxQuiz from "./CheckBoxQuiz";
import AddQuestionBtn from "./AddQuestionBtn";
import PreviewSaveBtn from "./PreviewSaveBtn";

const QuizCreator = () => {
  return (
    <div className="h-[calc(100vh-120px)] bg-gray-200 py-5 overflow-auto">
      <div className="max-w-[1160px] mx-auto border border-gray-300 bg-gray-50">
        <QuizTopButton />

        <div className="p-3">
          <QuizTitleInfo />

          <CheckBoxQuiz/>
          

         <AddQuestionBtn/>

         <PreviewSaveBtn/>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
