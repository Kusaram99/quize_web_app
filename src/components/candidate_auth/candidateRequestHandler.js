import axios from "axios";


// POST request handler for save candidate data
export const saveCandidateData = async (data, setIsLoading) => {
  try {
    // start loading
    setIsLoading(true)
    // sending post request
    const result = await axios.post(import.meta.env.VITE_SIGNUP_OR_LOGIN_CANDIDATE_URL, data);
    // response
    // // console.log("Candidate Post response: ", result);
    // update candidate data 
    // stop loading
    setIsLoading(false)
    return result.data
  } catch (err) {
    // stop loading
    setIsLoading(false)
    console.error(
      "postRequestHandler Error: ",
      err.response?.data || err.message
    );
    throw err; // Re-throw the error for further handling if needed 
  }
};

// Post request to check user is already submitted the test
export const checkCandidateTestStatus = async (data) => {
  try { 
    // sending post request
    const result = await axios.post(import.meta.env.VITE_CHECK_CANDIDATE_TEST_STATUS, data);
    // response
    // // console.log("Candidate Post response: ", result);
    // update candidate data 
    // stop loading 
    return result.data
  } catch (err) { 
    console.error(
      "postRequestHandler Error: ",
      err.response?.data || err.message
    );
    throw err; // Re-throw the error for further handling if needed 
  }
};

// check link is valid or not
export const checkLink = async (id) => {
  try {
    // sending post request
    const result = await axios.get(`${import.meta.env.VITE_CHECK_IS_LINK_VALID}/${id}`);
    // response
    // // // console.log("Candidate Post response: ", result);
    // update candidate data
    return result.data
  } catch (err) {
    console.error(
      "postRequestHandler Error: ",
      err.response?.data || err.message
    );
    throw err; // Re-throw the error for further handling if needed
  }
};
 

//get request to get quiz id
export const getQuizId = async(link)=>{
  try {
    // sending post request
    const result = await axios.get(`${import.meta.env.VITE_GET_QUIZ_ID_URL}/${link}`);
    // response
    // // // console.log("Candidate Post response: ", result);
    // update candidate data
    return result.data
  } catch (err) {
    console.error(
      "postRequestHandler Error: ",
      err.response?.data || err.message
    );
    throw err; // Re-throw the error for further handling if needed
  }
} 