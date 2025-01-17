import axios from "axios";

// Get request to get specific exam data
const getExamData = async (quizLink, setIsloading) => {
  try {
    // start loading
    setIsloading(true);
    // sending request
    const response = await axios.get(
      `${import.meta.env.VITE_GET_QUIZ_TO_EXAM_QUIZ_URL}/${quizLink}`
    );
    // response
    // // console.log("Exam data: ", response.data);
    // stop loading
    setIsloading(false);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching exam data: ", error);
    // stop loading
    setIsloading(false);
    throw error;
  }
};

// submit candidate answers
const submitCandidateAnswers = async (data, setIsloading) => {
  try {
    // start loading
    setIsloading(true);
    // sending post request
    const result = await axios.post(
      import.meta.env.VITE_SUBMIT_CANDIDATE_ANSWERS_URL,
      data
    );
    // response
    // console.log("Candidate Post response: ", result);
    // stop loading
    setIsloading(false);
    return result.data;
  } catch (err) {
    // stop loading
    setIsloading(false);
    console.error(
      "postRequestHandler Error: ",
      err.response?.data || err.message
    );
    throw err; // Re-throw the error for further handling if needed
  }
};

export { getExamData, submitCandidateAnswers};
