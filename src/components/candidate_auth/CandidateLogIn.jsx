import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";

const CandidateLogIn = () => {

  const navigator = useNavigate()
  const {auth} = useQuizApiContext()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName:""
  });

  const [errors, setErrors] = useState({});

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  // Validation Function
  const validateInput = (name, value) => {
    let errorMsg = "";

    if (name === "username" && value.trim() === "") {
      errorMsg = "Username is required.";
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      errorMsg = "Invalid email address.";
    } else if (name === "password" && value.length < 6) {
      errorMsg = "Password must be at least 6 characters.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validateInput(key, formData[key]);
      if (formData[key].trim() === "") {
        validationErrors[key] = `${key} is required.`;
      }
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
    }
  };

// check user login or not
useEffect(()=>{
    if(!auth){ 
        navigator("/home/authentication")
    }
},[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Enter your Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Full name */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.fullName ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"
              }`}
              placeholder="Enter your username"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          {/* <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateLogIn;
