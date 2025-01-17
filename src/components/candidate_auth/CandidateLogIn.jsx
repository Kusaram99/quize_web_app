import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizApiContext } from "../useContexAPI/ContextAPI";
import {
  saveCandidateData,
  checkCandidateTestStatus,
  checkLink,
  getQuizId,
} from "./candidateRequestHandler";

const CandidateLogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const params = useParams();
  // const { auth } = useQuizApiContext();

  const [formData, setFormData] = useState({ 
    email: "",
    fullName: "",
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

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      errorMsg = "Invalid email address.";
    } else if (name === "fullName" && value.trim() === "" && value.length < 3) {
      errorMsg = "Full name is required";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
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
      // convert form data in lowercase to each field
      const formDataLower = Object.keys(formData).reduce((acc, key) => {
        if (key === "fullName") {
          acc[key] = formData[key];
          return acc;
        }
        acc[key] = formData[key].toLowerCase();
        return acc;
      }, {});
      // // console.log("Form data in lowercase: ", formDataLower);
      // send request to save candidate data
      const data = await saveCandidateData(formDataLower, setIsLoading);
      // // console.log("Data: ", data);
      // // console.log("candidateId: ", data.data._id);
      // // console.log("quiz: ", params.id);
      // alert(data.message);
      // calling getQuizId to get quiz id to check user have done this quiz before or not
      // console.log("Form submitted successfully:", formData);
      const response = await getQuizId(params.id)

      // console.log("Quiz ID: ",response.data.quizId)
      // return
      // calling this function to know candidate is submited test or not
      const checkTestStatus = await checkCandidateTestStatus({
        candidateId: data.data._id, 
        quizId: response.data.quizId,
      });

      // console.log("checkTestStatus of candidate: ", checkTestStatus);
      // console.log("candidate response: ", data.data._id); 
      // if candidate is not submited test
      if (checkTestStatus.data.status === false) {
        // navigate to examination page
        // console.log("new candidate: ", checkTestStatus.data)
        navigator(`/examinstruction?link=${params.id}&u_id=${data.data._id}`);
        // // console.log("Candidate Id in Submit handler: ", data.data._id);
        return
      }

      // if candidate is submited test already then show message and navigate to successful page
      // alert(checkTestStatus.message)
      // console.log("Check Test Status: ", checkTestStatus.data.status); 
      navigator(`/successful/${data.data._id}`);
    } 
  }; 

  useEffect(() => {
    // // console.log("link is valid or not: ", params.id)
    // calling chechk link function to check link is valid or not
    checkLink(params.id).then((data) => {
      // console.log("Check Link: ", data);
      // Check link is valid or not
      if (data.data.status === false) {
        alert(data.message);
        navigator("/error/404");
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Enter your Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4"> 
          {/* Full name */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-sky-300"
              }`}
              placeholder="Enter your username"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-sky-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
