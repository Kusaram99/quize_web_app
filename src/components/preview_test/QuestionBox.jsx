import React from "react"; 

const QuestionBox = ({ question, index, saveOnchange }) => {
  // // console.log(question);
  return (
    <div className="flex-row flex items-start justify-center py-6 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">
          Q.{index + 1}&#41; {question?.questionText}
        </h1>
        <div className="">
          <ul className="ml-16" style={{ listStyleType: "upper-alpha" }}> 
            {/* ==================== extracting options of question =============== */}
            {question?.options.map((option, innerIndex) => {
              if (option === "") return null;
              return (
                <li key={innerIndex}>
                  <div className="flex gap-5 items-center justify-start bg-gray-50 p-3 rounded-lg shadow-sm">
                    <input
                      onChange={() => saveOnchange(index, innerIndex+1)}
                      type="radio"
                      checked={question?.candidateAnswer === innerIndex + 1? true : false}
                      name={`question_${question?.id}`}
                      className="w-5 h-5 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-Blu-700">{option}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;




