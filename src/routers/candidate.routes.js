import { Router } from "express";
import { candidateAnsers, createCandidate } from "../controllers/candidate.controler.js";

const router = Router()


// routers handler
router.route('/create').post(createCandidate)
router.route('/save-answer').post(candidateAnsers)

export default router