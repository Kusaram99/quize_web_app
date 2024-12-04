import mongoose, { Schema } from "mongoose";

const candidateSchema = mongoose.Schema({
  username: {
    type: String,
  },
  mobileno: {
    type: String,
  },
});

const candidateAnsersSchema = mongoose.Schema({
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: "candidatesData",
    require: true,
  },
  questionsId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    require: true,
  },
  answers: {
    type: Schema.Types.Mixed,
    require: true,
  },
});

const CandidateModel = mongoose.model("candidatesData", candidateSchema);
const CandidateAnswerModel = mongoose.model(
  "candidate_Answers",
  candidateAnsersSchema
);
export { CandidateModel, CandidateAnswerModel };
