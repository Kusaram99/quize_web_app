import React, { useState } from "react";
import InputField from "./InputField";


const Signup = ({ inputs, handleSubmit, handleChange, toggleForm }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md w-80 mx-auto">
      <h2 className="text-xl font-bold text-gray-800">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputs.map((input) => (
          <InputField
            key={input.id}
            {...input}
            onChange={(e) => handleChange(e, input.id)}
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
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


export default Signup