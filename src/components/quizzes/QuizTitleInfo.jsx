import React from "react";

const QuizTitleInfo = () => {
  return (
    <div className="flex flex-col gap-3 border p-5">
      <div>
        <input
          className="p-2 w-[100%] outline-none border-2 border-blue-100  focus:border-blue-400"
          type="text"
          name="quiz_title"
          placeholder="Type your Quiz Title"
        />
      </div>

      <div className="flex flex-col gap-4">
        <input
          className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
          type="number"
          name="total_questions"
          placeholder="Add Total Quizzes No."
          required
        />
        <input
          className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
          type="number"
          name="quiz-title"
          placeholder="Add Mark to Each Question"
          required
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label for="options">Are Multiple Subject?</label>
          <select
            className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
            id="options"
            name="options"
          >
            <option value="option2">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <label>Add Subjects</label>

            <input
              className="max-w-md p-2 outline-none border-2 border-blue-100"
              type="text"
              name=""
              placeholder="Subject Name"
            />

            <input
              className="max-w-md p-2 outline-none border-2 border-blue-100"
              type="text"
              name=""
              placeholder="Subject Name"
            />
          </div>
          <div>
            <button className="px-5 py-2 bg-gradient-to-bl from-sky-500 to-blue-200 text-white font-bold">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTitleInfo;
