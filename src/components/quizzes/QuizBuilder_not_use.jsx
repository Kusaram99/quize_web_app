import React, { useState } from "react";

const QuizBuilder = () => {
  const [quizInfo, setQuizInfo] = useState({
    title: "",
    category: "",
    quizDuration: "",
    startingTime: "",
    endingTime: "",
    userId: "64a8f9e4c2f4a0e9b7c2c12a",
  });

  const [questions, setQuestions] = useState([]);

  // Add a new question
  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      questionText: "",
      questionType: type, // radio, checkbox, true/false
      options: [""],
      correctOption: type === "checkbox" ? [] :  null,
    };
    setQuestions([...questions, newQuestion]);
  };

  // Update quiz information
  const handleQuizInfoChange = (field, value) => {
    setQuizInfo({ ...quizInfo, [field]: value });
  };

  // Update question text
  const handleQuestionTextChange = (id, text) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, questionText: text } : q))
    );
  };

  // Update options
  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const updatedOptions = [...q.options];
          updatedOptions[optionIndex] = value;

          // Add a new option if it's the last one and not empty
          if (optionIndex === q.options.length - 1 && value.trim() !== "") {
            updatedOptions.push("");
          }

          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  // Update correct option(s)
  const handleCorrectOptionChange = (questionId, value, isCheckbox) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          if (isCheckbox) {
            const updatedCorrectOptions = [...q.correctOption];
            if (updatedCorrectOptions.includes(value)) {
              return {
                ...q,
                correctOption: updatedCorrectOptions.filter((opt) => opt !== value),
              };
            }
            return { ...q, correctOption: [...updatedCorrectOptions, value] };
          }
          return { ...q, correctOption: value };
        }
        return q;
      })
    );
  };

  // Delete a question
  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Delete an option
  const deleteOption = (questionId, optionIndex) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const updatedOptions = q.options.filter((_, idx) => idx !== optionIndex);
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  // Build final JSON object
  const buildQuiz = () => {
    const finalQuiz = {
      quizInfo,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        questionType: q.questionType,
        options: q.options.filter((opt) => opt.trim() !== ""), // Remove empty options
        correctOption: q.correctOption,
      })),
    };
    console.log(finalQuiz); // Send this to your backend or display
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quiz Builder</h1>

      {/* Quiz Info */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Quiz Title"
          className="block w-full p-2 border mb-2"
          value={quizInfo.title}
          onChange={(e) => handleQuizInfoChange("title", e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="block w-full p-2 border mb-2"
          value={quizInfo.category}
          onChange={(e) => handleQuizInfoChange("category", e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (e.g., 30 minutes)"
          className="block w-full p-2 border mb-2"
          value={quizInfo.quizDuration}
          onChange={(e) => handleQuizInfoChange("quizDuration", e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Starting Time"
          className="block w-full p-2 border mb-2"
          value={quizInfo.startingTime}
          onChange={(e) => handleQuizInfoChange("startingTime", e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Ending Time"
          className="block w-full p-2 border mb-2"
          value={quizInfo.endingTime}
          onChange={(e) => handleQuizInfoChange("endingTime", e.target.value)}
        />
      </div>

      {/* Add Question */}
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={() => addQuestion("radio")}
        >
          Add Radio Question
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          onClick={() => addQuestion("checkbox")}
        >
          Add Checkbox Question
        </button> 
      </div>

      {/* Questions */}
      {questions.map((question) => (
        <div key={question.id} className="mb-6 border p-4 rounded">
          <input
            type="text"
            placeholder="Question Text"
            className="block w-full p-2 border mb-2"
            value={question.questionText}
            onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
          />
          {question.questionType !== "true/false" &&
            question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  className="w-3/4 p-2 border"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(question.id, index, e.target.value)
                  }
                />
                <button
                  className="px-2 ml-2 bg-red-500 text-white"
                  onClick={() => deleteOption(question.id, index)}
                >
                  Delete
                </button>
              </div>
            ))}
          {question.questionType === "radio" && (
            <div className="flex items-center mb-2">
              Correct Option:
              <input
                type="number"
                min="0"
                max={question.options.length - 1}
                className="ml-2 p-1 border"
                value={question.correctOption}
                onChange={(e) =>
                  handleCorrectOptionChange(question.id, +e.target.value, false)
                }
              />
            </div>
          )}
          {question.questionType === "checkbox" && (
            <div className="flex items-center flex-wrap">
              {question.options.map((_, idx) => (
                <label key={idx} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={question.correctOption.includes(idx)}
                    onChange={(e) =>
                      handleCorrectOptionChange(
                        question.id,
                        idx,
                        e.target.checked
                      )
                    }
                  />
                  Option {idx + 1}
                </label>
              ))}
            </div>
          )}
          <button
            className="px-4 py-1 bg-red-500 text-white rounded mt-2"
            onClick={() => deleteQuestion(question.id)}
          >
            Delete Question
          </button>
        </div>
      ))}

      {/* Finalize Quiz */}
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded"
        onClick={buildQuiz}
      >
        Finalize Quiz
      </button>
    </div>
  );
};

export default QuizBuilder;
