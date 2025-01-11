import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import { IoMdClose } from "react-icons/io";

const Signup = ({
  inputs,
  handleSubmit,
  handleChange,
  toggleForm,
  loadeHandler,
}) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md w-80 mx-auto">
      <Link to="/" className="flex justify-end">
        <IoMdClose />
      </Link>

      <h2 className="text-xl font-bold text-gray-800">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputs.map((input) => (
          <InputField
            key={input.id}
            {...input}
            onChange={(e) => handleChange(e, input.id)}
          />
        ))}
        <div>
          {loadeHandler.signup && (
            <div className="bubblingG">
              <span id="bubblingG_1"></span>
              <span id="bubblingG_2"></span>
              <span id="bubblingG_3"></span>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      <p className="text-sm mt-4 text-center">
        Already have an account?{" "}
        <button
          onClick={toggleForm}
          className="text-blue-500 underline focus:outline-none"
        >
          Log In Here
        </button>
      </p>
    </div>
  );
};

export default Signup;
