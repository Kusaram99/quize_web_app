import React, { useState } from "react";
import QuizTopButton from "./QuizTopButton";
import QuizTitleInfo from "./QuizTitleInfo";
import AddQuestionBtn from "./AddQuestionBtn";
import PreviewSaveBtn from "./PreviewSaveBtn";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";
import Questions from "./Questions";

const QuizCreator = () => {
  const { subjectCategories, setSubjectCategories} =
    useQuizApiContext();
  const [collectQuizInfo, setCollectQuizInfo] = useState({});

  // question onchange handler
  const handleQuestionChange = (questionData, questionIndex, categoryIndex) => {
    // Update the specific question in the selected category while maintaining immutability.
    setSubjectCategories((prevCategories) =>
      prevCategories.map((category, catIndex) => {
        // Check if the current category is the one we need to update
        if (catIndex === categoryIndex) {
          // Update the specific question while keeping other questions unchanged
          const updatedQuestions = category.questions.map(
            (question, qIndex) =>
              qIndex === questionIndex
                ? { ...question, ...questionData } // Update the target question
                : question // Keep other questions as-is
          );
          // Return the updated category with new questions
          return { ...category, questions: updatedQuestions };
        }
        // Return other categories as-is
        return category;
      })
    );
  };

  // add question handler
  const addQuestion = (questionType, subjectName, index) => {
    // if questions are less than total added number
    if (
      subjectCategories[index].questions.length <=
      +subjectCategories[index].totalQuestion
    ) {
      const newQuestion = {
        id: Date.now(),
        questionText: "",
        questionType: questionType, // radio, checkbox, true/false
        options: ["", ""],
        correctOption: 0,
        subjectName: subjectName,
        // correctOption: questionType === "checkbox" ? [] : null,
      };
      // udating specific category data
      setSubjectCategories((prev) =>
        prev.map((subject, innerIndex) => {
          if (innerIndex === index) {
            return {
              ...subject,
              questions: [...subject.questions, newQuestion], // Immutable update
            };
          }
          return subject;
        })
      );
    } else {
      alert(
        `You have completed your total number of questions for ${subjectName} Subject`
      );
    }
  };

  // save questions handler
  const saveQuiz = () => {
    if (
      subjectCategories.length >= 1 &&
      collectQuizInfo.title && 
      +collectQuizInfo.marksPerQuestion &&
      +collectQuizInfo.timeDuration
    ) {
      let questions = []
      // iterate all data of all subject
      for(let data of subjectCategories){
        questions = [...questions, ...data.questions]
      }
      const quizData = {
        quizInfo: {
          ...collectQuizInfo,
          subjectCategory: subjectCategories,
        },
        questions,
      };
      console.log("Quiz Data: ", quizData);
    } else {
      alert("All information is needed of exam topic");
    }
    console.log(subjectCategories);
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-gray-200 py-5 overflow-auto">
      <div className="max-w-[1160px] mx-auto border border-gray-300 bg-gray-50">
        <QuizTopButton />
        <div className="p-3">
          <QuizTitleInfo setCollectQuizInfo={setCollectQuizInfo} />
          <div className="flex flex-col gap-3 mt-3 border"> 
            {/* ================================= */}
            {subjectCategories.map((item, index) => (
              <div key={index} className="flex flex-col">
                <h1 className="font-semibold p-2 text-white bg-gray-400">
                  {item.categoryName}
                </h1>

                {item.questions.map((question, innerIndex) => {
                  if (question.subjectName === item.categoryName) {
                    return (
                      <Questions
                        key={innerIndex}
                        questionIndex={innerIndex}
                        categoryIndex={index}
                        question={question} 
                        handleQuestionChange={handleQuestionChange}
                        setSubjectCategories={setSubjectCategories}
                      />
                    );
                  } else {
                    // return "";
                    return;
                  }
                })}

                <AddQuestionBtn
                  key={index}
                  addQuestion={addQuestion}
                  subCategory={item.categoryName}
                  index={index}
                />
              </div>
            ))}
            {/* ================================= */}
          </div>
          <PreviewSaveBtn saveQuiz={saveQuiz} />
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
