import React from "react";

const QuestionBox = () => {
  return (
    <div className="flex-grow flex items-start justify-center py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">
          Q.1 This is a Questions headline This is a Questions headline This is a Questions headline This is a Questions headline This is a Questions headline 
        </h1>
        <div className="space-y-4">
          <ul className="ml-16 w-80" style={{listStyleType:'upper-alpha'}}>
            <li>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
                <span className="text-gray-700">1 Option</span>
                <input
                  type="radio"
                  name="op1"
                  className="w-5 h-5 text-sky-500 focus:ring-sky-500"
                />
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
                <span className="text-gray-700">2 Option</span>
                <input
                  type="radio"
                  name="op1"
                  className="w-5 h-5 text-sky-500 focus:ring-sky-500"
                />
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
                <span className="text-gray-700">3 Option</span>
                <input
                  type="radio"
                  name="op1"
                  className="w-5 h-5 text-sky-500 focus:ring-sky-500"
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="flex justify-center gap-7 mt-6">
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            Previous
          </button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition">
            Next
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
