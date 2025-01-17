import React from "react";

const SolvedNumberingBox = ({ questions, navigateToQuestion }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {questions &&
        questions?.map((item, index) => (
          <span
            onClick={()=>navigateToQuestion(index + 1)}
            key={index}
            className="flex justify-center items-center w-10 h-10 p-4 cursor-pointer bg-red-500 rounded text-white font-semibold"
          >
            {index + 1}
          </span>
        ))}
    </div>
  );
};

export default SolvedNumberingBox;
