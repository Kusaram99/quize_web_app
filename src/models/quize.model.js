import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the Quiz schema
const QuizSchema = new Schema(
  {
    quizInfo: {
      type: Object,
      required: [true, "Quiz information is required"],
    },
    questions: {
      type: Schema.Types.Mixed,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    generalSetting: {
      type: Object,
      default: {}, // Default value for general settings
    },
    quizDuration: {
      type: String,
      required: true,
    },
    startingTime: {
      type: Date, // Use Date for better time handling
      required: true,
    },
    endingTime: {
      type: Date, // Use Date for better time handling
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Quiz model
const QuizModel = model("Quiz", QuizSchema);

export default QuizModel;
