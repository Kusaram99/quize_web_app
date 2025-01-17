import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";

const QuizTitleInfo = ({
  collectQuizInfo,
  setCollectQuizInfo,
  subCategoryObject,
  setSubCategoryObject,
}) => {
  const { subjectCategories, setSubjectCategories } = useQuizApiContext();

  // add category handler
  const addCategoryHanlder = () => {
    if (
      subCategoryObject.categoryName.trim() === "" ||
      !+subCategoryObject.totalQuestion
    ) {
      alert("Please add subject name and Total questions number");
      return;
    } // if string is empty
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
    // console.log(subjectCategories);
  };

  return (
    <div className="flex flex-col gap-3 border p-5">
      <label className="font-medium">Type your quiz title</label>
      <input
        className="p-2 w-[100%] outline-none border-2 border-blue-100  focus:border-blue-400"
        type="text"
        name="title"
        placeholder="Type your quiz title"
        value={collectQuizInfo.title}
        onChange={(e) =>
          setCollectQuizInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Add marks to each question (Like 1 to 2)
          </label>
          <input
            className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
            type="number"
            min="0"
            name="marksPerQuestion"
            placeholder="Add marks to each question"
            value={collectQuizInfo.marksPerQuestion}
            onChange={(e) =>
              setCollectQuizInfo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Add passing marks to pass</label>
          <input
            className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
            type="number"
            min="0"
            name="passingMarks"
            placeholder="Add passing marks to pass"
            value={collectQuizInfo.passingMarks}
            onChange={(e) =>
              setCollectQuizInfo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">
            Add time duration in minutes to test
          </label>
          <input
            className="max-w-md p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
            type="number"
            min="0"
            name="timeDuration"
            placeholder="Add Time duration in minutes"
            value={collectQuizInfo.timeDuration}
            onChange={(e) =>
              setCollectQuizInfo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label className="font-medium">You Can Add Multiple Subjects</label>
          <input
            className="max-w-md p-2 outline-none border-2 border-blue-100 focus:border-blue-400"
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
            placeholder="Add Total number of questions"
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
              className="px-5 py-2 bg-gradient-to-bl from-sky-400 to-green-950 text-white font-bold"
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
