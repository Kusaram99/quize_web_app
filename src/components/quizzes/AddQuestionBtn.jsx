import React from "react";

const AddQuestionBtn = ({ addQuestion, subCategory, index }) => {
  // console.log("Quiz add button")
  return (
    <div className="flex gap-3 flex-wrap w-[100%]">
      <button
        className="font-bold p-4 bg-gradient-to-bl from-sky-400 to-green-950 text-white cursor-pointer"
        onClick={() => addQuestion("multiple-choice", subCategory, index)}
      >
        Multiple Choice Question
      </button>

      {/* ======================= pending ========================= */}
      {/* <button
        className="font-bold p-4 bg-gradient-to-bl from-green-500 to-green-400 text-white cursor-pointer"
        onClick={() => addQuestion("checkbox")}
      >
        Checkbox Question
      </button> */}
    </div>
  );
};

export default AddQuestionBtn;
