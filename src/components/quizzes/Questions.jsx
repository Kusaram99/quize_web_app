import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

const Questions = ({
  question,
  questionIndex,
  categoryIndex,
  setSubjectCategories,
  handleQuestionChange,
}) => { 
  // Update options
  const handleOptionChange = (catgIndex, quesIndex, optIndex, value) => {
    setSubjectCategories((prev) =>
      prev.map((category, index) => {
        if (index === catgIndex) {
          const toupdateData = { ...category };
          const currentQuesion = toupdateData.questions[quesIndex];
          currentQuesion.options[optIndex] = value;
          toupdateData.questions[quesIndex] = currentQuesion;
          // add new input to options when user is typing to the last box
          if (
            currentQuesion.options[currentQuesion.options.length - 1].trim() !=
            ""
          ) {
            currentQuesion.options.push("");
            toupdateData.questions[quesIndex] = currentQuesion;
          }
          return toupdateData;
        } else {
          return category;
        }
      })
    );
  };

  // Update correct option(s)
  const handleCorrectOptionChange = (catgIndex, quesIndex, value) => {
    // console.log("checked: ", isCheckbox);
    setSubjectCategories((prev) =>
      prev.map((category, index) => {
        if (index === catgIndex) {
          const toupdateData = { ...category };
          const currentQuesion = toupdateData.questions[quesIndex];
          currentQuesion.correctOption = value;
          toupdateData.questions[quesIndex] = currentQuesion;
          return toupdateData;
        }
        return category;
      })
    );
  };

  // Delete a question
  const deleteQuestion = (catgIndex, quesIndex,catgName) => {
    console.log(catgName)
    setSubjectCategories((prev) =>
      prev.map((category, index) => {
        if (index === catgIndex  && category.categoryName === catgName) {
          const toupdateData = { ...category };
          toupdateData.questions = toupdateData.questions.filter((_, ind) => ind != quesIndex);
          return toupdateData;
        }
        return category;
      })
    );
  };

  // Delete an option
  const deleteOption = (catgIndex, quesIndex, optIndex) => {
    setSubjectCategories((prev) =>
      prev.map((category, index) => {
        if (index === catgIndex) {
          const toupdateData = { ...category };
          const currentQuesion = toupdateData.questions[quesIndex];
          // if options are only two then don't delete
          if (currentQuesion.options.length > 2) {
            currentQuesion.options = currentQuesion.options.filter(
              (_, ind) => ind != optIndex
            );
          }
          toupdateData.questions[quesIndex] = currentQuesion;
          return toupdateData;
        } else {
          return category;
        }
      })
    );
  };

  return (
    <div className="my-2">
      {/* {questions.map((question, index) => ( */}
      <div className="bg-sky-300">
        <div className="flex gap-3 p-2">
          <FaBars className="text-2xl cursor-pointer" />
          <IoIosArrowDropdown className="text-2xl cursor-pointer" />
          <IoIosArrowDropup className="text-2xl cursor-pointer" />
          <MdDelete
            onClick={() =>
              deleteQuestion(categoryIndex, questionIndex, question.subjectName)
            }
            className="text-2xl cursor-pointer"
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <input
            className="w-[100%] p-2 outline-none border-2 border-blue-100 focus:border-blue-400"
            type="text"
            placeholder="Question"
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(
                { questionText: e.target.value },
                questionIndex,
                categoryIndex
              )
            }
          />
          {/* ================== options input box ================= */}
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex gap-2">
              <span>{optionIndex + 1}. </span>
              <input
                className="w-[50%] p-2 outline-none border-2 border-blue-100 focus:border-blue-400"
                type="text"
                placeholder="Answer"
                value={option}
                onChange={(e) =>
                  handleOptionChange(
                    categoryIndex,
                    questionIndex,
                    optionIndex,
                    e.target.value
                  )
                }
              />
              {/* ============== delte button ============ */}
              <MdDelete
                className="text-xl text-red-500 cursor-pointer"
                onClick={() =>
                  deleteOption(categoryIndex, questionIndex, optionIndex)
                }
              />
            </div>
          ))}

          {/* ====================== checkbox question pending ======================= */}
          {/* <div className="flex items-center flex-wrap">
              {question.options.map((_, idx) => (
                <label key={idx} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={question.correctOption?.includes(idx)}
                    onChange={(e) =>
                      handleCorrectOptionChange(
                        question.id,
                        idx,
                        e.target.checked
                      )
                    }
                  />
                  Option {idx + 1}
                </label>
              ))}
            </div> */} 
          <div className="flex items-center mb-2">
            Correct Option:
            <input
              type="number"
              min="1"
              max={question.options.length}
              className="ml-1 p-1 outline-none border-2 border-blue-100 focus:border-blue-400"
              value={question.correctOption ? question.correctOption : "0"}
              onChange={(e) =>
                handleCorrectOptionChange(
                  categoryIndex,
                  questionIndex,
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default Questions;
