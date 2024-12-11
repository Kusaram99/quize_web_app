import React from "react";

const PreviewSaveBtn = () => {
  return (
    <div className="flex gap-4 mt-4 justify-end">
      <button className="bg-gradient-to-bl from-sky-500 to-blue-400 px-6 py-3 text-white font-bold">
        Preview
      </button>
      <button className="bg-gradient-to-bl from-blue-500 to-sky-400 px-6 py-3 text-white font-bold">
        Save Quiz
      </button>
    </div>
  );
};

export default PreviewSaveBtn;
