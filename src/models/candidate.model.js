import mongoose from "mongoose";

const candidateSchema = mongoose.Schema({
  username: {
    type: String,
  },
  mobileno: {
    type: String,
  },
});

const CandidateModel = mongoose.model("candidatesData", candidateSchema);
export default CandidateModel;
