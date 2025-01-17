import React from "react";

const ButtonsComponent = ({
  next,
  previous,
  currentQuestionIndex,
  submitHandler,
}) => {
  return (
    <div className="flex justify-center gap-7 mt-6">
      <button
        onClick={() => previous(currentQuestionIndex)}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
      >
        Previous
      </button>
      <button
        onClick={() => next(currentQuestionIndex)}
        className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition"
      >
        Next
      </button>
      <button
        onClick={submitHandler}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default ButtonsComponent;
