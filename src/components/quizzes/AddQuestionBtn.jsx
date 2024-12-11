import React from "react";
import { FaPlus } from "react-icons/fa";

const AddQuestionBtn = () => {
  return (
    <div className="flex items-center justify-center gap-2 font-bold p-4 bg-gradient-to-bl from-sky-500 to-blue-400 text-white cursor-pointer">
      <FaPlus />
      <button>ADD QUESTION</button>
    </div>
  );
};

export default AddQuestionBtn;
