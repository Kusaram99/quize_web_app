import React, { useState } from "react";
import QuestionBox from "./QuestionBox";
import SolvedNumberingBox from "./SolvedNumberingBox";

const ExaminationPage = () => {
  // Sample questions data
  const [questions] = useState([
    {
      id: 1734154368034,
      questionText: "What is 2 + 2?",
      questionType: "multiple-choice",
      options: ["3", "4", "5"],
      correctOption: 1,
    },
    {
      id: 1734154376433,
      questionText: "What is the capital of France?",
      questionType: "multiple-choice",
      options: ["Berlin", "Paris", "Madrid"],
      correctOption: 1,
    },
  ]);

  // State to store selected answers and results
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle option selection
  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Handle exam submission
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen p-10 bg-gray-100">
        <SolvedNumberingBox/>
        <QuestionBox/>
    </div>
  );
};

export default ExaminationPage;
