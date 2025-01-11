import {
  CandidateModel,
  CandidateAnswerModel,
} from "../models/candidate.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create account ========================================
const createCandidate = asyncHandler(async (req, res) => {
  console.log("creating candidate: ", req.body);
  try {
    const { username, fullName, email } = req.body;

    // if provided data are empty
    if (!username || !email || !fullName) {
      throw new ApiError(401, "All field are required");
    }

    // Check if the user already exists
    let user = await CandidateModel.findOne({ email });

    if (user) {
      // If user exists, treat it as a login
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User logged in successfully"));
    } else {
      // If user doesn't exist, create a new account
      user = await CandidateModel.create({ username, fullName, email });
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            user,
            "Account created and user logged in successfully"
          )
        );
    }
  } catch (err) {
    console.log("Error: ", err.message);
    new ApiError(500, err.message);
  }
});

// Save candidate answer ==============================
const candidateAnswers = asyncHandler(async (req, res) => {
  try {
    const { candidateId, quizId, candidateAnswers } = req.body;
    console.log("candidateId: ", req.body);
    // if data are empty of candidateId and questionId
    if (!candidateId || !quizId) {
      throw new ApiError(401, "candidateId and questionId are required");
    }

    // storing data to database
    const result = await CandidateAnswerModel.create({
      candidateId,
      quizId,
      candidateAnswers,
    });

    // sending response
    res
      .status(200)
      .json(new ApiResponse(200, result, "Successfully submited!"));

    // Error handling in catch
  } catch (err) {
    console.log("Error: ", err.message);
    new ApiError(500, err.message);
  }
});

// is user re-attending the exam ========================
const isUserReattending = asyncHandler(async (req, res) => {
  try {
    const { candidateId, quizId } = req.body;
    console.log("candidateId: ", req.body);
    // if data are empty of candidateId and questionId
    if (!candidateId || !quizId) {
      throw new ApiError(401, "candidateId and quizId are required");
    }

    // check if user is re-attending the exam
    const result = await CandidateAnswerModel.findOne({
      candidateId,
      quizId,
    });

    // if user is new 
    if (!result) {
     return res
      .status(200)
      .json(new ApiResponse(200, {status: false}, "Candidate is new!"));
    }

    // sending response
    res
      .status(200)
      .json(new ApiResponse(200, {status: true}, "Successfully submited!"));
  } catch (err) {
    console.log("Error: ", err.message);
    new ApiError(500, err.message);
  }
});

export { createCandidate, candidateAnswers, isUserReattending };
