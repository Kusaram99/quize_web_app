import { Router } from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuizzes,
  updateQuiz,
  toggleSharedLink,
  getQuiz,
  checkLink,
  getQuizID,
} from "../controllers/quize.controler.js";

const router = Router();

// quizes routes
router.route("/create-quize").post(createQuiz);
router.route("/update-quiz/").put(updateQuiz);
router.route("/delete-quiz/:_id").delete(deleteQuiz);
router.route("/previous-quizzes/:_id").get(getQuizzes);
router.route("/toggle-shared-link").put(toggleSharedLink);
router.route("/getspecific-quiz/:_id").get(getQuiz);
router.route("/islink-expired/:_id").get(checkLink);
router.route("/get-quiz-id/:_id").get(getQuizID);

export default router;
