import CandidateModel from "../models/candidate.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create account ========================================
const createCandidate = asyncHandler(async (req, res) => {
  try {
    const { username, mobileno } = req.body;
    // Check if the user already exists
    let user = await CandidateModel.findOne({ username, mobileno });

    if (user) {
      // If user exists, treat it as a login
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User logged in successfully"));
    } else {
      // If user doesn't exist, create a new account
      user = await CandidateModel.create({ username, mobileno });
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



export {createCandidate}
