import React from "react";

const QuizTopButton = () => {
  return (
    <div className="flex">
      <span className="flex justify-center px-1 py-3 w-40 border border-r-[1px] border-r-gray-500 cursor-pointer">
        QUIZ
      </span>
      <span className="flex justify-center px-1 py-3 w-40 border border-r-[1px] border-r-gray-500 cursor-pointer">
        THEMES
      </span>
    </div>
  );
};

export default QuizTopButton;
