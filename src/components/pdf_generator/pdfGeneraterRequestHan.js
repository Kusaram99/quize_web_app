import axios from "axios"

// GET Request handle to find all the answer of candidate's
const getRequestToGetUserAnswer = async(id) =>{
    try {
        // send request
        const result = await axios.get(`${import.meta.env.VITE_GET_CADIDATES_RESULT_URL}/${id}`);
        return result
    
    } catch (error) {
        // console.log("REQUEST ERROR: ", error)
        throw error
    }

}


export {getRequestToGetUserAnswer}