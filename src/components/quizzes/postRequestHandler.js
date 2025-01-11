import axios from "axios";

// POST request handler
const postRequestHandler = async (url, data) => {
  try {
    // sending post request
    const result = await axios.post(url, data);

    // response
    console.log("Post response: ", result.data);
    alert("Successful!")

    // return result.data; // Return the response data
  } catch (err) {
    console.error("postRequestHandler Error: ", err.response?.data || err.message);
    throw err; // Re-throw the error for further handling if needed
  }
};

export { postRequestHandler };