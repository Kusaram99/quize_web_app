import axios from "axios"; 

// GET request handler
export const getAdminQuizzes = async (url, setAdminData) => {
  try {
    const result = await axios.get(url);
    // update admin data
    setAdminData(result.data.data);
    // console.log("Result: ", result.data.data);
  } catch (error) {
    console.error("Error fetching quizzes: ", error);
  }
};

// PUT request handler
export const toggleLinkSharing = async (data, setAdminData, setIsLoading) => {
  try {
    // start loading
    setIsLoading(true)
    // sending post request
    const result = await axios.put(import.meta.env.VITE_TOGGLE_SHARE_LINK_QUIZZES_URL, data);
    // response
    // // console.log("Post response =====: ", result);
    
    const auth = JSON.parse(localStorage.getItem("auth")); 

    // after updating the data, fetch the updated data
    await getAdminQuizzes(`${import.meta.env.VITE_GET_ADMIN_QUIZZES_URL}/${auth.id}`, setAdminData);
    alert("Successful!"); 
    // stop loading
    setIsLoading(false)
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

// DELETE request handler
export const deleteQuiz = async (quizId, setAdminData, setIsLoading) => {
  try {
    // start loading
    setIsLoading(true)
    // sending delete request
    const result = await axios.delete(`${import.meta.env.VITE_DELETE_QUIZ_URL}/${quizId}`);
    // response
    // // console.log("Post response: ", result);
    // auth data
    const auth = JSON.parse(localStorage.getItem("auth")); 
    // after updating the data, fetch the updated data
    await getAdminQuizzes(`${import.meta.env.VITE_GET_ADMIN_QUIZZES_URL}/${auth.id}`, setAdminData);
    alert("Successful!"); 
    // stop loading
    setIsLoading(false)
  } catch (err) {
    // stop loading
    setIsLoading(false)
    console.error(
      "postRequestHandler Error: ",
      err.response?.data || err.message
    );
    throw err; // for further handling if needed
  }
}


