import React from "react";
import { FaBars } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";


const MultipleChoiceQues = () => {
  return (
    <div className="bg-red-300 my-4">
      <div className="flex gap-3 p-2">
        <FaBars className="text-2xl cursor-pointer" />
        <IoIosArrowDropdown className="text-2xl cursor-pointer" />
        <IoIosArrowDropup className="text-2xl cursor-pointer" />
        <MdDelete className="text-2xl cursor-pointer" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <input
            className="w-[100%] p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
            type="Text"
            placeholder="Question"
          />
        </div>
        <div>
          <div className="flex flex-col items-end">
            <input
              className="w-[50%] p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
              type="text"
              placeholder="Answer"
            />
            <div>
              <label>Currect Answer</label>
              <input type="checkbox" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <input
              className="w-[50%] p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
              type="text"
              placeholder="Answer"
            />
            <div>
              <label>Currect Answer</label>
              <input type="checkbox" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <input
              className="w-[50%] p-2 outline-none border-2 border-blue-100  focus:border-blue-400"
              type="text"
              placeholder="Answer"
            />
            <div>
              <label>Currect Answer</label>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default MultipleChoiceQues