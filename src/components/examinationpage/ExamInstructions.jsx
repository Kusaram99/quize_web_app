import React from "react";

const ExamInstructions = () => {
  const instructions = [
    "Read each question carefully before answering.",
    "You cannot revisit a question once answered.",
    "No use of electronic devices other than the exam device is allowed.",
    "Make sure to submit your exam before the timer ends.",
    "Contact the invigilator in case of any issues.",
  ];

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-100 p-6">
      {/* Exam Name */}
      <div>
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Exam Name: Final Assessment
          </h1>
        </header>

        {/* Instructions */}
        <main className="bg-white m-10 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </main>

        {/* Start Button */}
        <footer className="text-center">
          <button
            className="px-6 py-3 bg-sky-400 text-white font-semibold rounded-lg shadow hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
            onClick={() => alert("Exam Started")}
          >
            Start Exam
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ExamInstructions;
