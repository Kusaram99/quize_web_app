import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizTopButton from "./QuizTopButton";
import QuizTitleInfo from "./QuizTitleInfo";
import AddQuestionBtn from "./AddQuestionBtn";
import PreviewAndSaveBtn from "./PreviewAndSaveBtn";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";
import Questions from "./Questions";
import { postRequestHandler } from "./quizRequestHandler";

const QuizCreator = () => {
  const {
    subjectCategories,
    setSubjectCategories,
    auth,
    collectQuizInfo,
    setCollectQuizInfo,
  } = useQuizApiContext();

  const navigate = useNavigate();
  const [subCategoryObject, setSubCategoryObject] = useState({
    categoryName: "",
    totalQuestion: "",
    questions: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // to get url state data
  const previousLocation = useLocation();

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
      subjectCategories[index].questions.length <
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
        `You have completed your total number ${subjectCategories[index].questions.length} questions for ${subjectName} Subject`
      );
    }
  };

  // save questions handler
  const saveQuiz = async () => {
    // if user is not login or signup
    if (!auth) {
      alert("Please LogIn");
      navigate("/home");
      return;
    }
    setIsLoading(true);
    if (
      subjectCategories.length >= 1 &&
      collectQuizInfo.title &&
      +collectQuizInfo.marksPerQuestion &&
      +collectQuizInfo.timeDuration
    ) {
      const quizData = {
        userId: auth.id,
        quizInfo: {
          ...collectQuizInfo,
        },
        subjectCategories: subjectCategories,
      };
      // console.log("Quiz Data: ", quizData);
      await postRequestHandler(
        import.meta.env.VITE_CRETE_QUIZ_POST_URL,
        quizData
      );
      navigate("/home/dashboard");
    } else {
      setIsLoading(false);
      alert("All information is needed of exam topic");
    }
    // console.log(subjectCategories);
  };

  // Questions data empty when component run first time
  useEffect(() => {
    // console.log("previousLocation: ", previousLocation);
    // don't delete all quiz data if user come back from preview page
    if (previousLocation.state === "preview") return;

    // set empty data when component run first time
    setSubjectCategories([]);
    setCollectQuizInfo((prev) => ({
      title: "",
      marksPerQuestion: "",
      timeDuration: "",
      passingMarks: "",
    }));
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-200 py-5 overflow-auto">
      <div className="max-w-[1160px] mx-auto border border-gray-300 bg-gray-50">
        <QuizTopButton />
        <div className="p-3">
          <QuizTitleInfo
            setCollectQuizInfo={setCollectQuizInfo}
            subCategoryObject={subCategoryObject}
            setSubCategoryObject={setSubCategoryObject}
            collectQuizInfo={collectQuizInfo}
          />
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
            {/* ============== Loading part  =================== */}
          </div>
          {isLoading ? (
            <p className="px-5 py-5 text-right">Loading...</p>
          ) : (
            <PreviewAndSaveBtn saveQuiz={saveQuiz} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
