import React, { createContext, useContext, useState } from "react";

// Create a Context
const ApiContextForQuiz = createContext();

// Create a Provider Component
export const ApiContextProvider = ({ children }) => {
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [collectQuizInfo, setCollectQuizInfo] = useState({
    title: "",
    marksPerQuestion: "",
    timeDuration: "",
    passingMarks: "",
  });

  return (
    <ApiContextForQuiz.Provider
      value={{
        subjectCategories,
        setSubjectCategories,
        previewData,
        setPreviewData,
        setAuth,
        auth,
        collectQuizInfo,
        setCollectQuizInfo,
      }}
    >
      {children}
    </ApiContextForQuiz.Provider>
  );
};

// Custom Hook to use the Context
export const useQuizApiContext = () => {
  return useContext(ApiContextForQuiz);
};
