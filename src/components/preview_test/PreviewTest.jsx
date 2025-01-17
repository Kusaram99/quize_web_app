import React, {  useState } from "react";
import QuestionBox from "./QuestionBox";
import SolvedNumberingBox from "./SolvedNumberingBox"; 
import { useQuizApiContext } from "../useContexAPI/ContextAPI"; 
import ButtonsComponent from "./ButtonsComponent"; 
import { useNavigate } from "react-router-dom";

const ExaminationPage = () => {
  
  const {previewData, setPreviewData} = useQuizApiContext()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1); 
  const navigator = useNavigate()
  
  // handle next button click
  const next = (index) => {
    // check if the index is out of bounds
    if (index >= previewData.length) {
      alert("You have reached to last question")
      return
    };
    setCurrentQuestionIndex(index + 1);
  };

  // handle previous button /click
  const previous = (index) => {
    // check if the index is out of bounds
    if (index <= 1) return;
    setCurrentQuestionIndex(index - 1); 
  };

  // handle navigation as question number click
  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // save changes of candidate answers handler
  const goToPreviousPage = () => {
    // navigate to previous page
    navigator("/home/create-quiz", {state:"preview"})
  };

   // save changes of candidate answers handler
   const saveOnchange = (questionIndex, optionIndex) => {
    // // console.log("Save Changes: ", index);
    const updatedDate = previewData.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          candidateAnswer: optionIndex,
        };
      }
      return question;
    });
    setPreviewData([...updatedDate]);
  };
 

  return (
    <div className="flex flex-col items-center justify-start p-10 bg-gray-100"> 
          <SolvedNumberingBox
            navigateToQuestion={navigateToQuestion}
            questions={previewData}   
          />
          {
            previewData?.map((question, index) => {
              if (index + 1 !== currentQuestionIndex) return null;
              return (
                <QuestionBox
                  key={index}
                  index={index}
                  question={question}
                  saveOnchange={saveOnchange}
                />
              );
            })}

          <ButtonsComponent
            next={next}
            previous={previous}
            currentQuestionIndex={currentQuestionIndex} 
            goToPreviousPage={goToPreviousPage}
          /> 
    </div>
  );
};

export default ExaminationPage;
