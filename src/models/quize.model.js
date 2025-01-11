import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the Quiz schema
const QuizSchema = new Schema(
  {
    quizInfo: {
      type: Schema.Types.Mixed,
      required: [true, "Quiz information is required"],
    },
    subjectCategories: {
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
    link: {
      type: String,
    },
    status:{
      type: Boolean,
      default: true
    },
    response:{
      type:Number,
      default: 0
    }
  },      
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Quiz model
const QuizModel = model("Quiz", QuizSchema);

export default QuizModel;
