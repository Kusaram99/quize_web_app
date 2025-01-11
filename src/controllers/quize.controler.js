import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import QuizModel from "../models/quize.model.js";
import UserModel from "../models/userModels.js";

// get admin's all created quizzes
const getQuizzes = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log("Id===", _id);
  console.log("req.params:    ", req.params);
  try {
    // find data
    const result = await QuizModel.find({ userId: _id });

    // if data successfully fetched
    res.send(new ApiResponse(200, result, "request successful!"));
  } catch (error) {
    console.log("Error occurred: ", error.message);
    new ApiError(500, "Something is wrong Please try a later!");
  }
});

// create quize handler =====================================
const createQuiz = asyncHandler(async (req, res, next) => {
  try {
    // extracting data
    const { quizInfo, subjectCategories, userId } = req.body;
    // creating new variable to status
    const status = true;

    // if user exist
    const isUserExist = await UserModel.findOne({ _id: userId });
    // console.log("user: ", isUserExist)
    // check user exist or not
    if (!isUserExist) {
      throw new ApiError(401, "Oops Somthing is wrong on client site!");
    }
    // Validate required fields
    if (
      !+quizInfo.marksPerQuestion ||
      !userId ||
      !+quizInfo.timeDuration ||
      !+quizInfo.passingMarks ||
      !quizInfo.title
    ) {
      throw new ApiError(
        400,
        "All required fields (quizInfo, userId, quizDuration, startingTime, endingTime) must be provided."
      );
    }

    // creating link
    const link = uuidv4();

    // Use `create` to insert the quiz
    const newQuiz = await QuizModel.create({
      quizInfo,
      subjectCategories,
      userId,
      generalSetting: {}, // Optional field
      link,
      status,
    });

    // Respond with the created quiz
    res.status(201).json({
      success: true,
      data: newQuiz,
      message: "Quiz created successfully.",
    });
    return;
  } catch (error) {
    console.error("Error creating quiz:", error.message);

    throw new ApiError(500, "Internal Server Error. Please try again later");
  }
});

// stop shared link =========================================
const toggleSharedLink = asyncHandler(async (req, res) => {
  try {
    const { _id, userId, status } = req.body;

    if (!_id || !userId || status === undefined) {
      throw new ApiError(400, "Invalid request data");
    }

    // send request to database to get admin's quiz
    const result = await QuizModel.findOne({ userId });

    // check if this quiz exists or not
    if (!result) {
      throw new ApiError(404, "Quiz not found");
    }

    // update document as per request to update status and link
    const updatedDate = {
      status: status,
      link: status ? uuidv4() : null,
    };

    // updating
    const updatedQuiz = await QuizModel.updateOne(
      { _id },
      { $set: updatedDate }
    );

    // if quiz not found
    if (!updatedQuiz.matchedCount) {
      throw new ApiError(404, "Quiz not found for update");
    }

    // sending response
    res.send(new ApiResponse(200, updatedQuiz, "Successfully Updated"));
  } catch (err) {
    console.log("Error: ", err.message);
    throw new ApiError(500, "Internal Server Error. Please try again later");
  }
});

// quiz update handler ======================================
const updateQuiz = asyncHandler(async (req, res, next) => {
  try {
    // const { _id } = req.params; // Quiz ID to be updated
    const { subjectCategories, userId, collectQuizInfo, quizId } = req.body;

    // check admin exist or not
    const isUserExist = await UserModel.findOne({ _id: userId });
    if (!isUserExist) {
      throw new ApiError(401, "Oops Somthing is wrong on client site!");
    }

    // check quiz exist or not
    const result = await QuizModel.updateOne(
      { _id: quizId },
      {
        $set: {
          quizInfo: collectQuizInfo,
          subjectCategories: subjectCategories,
          link: uuidv4(),
        },
      }
    );

    // sending response
    res.send(new ApiResponse(200, result, "Successfully Updated"));
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

// get specific quiz to exam =========================================
const getQuiz = asyncHandler(async (req, res) => {
  try {
    // rename _id to quizLink to incoming _id for handle conflict
    const { _id: quizLink } = req.params;

    // Find the quiz by ID
    const result = await QuizModel.findOne({ link: quizLink });

    // Check if the quiz exists
    if (!result) {
      throw new ApiError(404, "Quiz not found");
    }

    console.log("result: ", result);
    const { quizInfo, userId, link, status, _id: resultId } = result;

    // Combine all questions from all subjectCategories
    const allQuestions = result.subjectCategories
      .map((category) => category.questions)
      .flat(); // Flattens the array of arrays into a single array

    // Shuffle the questions array
    const shuffledQuestions = shuffleArray(allQuestions);

    // Add the shuffled questions to the response
    const modifiedResult = {
      quizInfo,
      userId,
      link,
      status,
      _id: resultId,
      questions: shuffledQuestions, // Add the shuffled questions
    };

    // Send the response
    res.send(new ApiResponse(200, modifiedResult, "Request successful!"));
  } catch (error) {
    console.error("Error getting quiz:", error.message);
    res
      .status(500)
      .send(new ApiError(500, "Internal Server Error. Please try again later"));
  }
});

// Helper function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Check Link is expired or not
const checkLink = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    // Find the quiz by link
    let result = await QuizModel.findOne({ link: _id });
    // console.log("result: ", result);
    // Check if the quiz exists
    if (!result) {
      throw new ApiError(404, "Quiz not found");
    }

    // send the response
    result = { status: result.status, link: result.link };
    res.send(new ApiResponse(200, result, "Success!"));
  } catch (error) {
    console.error("Error getting quiz:", error.message);
    res
      .status(500)
      .send(new ApiError(500, "Internal Server Error. Please try again later"));
  }
});

// Get request handler to send only quiz id ============
const getQuizID = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    // Find the quiz by link
    let result = await QuizModel.findOne({ link: _id });
    // console.log("result: ", result);
    // Check if the quiz exists
    if (!result) {
      throw new ApiError(404, "Quiz not found");
    }

    // send the response
    result = { quizId: result._id};
    res.send(new ApiResponse(200, result, "Success!"));
  } catch (error) {
    console.error("Error getting quiz:", error.message);
    res
      .status(500)
      .send(new ApiError(500, "Internal Server Error. Please try again later"));
  }
});

export {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizzes,
  toggleSharedLink,
  getQuiz,
  checkLink,
  getQuizID
};
