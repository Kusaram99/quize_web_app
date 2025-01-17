import React, { useEffect, useState } from "react";
import QuestionBox from "./QuestionBox";
import SolvedNumberingBox from "./SolvedNumberingBox";
import { getExamData } from "./examsRequestHandler";
import ButtonsComponent from "./ButtonsComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { submitCandidateAnswers } from "./examsRequestHandler";

const ExaminationPage = () => {
  // State to store selected answers and results
  // const [selectedAnswers, setSelectedAnswers] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const locationData = useLocation();
  const [examData, setExamData] = useState({ ...locationData.state.examData });
  const navigator = useNavigate()

  // Handle option selection
  // const handleOptionSelect = (questionId, optionIndex) => {
  //   setSelectedAnswers((prev) => ({
  //     ...prev,
  //     [questionId]: optionIndex,
  //   }));
  // };

  // handle next button click
  const next = (index) => {
    // check if the index is out of bounds
    if (index >= examData.questions.length) {
      alert("You have reached to last question")
      return
    };
    setCurrentQuestionIndex(index + 1);
  };

  // handle previous button click
  const previous = (index) => {
    // check if the index is out of bounds
    if (index <= 1) return;
    setCurrentQuestionIndex(index - 1);
    // // console.log("Current Question Index: ", currentQuestionIndex);
  };

  // handle navigation as question number click
  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // save changes of candidate answers handler
  const saveChanges = (questionIndex, optionIndex) => {
    // // console.log("Save Changes: ", index);
    const updatedDate = examData.questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          candidateAnswer: optionIndex,
        };
      }
      return question;
    });
    setExamData({ ...examData, questions: updatedDate });
  };

  
  // Handle exam submission
  const submitHandler = async () => {
    if(!confirm("Do you want to submit the test!")) return;

    // // console.log("Submit Handler: ", examData);
    // // console.log("candidate from location: ", locationData.state.candidateId);
    const data = {
      candidateId: locationData.state.candidateId,
      quizId: examData._id,
      candidateAnswers: examData.questions,
    };
    // // console.log("exam data: ", data)
    // send request                      
    const response = await submitCandidateAnswers(data, setIsloading);
    // console.log("Response in comp: ", response.data._id);
    alert("Your test is submitted successfully");
    // // navigate to successful page
    navigator(`/successful/${response.data._id}`)
  };

  // to worning when user try to reload the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // Required in some browsers
      event.returnValue = ""; // This triggers the confirmation dialog
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-10 bg-gray-100">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SolvedNumberingBox
            navigateToQuestion={navigateToQuestion}
            questions={examData?.questions}
          />
          {examData?.questions &&
            examData?.questions.map((question, index) => {
              if (index + 1 !== currentQuestionIndex) return null;
              return (
                <QuestionBox
                  key={index}
                  index={index}
                  question={question}
                  saveChanges={saveChanges}
                />
              );
            })}

          <ButtonsComponent
            next={next}
            previous={previous}
            currentQuestionIndex={currentQuestionIndex}
            submitHandler={submitHandler}
          />
        </>
      )}
    </div>
  );
};

export default ExaminationPage;
