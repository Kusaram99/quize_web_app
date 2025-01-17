import React, { useEffect } from "react";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";
import { useNavigate } from "react-router-dom";

const PreviewAndSaveBtn = ({ saveQuiz }) => {
  const { subjectCategories, previewData, setPreviewData } = useQuizApiContext(); 

  // navigator
  const navigator = useNavigate();

  // save quiz handler
  const saveQuizHandler = () => {
    saveQuiz();
  };

  // preview button handler
  const previewHandler = () => {
    navigator("/home/quiz-preview");
  }; 

  // flat questions of all subject categories
  const flatTheQuestions = (data)=>{
    const allQuestions = data
      .map((category) => category.questions)
      .flat();
    // update the previewData state
    setPreviewData(allQuestions)
    // console.log("allQuestions: ", allQuestions)
  }

  // useEffect to handle handle preview data
  useEffect(()=>{
    flatTheQuestions(subjectCategories)
  },[subjectCategories])
  

  return (
    <div className="flex gap-4 mt-4 justify-end">
      {/* ============================== Preview button ======================= */}
      {previewData.length !== 0 ? (
        <button
          className="bg-gradient-to-bl from-sky-400 to-green-950 px-6 py-3 text-white font-bold"
          onClick={previewHandler}
        >
          Preview
        </button>
      ) : (
        "" 
      )}

      {/* ============================== Save button =========================== */}
      <button
        className="bg-gradient-to-bl from-sky-400 to-green-950 px-6 py-3 text-white font-bold"
        onClick={saveQuizHandler}
      >
        Save Quiz
      </button>
    </div>
  );
};

export default PreviewAndSaveBtn;
