import React, { createContext, useContext, useState } from "react";

// Create a Context
const ApiContextForQuiz = createContext();

// Create a Provider Component
export const ApiContextProvider = ({ children }) => {
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  return (
    <ApiContextForQuiz.Provider value={{ subjectCategories, setSubjectCategories, questions, setQuestions }}>
      {children}
    </ApiContextForQuiz.Provider>
  );
};

// Custom Hook to use the Context
export const useQuizApiContext = () => {
  return useContext(ApiContextForQuiz);
};
