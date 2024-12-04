import { v4 as uuidv4 } from 'uuid';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import QuizModel from "../models/quize.model.js";

// get admin's all created quizzes
const getQuizzes = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    // find data
    const result = await QuizModel.find({ userId: _id });

    // if data successfully fetched
    res.send(new ApiResponse(200, result, "request successful!"));
  } catch (error) {
    console.log("Error occurred: ", error.message);
    new ApiError(500, "Something is wrong Please try a later!");
  }
});

// create quize handler
const createQuiz = asyncHandler(async (req, res, next) => {
  try {
    const {
      quizInfo,
      questions,
      userId,
      generalSetting,
      quizDuration,
      startingTime,
      endingTime,
    } = req.body;

    // Validate required fields
    if (!questions.length || !quizInfo || !userId || !quizDuration || !startingTime || !endingTime) {
      throw new ApiError(
        400,
        "All required fields (quizInfo, userId, quizDuration, startingTime, endingTime) must be provided."
      );
    }

    // creating link

    const link = uuidv4()

    // Use `create` to insert the quiz
    const newQuiz = await QuizModel.create({
      quizInfo,
      userId,
      generalSetting: generalSetting || {}, // Optional field
      quizDuration,
      startingTime,
      endingTime,
      questions,
      link
    });

    // Respond with the created quiz
    res.status(201).json({
      success: true,
      data: newQuiz,
      message: "Quiz created successfully.",
    });
  } catch (error) {
    console.error("Error creating quiz:", error.message);

    throw new ApiError(500, "Internal Server Error. Please try again later");
  }
});

// quiz update handler ======================================
const updateQuiz = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params; // Quiz ID to be updated
    const { quizInfo, generalSetting, quizDuration, startingTime, endingTime, questions } =
      req.body;

    // Check if the quiz ID is provided
    if (!_id) {
      throw new ApiError(400, "Quiz ID is require");
    }

    // Build the update object dynamically to avoid overriding fields with `undefined`
    const updateData = {};
    if (quizInfo) updateData.quizInfo = quizInfo;
    if (generalSetting) updateData.generalSetting = generalSetting;
    if (quizDuration) updateData.quizDuration = quizDuration;
    if (startingTime) updateData.startingTime = startingTime;
    if (endingTime) updateData.endingTime = endingTime;
    updateData.questions = questions

    // Perform the update
    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true } // `new: true` returns the updated document; `runValidators: true` enforces schema validation
    );

    // If the quiz does not exist
    if (!updatedQuiz) {
      throw new ApiError(404, "Quiz not found");
    }

    // Respond with the updated quiz
    res.status(200).json({
      success: true,
      data: updatedQuiz,
      message: "Quiz updated successfully.",
    });
  } catch (error) {
    console.error("Error updating quiz:", error.message);
    new ApiError(500, "Internal server Error. Please try again later");
  }
});

// delete quize =========================================
const deleteQuiz = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await QuizModel.findByIdAndDelete(_id);

    // if quiz will not be deleted
    if (!result) {
      throw new ApiError(401, "ID is required to delete quiz");
    }

    // if quiz successfully deleted then send the response
    res.send(new ApiResponse(200, result, "Successfully deleted"));
  } catch (err) {
    // if server error occurred
    console.log("Error Occurred: ", err.message);
    new ApiError(500, err.message);
  }
});

export { createQuiz, updateQuiz, deleteQuiz, getQuizzes };
