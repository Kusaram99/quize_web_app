import React from "react";

const PreviewSaveBtn = ({ saveQuiz }) => {
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
        onClick={saveQuiz}
      >
        Save Quiz
      </button>
    </div>
  );
};

export default PreviewSaveBtn;
