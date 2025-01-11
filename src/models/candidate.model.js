import e from "express";
import mongoose, { Schema } from "mongoose";

const candidateSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const candidateAnsersSchema = mongoose.Schema({
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: "candidatesData",
    require: true,
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    require: true,
  },
  candidateAnswers: {
    type: Schema.Types.Mixed,
    require: true,
  },
}, { timestamps: true });

const CandidateModel = mongoose.model("candidatesData", candidateSchema);
const CandidateAnswerModel = mongoose.model(
  "candidate_Answers",
  candidateAnsersSchema
);
export { CandidateModel, CandidateAnswerModel };
