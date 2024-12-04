import { Router } from "express";
import { createQuiz, deleteQuiz, getQuizzes, updateQuiz } from "../controllers/quize.controler.js"; 

const router = Router();

// quizes routes
router.route("/create-quize").post(createQuiz);
router.route("/update-quiz/:_id").put(updateQuiz);
router.route("/delete-quiz/:_id").delete(deleteQuiz)
router.route("/previous-quizzes/:_id").get(getQuizzes)

export default router;
