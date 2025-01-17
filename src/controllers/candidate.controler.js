import mongoose from "mongoose";
import {
  CandidateModel,
  CandidateAnswerModel,
} from "../models/candidate.model.js";
import QuizModel from "../models/quize.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create account ========================================
const createCandidate = asyncHandler(async (req, res) => {
  // console.log("creating candidate: ", req.body);
  try {
    const { fullName, email } = req.body;

    // if provided data are empty
    if (!email || !fullName) {
      throw new ApiError(401, "All fields are required");
    }

    // Check if the user already exists
    let user = await CandidateModel.findOne({ email });
    console.log("user: === ", user)
    if (user) {
      // If user exists, treat it as a login
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User logged in successfully"));
    } else {
      // If user doesn't exist, create a new account
      user = await CandidateModel.create({ fullName, email });

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
    console.log("Error: ", err.code);
    throw new ApiError(500, "Server ERROR!");
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

    // if user data data saved in data base then update the main quiz status
    if (result) {
      const quizData = await QuizModel.updateOne(
        { _id: quizId },
        { $inc: { response: 1 } }
      );
      // if current quiz data not fount
      if (quizData.modifiedCount === 0) {
        throw new ApiError(401, "Something is wrong!");
      }
    }

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
        .json(new ApiResponse(200, { status: false }, "Candidate is new!"));
    }

    // sending response
    res
      .status(200)
      .json(new ApiResponse(200, { status: true }, "Successfully submited!"));
  } catch (err) {
    console.log("Error: ", err.message);
    new ApiError(500, err.message);
  }
});

// GET Request to stduent score
const getCandidatesResults = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log("Id: ", _id);
  try {
    // get the main quiz info
    const originalQuizData = await QuizModel.findOne({ _id });

    console.log("Original Quiz title: ", originalQuizData.quizInfo.title);
    console.log(
      "Original Quiz marksPerQuestion: ",
      originalQuizData.quizInfo.marksPerQuestion
    );
    console.log(
      "Original Quiz passingMarks: ",
      originalQuizData.quizInfo.passingMarks
    );

    const quizInfo = {
      title: originalQuizData.quizInfo.title,
      marksPerQuestion: originalQuizData.quizInfo.marksPerQuestion,
      passingMarks: originalQuizData.quizInfo.passingMarks,
    };
    // find the all candidates answers
    let result = await CandidateAnswerModel.find({ quizId: _id });

    // if candidate answer will be not found
    if (result.length === 0) {
      new ApiError(401, "Student answers data not found!");
    }

    // Use Promise.all to handle multiple asynchronous operations in parallel
    result = await Promise.all(
      result.map(async (data) => {
        // Find the candidate data by candidateId, selecting only the username and fullName fields
        const candidateData = await CandidateModel.findOne(
          { _id: new mongoose.Types.ObjectId(data.candidateId) },
          "fullName email -_id" // Include only username and fullName, exclude _id
        );

        // Return a new object combining the original data and the candidateData
        return { data, candidateData };
      })
    );

    // to count score of candidate
    const updatedData = scoreCounterOfCandidatesResult(
      result,
      quizInfo.marksPerQuestion
    );

    console.log("Updated DAta: ", updatedData);

    // sending response
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { results: updatedData, quizInfo },
          "Successfully data fetched!"
        )
      );
  } catch (err) {
    console.log(err);
    new ApiError(500, err.message);
  }
});

// candidate score counter
const scoreCounterOfCandidatesResult = (data, marksPerQuestion) => {
  let result = data.map((item, _) => {
    let score = 0;
    // loop to count score of candidate answer's
    for (let value of item.data.candidateAnswers) {
      // if current answer is right then update the score
      if (value.candidateAnswer == value.correctOption) {
        // Convert string to number using unary plus
        score += +marksPerQuestion;
      }
    }
    // add score
    // item.score = score;
    return { candidateData: item.candidateData, score };
  });

  // console.log(result);

  return result;
};

export {
  createCandidate,
  candidateAnswers,
  isUserReattending,
  getCandidatesResults,
};
