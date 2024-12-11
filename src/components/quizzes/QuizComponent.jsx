import React from "react";
import QuizCreator from "./QuizCreator";

const QuizComponent = () => {
  return (
    <div>
      <div className="px-5 py-3 bg-slate-100">
        <h1 className="text-lg font-semibold">Editor </h1>
      </div>
      <QuizCreator/>
    </div>
  );
};

export default QuizComponent;
