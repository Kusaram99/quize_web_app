import { Router } from "express";
import {
  candidateAnswers,
  createCandidate,
  isUserReattending,
  getCandidatesResults,
} from "../controllers/candidate.controler.js";

const router = Router();

// routers handler
router.route("/create").post(createCandidate);
router.route("/save-answer").post(candidateAnswers);
router.route("/iscandidate-reattending").post(isUserReattending);
router.route("/get-candidate-answer/:_id").get(getCandidatesResults);

export default router;
