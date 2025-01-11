import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";

const QuizTitleInfo = ({ setCollectQuizInfo }) => {
  const { subjectCategories, setSubjectCategories } =
    useQuizApiContext();
  const [subCategoryObject, setSubCategoryObject] = useState({
    categoryName: "",
    totalQuestion: "",
    questions: [],
  });

  // add category handler
  const addCategoryHanlder = () => {
    if (subCategoryObject.categoryName.trim() === "" || !+subCategoryObject.totalQuestion) {
      alert("Please add subject name and Total questions number")
      return
    }; // if string is empty
    setSubjectCategories((prev) => [...prev, subCategoryObject]);
    // setCategoryVariable("");
    setSubCategoryObject((prev) => ({
      ...prev,
      categoryName: "",
      totalQuestion: "",
    })); 
  };

  // remove subjectCategories handler
  const removeCategories = (index) => {
    // extracting category name
    // const deletedCategory = subjectCategories[index];
    // deleting category
    setSubjectCategories((prev) => prev.filter((_, ind) => ind !== index));
    // deleting category all questions
    // setQuestions((prev) =>
    //   prev.filter((ques) => ques.subjectName !== deletedCategory)
    // );
    console.log(subjectCategories)
  };

  return (
    <div className="flex flex-col gap-3 border p-5">
      <input
        className="p-2 w-[100%] outline-none border-2 border-blue-100  focus:border-blue-400"
        type="text"
        name="title"
        placeholder="Type your Quiz Title"
        onChange={(e) =>
          setCollectQuizInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
      <div className="flex flex-col gap-4"> 
        <input
          className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
          type="number"
          min="0"
          name="marksPerQuestion"
          placeholder="Add Marks to Each Question"
          onChange={(e) =>
            setCollectQuizInfo((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <input
          className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
          type="number"
          min="0"
          name="passingMarks"
          placeholder="Add Passing Marks"
          onChange={(e) =>
            setCollectQuizInfo((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <input
          className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
          type="number"
          min="0"
          name="timeDuration"
          placeholder="Add Time duration in minutes"
          onChange={(e) =>
            setCollectQuizInfo((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label>You Can Add Multiple Subjects</label>
          <input
            className="max-w-md p-2 outline-none border-2 border-blue-100"
            type="text"
            value={subCategoryObject.categoryName}
            onChange={(e) =>
              setSubCategoryObject((prev) => ({
                ...prev,
                categoryName: e.target.value,
              }))
            }
            placeholder="Subject Name"
          />
          <input
            className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
            type="number"
            min="0"
            name="totalQuestionsNumber"
            placeholder="Add Total Questions No."
            value={subCategoryObject.totalQuestion}
            onChange={(e) => 
              setSubCategoryObject((prev) => ({
                ...prev,
                totalQuestion: e.target.value,
              }))
            }
          />
          <div className="flex gap-3">
            {subjectCategories.map((item, index) => (
              <div key={index} className=" text-white flex">
                <span className="p-1 bg-gray-500 rounded">
                  {item.categoryName}
                </span>
                <IoClose
                  onClick={() => removeCategories(index)}
                  className="text-sm text-red-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={addCategoryHanlder}
              className="px-5 py-2 bg-gradient-to-bl from-sky-500 to-blue-200 text-white font-bold"
            >
              Add Subject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTitleInfo;
